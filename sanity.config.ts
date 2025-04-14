import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const useCDN = (process.env.NEXT_SANITY_USE_CDN === "true");

export const client = createClient({
    projectId,
    dataset,
    apiVersion: apiVersion,
    useCdn: useCDN,
});
