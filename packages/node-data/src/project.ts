import { z } from "zod";
import { NodeJSON } from "./node/node.js";
import { StyleJSON } from "./style/style.js";

export const ImageType = z.enum(["image/png", "image/jpeg"]);
export type ImageType = z.infer<typeof ImageType>;

export const Image = z.object({
  width: z.number(),
  height: z.number(),
  type: ImageType,
  url: z.string(),
});

export type Image = z.infer<typeof Image>;

export const ProjectJSON = z.object({
  // TODO: version
  nodes: z.record(NodeJSON),
  styles: z.record(StyleJSON.partial()),
  componentURLs: z.array(z.string()).optional(),
  images: z.record(Image).optional(),
});

export type ProjectJSON = z.infer<typeof ProjectJSON>;
