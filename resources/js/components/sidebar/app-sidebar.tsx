import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Bus, ChevronDown, LayoutDashboard, Receipt } from 'lucide-react';
import ApplicationLogo from '../logo';

export function AppSidebar() {
    return (
        <Sidebar side="left" collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel></SidebarGroupLabel> */}
                    <div className="-top-10 flex justify-center">
                        <ApplicationLogo size={80} />
                    </div>
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
                                    defaultOpen
                                    className="group/collapsible"
                                >
                                    <SidebarGroupLabel asChild>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <Bus />
                                                <span className="text-md">
                                                    Trips
                                                </span>
                                                <ChevronDown />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
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
                                    <SidebarGroupLabel asChild>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <Receipt />
                                                <span className="text-md">
                                                    Billing
                                                </span>
                                                <ChevronDown />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
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
        </Sidebar>
    );
}
