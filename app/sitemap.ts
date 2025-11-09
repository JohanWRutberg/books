export default async function sitemap() {
  const baseUrl = "https://markedbytropes.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
