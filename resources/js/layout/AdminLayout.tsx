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
import Cookies from 'js-cookie';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const defaultOpen = Cookies.get('sidebar:state') ? true : false;

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
                            <div className="flex justify-end">
                                <NavigationMenu className="flex">
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger>
                                                Item One
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="absolute z-50 ltr:origin-top-right rtl:origin-top-left">
                                                <ul className="">
                                                    <li>
                                                        <a href="/logout">
                                                            Log Out
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
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default AdminLayout;
