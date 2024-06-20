import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { defaultDescription, defaultTitle } from "../layouts/Layout.astro";

export async function GET(context) {
	const posts = await getCollection("blog");
	return rss({
		title: defaultTitle,
		description: defaultDescription,
		site: context.site,
		items: posts.map(post => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
