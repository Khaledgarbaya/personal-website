import { generateRemixSitemap } from "@forge42/seo-tools/remix/sitemap"

export const loader = async() => {
	const sitemap = await generateRemixSitemap({
		 domain: "https://example.com",

	})

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml",
		},
	})
}
