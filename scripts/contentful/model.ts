/**
 * Contentful content model for FG Design projects and press.
 *
 * This file is the contract between the seed script (scripts/contentful/seed.ts)
 * and the site's delivery mapping (src/lib/contentful/). Field ids here are what
 * both sides read; change them in one place only.
 *
 * Editing experience is the design constraint: Fardad never types an index, a
 * "Month YYYY - Month YYYY" string or a display order. Those are derived.
 */

type Validation = Record<string, unknown>;

export type FieldDef = {
  id: string;
  name: string;
  type: "Symbol" | "Text" | "Date" | "Integer" | "Boolean" | "Link" | "Array";
  required?: boolean;
  linkType?: "Asset" | "Entry";
  items?: { type: "Symbol" | "Link"; linkType?: "Asset" | "Entry"; validations?: Validation[] };
  validations?: Validation[];
  /** Editor help text, shown under the field in the Contentful UI. */
  help?: string;
  /** Contentful editor widget id, e.g. "slugEditor", "datePicker", "tagEditor", "listInput". */
  widget?: string;
  widgetSettings?: Record<string, unknown>;
};

export type ContentTypeDef = {
  id: string;
  name: string;
  description: string;
  displayField: string;
  fields: FieldDef[];
};

const imageOnly: Validation = { linkMimetypeGroup: ["image"] };
const monthPicker = { format: "dateonly", helpText: "" };

export const galleryImage: ContentTypeDef = {
  id: "galleryImage",
  name: "Gallery image",
  description: "One photograph in a project gallery, with its room name and caption.",
  displayField: "room",
  fields: [
    { id: "room", name: "Room / label", type: "Symbol", required: true, help: "Shown under the photo, e.g. Living Room, Kitchen, Completed." },
    { id: "image", name: "Image", type: "Link", linkType: "Asset", required: true, validations: [imageOnly] },
    { id: "caption", name: "Caption", type: "Text", help: "Optional. One or two sentences about the room." },
    { id: "alt", name: "Alt text", type: "Symbol", required: true, help: "Describe the photo for screen readers and search engines." },
  ],
};

export const project: ContentTypeDef = {
  id: "project",
  name: "Project",
  description: "A residential or commercial project in the portfolio. Order and numbering are automatic (newest completion first).",
  displayField: "title",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    {
      id: "slug",
      name: "URL slug",
      type: "Symbol",
      required: true,
      validations: [{ unique: true }, { regexp: { pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" }, message: "Lowercase letters, numbers and hyphens only" }],
      widget: "slugEditor",
      help: "Becomes the page address, e.g. gloucester-walk. Changing it breaks existing links.",
    },
    {
      id: "category",
      name: "Category",
      type: "Symbol",
      required: true,
      validations: [{ in: ["Residential", "Commercial"] }],
      widget: "radio",
    },
    { id: "location", name: "Location", type: "Symbol", required: true, help: "e.g. Hyde Park, or Darsley Park, Benton, Newcastle" },
    { id: "postcode", name: "Postcode area", type: "Symbol", help: "Residential only, e.g. W2" },
    { id: "startDate", name: "Start date", type: "Date", widget: "datePicker", widgetSettings: monthPicker, help: "Only the month and year are shown." },
    { id: "endDate", name: "Completion date", type: "Date", widget: "datePicker", widgetSettings: monthPicker, help: "Sets the project's position: newest completion is listed first." },
    { id: "scope", name: "Residence type / scope", type: "Symbol", help: "Residential, e.g. Five-storey townhouse" },
    { id: "briefHeading", name: "Brief heading", type: "Symbol", required: true },
    { id: "brief", name: "Brief", type: "Text", required: true, help: "Leave a blank line between paragraphs." },
    {
      id: "scopeOfWorks",
      name: "Scope of work",
      type: "Array",
      items: { type: "Symbol" },
      widget: "listInput",
      help: "Residential: one item per line. Commercial: the facilities list.",
    },
    { id: "cover", name: "Cover image", type: "Link", linkType: "Asset", required: true, validations: [imageOnly], help: "Used on the portfolio list and homepage. Alt text comes from the image's Description." },
    { id: "hero", name: "Hero image", type: "Link", linkType: "Asset", validations: [imageOnly], help: "Full-width image at the top of the page. Falls back to the cover." },
    { id: "exterior", name: "Exterior image", type: "Link", linkType: "Asset", validations: [imageOnly], help: "Optional full-width exterior shown before the gallery." },
    {
      id: "gallery",
      name: "Gallery",
      type: "Array",
      items: { type: "Link", linkType: "Entry", validations: [{ linkContentType: ["galleryImage"] }] },
      help: "Drag to reorder. First image is shown large.",
    },
    // Commercial-only
    { id: "sector", name: "Sector", type: "Symbol", help: "Commercial only" },
    { id: "role", name: "FG role", type: "Symbol", help: "Commercial only" },
    {
      id: "facts",
      name: "Key facts",
      type: "Array",
      items: { type: "Symbol" },
      widget: "listInput",
      help: "Commercial only. One per line as Label: Value, e.g. Client: Newcastle United Football Club",
    },
    { id: "coverLabel", name: "Cover label", type: "Symbol", help: "Commercial only, e.g. Completed or CGI" },
  ],
};

export const currentProject: ContentTypeDef = {
  id: "currentProject",
  name: "Currently on site",
  description: "A project under construction, listed at the end of the portfolio page.",
  displayField: "title",
  fields: [
    { id: "title", name: "Title", type: "Symbol", required: true },
    { id: "location", name: "Location", type: "Symbol", required: true },
    { id: "postcode", name: "Postcode area", type: "Symbol" },
    { id: "stage", name: "Stage", type: "Symbol", required: true, help: "e.g. On site" },
    { id: "order", name: "Order", type: "Integer", help: "Lower numbers are listed first." },
  ],
};

export const pressItem: ContentTypeDef = {
  id: "pressItem",
  name: "Press",
  description: "Coverage in a publication. Linking a project adds a 'Featured in' credit to its page.",
  displayField: "title",
  fields: [
    { id: "publication", name: "Publication", type: "Symbol", required: true, help: "e.g. AD Italia" },
    { id: "title", name: "Article title", type: "Symbol", required: true },
    { id: "summary", name: "Summary", type: "Text", help: "One line about what the piece covers." },
    { id: "date", name: "Publication date", type: "Date", required: true, widget: "datePicker", widgetSettings: { format: "dateonly" } },
    { id: "url", name: "Article link", type: "Symbol", required: true, validations: [{ regexp: { pattern: "^https?://" }, message: "Must be a full link starting with https://" }] },
    { id: "language", name: "Language", type: "Symbol", help: "Optional, e.g. Italian" },
    { id: "project", name: "Project", type: "Link", linkType: "Entry", validations: [{ linkContentType: ["project"] }] },
  ],
};

/** Creation order matters: referenced types first. */
export const contentTypes: ContentTypeDef[] = [galleryImage, project, currentProject, pressItem];
