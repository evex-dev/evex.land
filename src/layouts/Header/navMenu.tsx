import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState, useEffect, useCallback } from "react";

export function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent">
                        Blog
                    </NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-2">
							<BlogList />
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}


function BlogList() {
	const blogFetcher = () => fetch("/rss.xml").then((res) => res.text()).then((xml) => new window.DOMParser().parseFromString(xml, "text/xml"));
	const blogFetcherCallback = useCallback(() => blogFetcher(), [])
	const [posts, setPosts] = useState<Record<"title" | "link", string>[]>([]);

	useEffect(() => {
		blogFetcherCallback().then((data) => {
			setPosts(Array.from(data.querySelectorAll("item")).map((item) => ({
				title: item.querySelector("title")!.textContent ?? "",
				link: new window.URL(item.querySelector("link")!.textContent ?? window.location.href).pathname,
			})));
		});
	}, [blogFetcherCallback]);

	return <div className="grid grid-cols-2 gap-3 w-[250px]">
		{posts.slice(0, 6).map((post) => <a href={post.link} className="text-sm hover:underline" key={post.title}>
			<Button variant="ghost" className="text-xs hover:underline w-[120px]">{post.title.length > 12 ? `${post.title.slice(0, 10)}...` : post.title}</Button>
		</a>)}
	</div>;
}