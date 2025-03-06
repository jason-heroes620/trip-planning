import ApplicationLogo from '@/components/ApplicationLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    currentYear,
}: PageProps<{ currentYear: string }>) {
    return (
        <>
            <Head title="HEROES - Schools" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <header className="flex w-full flex-row items-center justify-between px-4 shadow-lg md:px-10">
                        <div className="flex lg:col-start-2 lg:justify-center">
                            <ApplicationLogo size={70} />
                        </div>
                        <nav className="-mx-3 flex flex-1 justify-end">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('school.register')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>
                    <div className="w-full">
                        <main className="">
                            <div className="flex flex-row">
                                <Card className="w-full rounded-none bg-[#B0CAD4] px-4 py-6">
                                    <CardHeader>
                                        <CardTitle className="text-4xl">
                                            Explore the Ultimate
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col justify-start">
                                            <div className="w-full px-6 md:w-[50%]">
                                                <span className="text-justify">
                                                    Unlock the sec rets to
                                                    seamless school trip
                                                    planning with our
                                                    comprehensice self-planning
                                                    platform. Discover diverse
                                                    locations and create lasting
                                                    memories for your students.
                                                </span>
                                            </div>
                                            <div className="w-[50%] px-6 py-4 md:w-full">
                                                <span>
                                                    Elevate Your School Trip
                                                </span>
                                            </div>
                                            <div className="w-[50%] px-6">
                                                <Button className="rounded-2xl bg-[#0E3051] px-6 py-2 text-white hover:cursor-pointer">
                                                    <Link href={route('login')}>
                                                        Plan Now
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            <div>
                                <span>
                                    &copy; HEROES Malaysia {currentYear}
                                </span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
