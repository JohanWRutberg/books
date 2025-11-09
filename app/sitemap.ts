export const dynamic = "force-static"; // säkerställer att den inte blir server-renderad

export async function GET() {
  const baseUrl = "https://markedbytropes.vercel.app";

  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString().split("T")[0],
      changefreq: "weekly",
      priority: 0.8,
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
