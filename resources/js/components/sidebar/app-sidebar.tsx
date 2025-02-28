import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Bus, ChevronDown, LayoutDashboard, Receipt } from 'lucide-react';

export function AppSidebar() {
    const { state, isMobile } = useSidebar();

    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarContent className="pt-4 md:pt-10">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem key={'dashboard'}>
                                <SidebarMenuButton asChild>
                                    <Link href={'/dashboard'}>
                                        <LayoutDashboard />
                                        Dashboard
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem key={'trips'}>
                                <Collapsible
                                    className="group/collapsible"
                                    defaultOpen
                                >
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <Bus />
                                            <span className="text-md">
                                                Trips
                                            </span>
                                            <ChevronDown />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        key={'Locations'}
                                                    >
                                                        <Link
                                                            href={'/locations'}
                                                        >
                                                            <span>
                                                                {'Locations'}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        key={'Proposals'}
                                                    >
                                                        <Link
                                                            href={'/proposals'}
                                                        >
                                                            <span>
                                                                {'Proposals'}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </CollapsibleContent>

                                    {/* <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <Bus />
                                                Trips
                                                <ChevronDown />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        key={'Locations'}
                                                    >
                                                        <Link
                                                            href={'/locations'}
                                                        >
                                                            <span>
                                                                {'Locations'}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        key={'Proposals'}
                                                    >
                                                        <Link
                                                            href={'/invoices'}
                                                        >
                                                            <span>
                                                                {'Proposals'}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem> */}
                                </Collapsible>
                            </SidebarMenuItem>

                            <SidebarMenuItem key={'billing'}>
                                <Collapsible
                                    defaultOpen
                                    className="group/collapsible"
                                >
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <Receipt />
                                            <span className="text-md">
                                                Billing
                                            </span>
                                            <ChevronDown />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {/* <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <Receipt />
                                            Billing
                                            <ChevronDown />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger> */}
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    key={'quotations'}
                                                >
                                                    <Link href={'/quotations'}>
                                                        Quotations
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    key={'orders'}
                                                >
                                                    <Link href={'/orders'}>
                                                        Orders
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    key={'invoices'}
                                                >
                                                    <Link href={'/invoices'}>
                                                        <span>
                                                            {'Invoices'}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {state === 'expanded' && (
                    <div className="flex justify-center">
                        <span className="text-[10px]">
                            Copyright &copy; HEROES Malaysia
                        </span>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
