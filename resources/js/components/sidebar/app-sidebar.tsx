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
                                        <span>{'Dashboard'}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <Collapsible
                                    defaultOpen
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
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
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <Collapsible
                                    defaultOpen
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                <Receipt />
                                                Billing
                                                <ChevronDown />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        key={'quotations'}
                                                    >
                                                        <Link
                                                            href={'/quotations'}
                                                        >
                                                            <span>
                                                                {'Quotations'}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        key={'invoices'}
                                                    >
                                                        <Link
                                                            href={'/invoices'}
                                                        >
                                                            <span>
                                                                {'Invoices'}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
