import { useState } from "react";
import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Cookies from "js-cookie";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CircleUserRound, Inbox, Bell } from "lucide-react";
import { useRemember, router } from "@inertiajs/react";
import Loading from "@/components/loading";

const withNotification = 0;
const UserLayout = ({ children }: { children: React.ReactNode }) => {
    const defaultOpen = Cookies.get("sidebar:state") ? true : false;
    const [loading, setLoading] = useState(false);
    router.on("start", (event) => {
        setLoading(true);
    });

    router.on("finish", (event) => {
        if (event.detail.visit.completed) setLoading(false);
    });

    return (
        <div>
            <SidebarProvider
                defaultOpen={defaultOpen}
                style={{
                    "--sidebar-width": "10rem",
                    "--sidebar-width-mobile": "10rem",
                }}
            >
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                        <div className="flex w-full items-center justify-between gap-2 px-3">
                            <SidebarTrigger />
                            <div className="flex justify-end">
                                <NavigationMenu className="flex">
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <div className="relative">
                                                <a href="#">
                                                    <Bell />
                                                </a>
                                                {withNotification > 0 ? (
                                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -right-2 dark:border-gray-900"></div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <CircleUserRound />
                                                    <span>User Name</span>
                                                </div>
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="absolute z-50 ltr:origin-top-right rtl:origin-top-left">
                                                <ul className="w-40 px-2 py-4 gap-2">
                                                    <li className="py">
                                                        <a href="/profile">
                                                            <span className="text-sm">
                                                                Profile
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li className="py">
                                                        <a href="#">
                                                            <span className="text-sm">
                                                                Log Out
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>
                    </header>
                    {loading ? <Loading /> : children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default UserLayout;
