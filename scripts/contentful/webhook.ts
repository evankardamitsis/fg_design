/**
 * Creates or updates the "Vercel rebuild" Contentful webhook.
 * Run: npx tsx --env-file=.env.local scripts/contentful/webhook.ts [--dry-run]
 */
import { env, makeClient, pace, withRetry } from "./lib";

const NAME = "Vercel rebuild";
const TOPICS = [
  "Entry.publish",
  "Entry.unpublish",
  "Entry.delete",
  "Asset.publish",
  "Asset.unpublish",
  "Asset.delete",
];

async function main() {
  const dry = process.argv.includes("--dry-run");
  const url = env("VERCEL_DEPLOY_HOOK_URL");
  if (!url) {
    if (dry) console.log("[dry-run] VERCEL_DEPLOY_HOOK_URL not set (would be required for a live run).");
    else throw new Error("VERCEL_DEPLOY_HOOK_URL is not set.");
  } else if (!/^https:\/\//.test(url)) {
    throw new Error("VERCEL_DEPLOY_HOOK_URL must start with https://");
  }
  console.log(`Webhook "${NAME}": POST on ${TOPICS.join(", ")}`);
  if (dry) {
    console.log("[dry-run] no requests sent.");
    return;
  }
  const client = makeClient();
  const all = await withRetry(() => client.webhook.getMany({ query: { limit: 100 } }), "list webhooks");
  const existing = all.items.find((w) => w.name === NAME);
  await pace();
  if (existing) {
    await withRetry(
      () => client.webhook.update({ webhookDefinitionId: existing.sys.id }, { ...existing, url: url!, topics: TOPICS, active: true }),
      "update webhook",
    );
    console.log("Updated existing webhook.");
  } else {
    await withRetry(
      () => client.webhook.create({}, { name: NAME, url: url!, topics: TOPICS, active: true, transformation: { method: "POST" } }),
      "create webhook",
    );
    console.log("Created webhook.");
  }
}

main().catch((e) => {
  console.error("Failed:", e instanceof Error ? e.name : "error");
  process.exit(1);
});
