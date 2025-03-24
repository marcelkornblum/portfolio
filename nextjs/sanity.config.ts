import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID; // Replace with your project ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; // Replace with your dataset name

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2023-05-03", // Use a recent API version
  useCdn: true, // `false` if you want to ensure fresh data
});
