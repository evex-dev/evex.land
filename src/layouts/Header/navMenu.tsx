import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Suspense } from "react";

export function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-black/5">
                        Blog
                    </NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-6">
                            <Suspense fallback={<div>Loading...</div>}>
                                aa
                            </Suspense>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
