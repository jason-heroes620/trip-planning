import ApplicationLogo from '@/components/ApplicationLogo';
import Dropdown from '@/components/Dropdown';
import Loading from '@/components/loading';
import ResponsiveNavLink from '@/components/ResponsiveNavLink';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Link, router, usePage } from '@inertiajs/react';
import Cookies from 'js-cookie';
import { CircleUserRound } from 'lucide-react';
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

    const [collapsed, setCollapsed] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div>
            <SidebarProvider
                defaultOpen={defaultOpen}
                open={!collapsed}
                onOpenChange={() => setCollapsed(!collapsed)}
            >
                <AppSidebar />
                <SidebarInset>
                    {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                        <div className="flex w-full items-center justify-between gap-2 px-3">
                            <div className="flex flex-row items-center gap-4">
                                <SidebarTrigger />
                                <ApplicationLogo size={80} />
                            </div>
                            <div className="flex justify-end md:pr-12">
                                <NavigationMenu className="flex">
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <div className="relative">
                                                <a href="#">
                                                    <Bell size={24} />
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
                                                    <CircleUserRound
                                                        size={24}
                                                    />
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
                    </header> */}
                    <nav className="border-b border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <div className="px-4">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex flex-row items-center gap-4">
                                        <SidebarTrigger />
                                        <Link href="/dashboard">
                                            <ApplicationLogo size={60} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                    <div className="relative ms-3">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-2 rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                                    >
                                                        <CircleUserRound
                                                            size={24}
                                                        />
                                                        {user.name}

                                                        <svg
                                                            className="-me-0.5 ms-2 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route('profile.edit')}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>

                                <div className="-me-2 flex items-center sm:hidden">
                                    <button
                                        onClick={() =>
                                            setShowingNavigationDropdown(
                                                (previousState) =>
                                                    !previousState,
                                            )
                                        }
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className={
                                                    !showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                            <path
                                                className={
                                                    showingNavigationDropdown
                                                        ? 'inline-flex'
                                                        : 'hidden'
                                                }
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                (showingNavigationDropdown
                                    ? 'block'
                                    : 'hidden') + ' sm:hidden'
                            }
                        >
                            <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                                <div className="px-4">
                                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <ResponsiveNavLink
                                        href={route('profile.edit')}
                                    >
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {loading ? <Loading /> : children}
                </SidebarInset>
            </SidebarProvider>
            <Toaster />
        </div>
    );
};

export default UserLayout;
