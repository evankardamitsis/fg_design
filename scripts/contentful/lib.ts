import { createClient, type PlainClientAPI } from "contentful-management";

/** Trimmed env value; never log the result. */
export function env(name: string): string | undefined {
  const v = process.env[name]?.trim();
  return v ? v : undefined;
}

export function makeClient(): PlainClientAPI {
  const accessToken = env("CONTENTFUL_MANAGEMENT_TOKEN");
  const spaceId = env("CONTENTFUL_SPACE_ID");
  const environmentId = env("CONTENTFUL_ENVIRONMENT") ?? "master";
  if (!accessToken || !spaceId) {
    throw new Error("Missing CONTENTFUL_MANAGEMENT_TOKEN or CONTENTFUL_SPACE_ID in the environment.");
  }
  return createClient({ accessToken }, { type: "plain", defaults: { spaceId, environmentId } });
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function errText(err: unknown): string {
  const e = err as { name?: string; message?: string; status?: number };
  return `${e?.name ?? ""} ${e?.message ?? ""}`;
}

export function isStatus(err: unknown, code: number): boolean {
  const e = err as { status?: number; response?: { status?: number }; name?: string };
  if (e?.status === code || e?.response?.status === code) return true;
  const t = errText(err);
  if (code === 404) return /NotFound/i.test(t) || t.includes('"status": 404') || t.includes('"status":404');
  if (code === 429) return /RateLimit/i.test(t) || t.includes("429");
  return t.includes(`"status":${code}`) || t.includes(`"status": ${code}`);
}

/** Retries on 429 / transient 5xx with exponential backoff. Error messages are never printed from here. */
export async function withRetry<T>(fn: () => Promise<T>, label = "request"): Promise<T> {
  let delay = 1000;
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const retryable = isStatus(err, 429) || isStatus(err, 502) || isStatus(err, 503);
      if (!retryable || attempt >= 6) throw err;
      console.log(`  rate-limited/transient on ${label}, retrying in ${delay}ms`);
      await sleep(delay);
      delay = Math.min(delay * 2, 16000);
    }
  }
}

/** Light pacing so a long run stays under the ~7 req/s CMA limit. */
let last = 0;
export async function pace(minGapMs = 160) {
  const wait = last + minGapMs - Date.now();
  if (wait > 0) await sleep(wait);
  last = Date.now();
}
