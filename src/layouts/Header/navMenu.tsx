import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect, useCallback } from "react";

export function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent">Blog</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid gap-3 p-2">
							<div className="text-md font-medium text-center text-gray-400">最新の更新</div>
							<BlogList />
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

function BlogList() {
	const blogFetcher = () =>
		fetch("/rss.xml")
			.then(res => res.text())
			.then(xml => new window.DOMParser().parseFromString(xml, "text/xml"));
	const blogFetcherCallback = useCallback(() => blogFetcher(), []);
	const [posts, setPosts] = useState<Record<"title" | "link" | "description", string>[]>([]);

	useEffect(() => {
		blogFetcherCallback().then(data => {
			setPosts(
				Array.from(data.querySelectorAll("item")).map(item => ({
					title: item.querySelector("title")!.textContent ?? "",
					link: new window.URL(item.querySelector("link")!.textContent ?? window.location.href).pathname,
					description: item.querySelector("description")!.textContent ?? "",
				})),
			);
		});
	}, [blogFetcherCallback]);

	return (
		<div className="grid gap-3 w-[160px] md:w-[200px]">
			{posts.slice(0, 6).map(post => (
				<>
					<Separator />
					<a href={post.link} className="text-sm" key={post.title}>
						<div className="w-[160px] md:w-[200px] h-[50px] flex flex-col">
							<p className="truncate font-medium">
								<span className="hidden md:inline">{post.title.length > 20 ? `${post.title.slice(0, 17)}...` : post.title}</span>
								<span className="inline md:hidden">{post.title.length > 15 ? `${post.title.slice(0, 14)}...` : post.title}</span>
							</p>
							<p className="text-gray-400 truncate text-xs">{post.description}</p>
						</div>
					</a>
				</>
			))}
		</div>
	);
}
