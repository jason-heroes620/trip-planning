import Loading from '@/components/loading';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Link, router, usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { Bell, CircleUserRound } from 'lucide-react';
import { useState } from 'react';

const withNotification = 0;
const UserLayout = ({ children }: { children: React.ReactNode }) => {
    const defaultOpen = Cookies.get('sidebar:state') ? true : false;
    const [loading, setLoading] = useState(false);
    router.on('start', (event) => {
        setLoading(true);
    });
    const user = usePage().props.auth.user;

    router.on('finish', (event) => {
        if (event.detail.visit.completed) setLoading(false);
    });

    return (
        <div>
            <SidebarProvider
                defaultOpen={defaultOpen}
                // style={{
                //     '--sidebar-width': '10rem',
                //     '--sidebar-width-mobile': '10rem',
                // }}
            >
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                        <div className="flex w-full items-center justify-between gap-2 px-3">
                            <SidebarTrigger />
                            <div className="flex justify-end md:pr-12">
                                <NavigationMenu className="flex">
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <div className="relative">
                                                <a href="#">
                                                    <Bell />
                                                </a>
                                                {withNotification > 0 ? (
                                                    <div className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900"></div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>
                                                <div className="flex flex-row items-center gap-2">
                                                    <CircleUserRound />
                                                    <span>{user.name}</span>
                                                </div>
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="absolute z-50 ltr:origin-top-right rtl:origin-top-left">
                                                <ul className="w-40 gap-2 px-2 py-4">
                                                    <li className="py">
                                                        <a href="/profile">
                                                            <span className="text-sm">
                                                                Profile
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li className="py">
                                                        <Link
                                                            href={route(
                                                                'logout',
                                                            )}
                                                            method="post"
                                                        >
                                                            <span className="text-sm">
                                                                Log Out
                                                            </span>
                                                        </Link>
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
            <Toaster />
        </div>
    );
};

export default UserLayout;
