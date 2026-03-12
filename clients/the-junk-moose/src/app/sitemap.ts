export default function sitemap() {
  return [
    {
      url: "https://demo.launchedops.com",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
  ];
}
