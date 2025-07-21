import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Users, 
  BarChart3, 
  MessageSquare, 
  Shield, 
  FileText, 
  CreditCard, 
  UserCog, 
  Headphones, 
  Settings,
  Bot,
  ChevronDown,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3
  },
  {
    title: "Client Management",
    icon: Users,
    subItems: [
      { title: "All Clients", url: "/clients" },
      { title: "Add Client", url: "/clients/add" },
      { title: "Client Analytics", url: "/clients/analytics" }
    ]
  },
  {
    title: "Analytics",
    icon: BarChart3,
    subItems: [
      { title: "Conversation Analytics", url: "/analytics/conversations" },
      { title: "Performance Metrics", url: "/analytics/performance" },
      { title: "Reports", url: "/analytics/reports" }
    ]
  },
  {
    title: "Message Templates",
    url: "/templates",
    icon: MessageSquare
  },
  {
    title: "Compliance & Monitoring",
    url: "/compliance",
    icon: Shield
  },
  {
    title: "Billing & Invoicing",
    icon: CreditCard,
    subItems: [
      { title: "Payment Status", url: "/billing/payments" },
      { title: "Invoices", url: "/billing/invoices" },
      { title: "Revenue Analytics", url: "/billing/revenue" }
    ]
  },
  {
    title: "User Management",
    url: "/users",
    icon: UserCog
  },
  {
    title: "Support System",
    url: "/support",
    icon: Headphones
  },
  {
    title: "Integration Hub",
    url: "/integrations",
    icon: Settings
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (subItems: any[]) => 
    subItems?.some((item) => isActive(item.url));

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => 
      prev.includes(title) 
        ? prev.filter(group => group !== title)
        : [...prev, title]
    );
  };

  const getNavCls = (isActive: boolean) =>
    isActive 
      ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Chat Genie
              </h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      open={openGroups.includes(item.title) || isGroupActive(item.subItems)}
                      onOpenChange={() => toggleGroup(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="hover:bg-muted/50 justify-between">
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {!collapsed && <span>{item.title}</span>}
                          </div>
                          {!collapsed && (
                            openGroups.includes(item.title) || isGroupActive(item.subItems) ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {!collapsed && (
                        <CollapsibleContent>
                          <div className="ml-6 mt-1 space-y-1">
                            {item.subItems.map((subItem) => (
                              <SidebarMenuButton key={subItem.url} asChild>
                                <NavLink 
                                  to={subItem.url} 
                                  className={getNavCls(isActive(subItem.url))}
                                >
                                  <span className="text-sm">{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuButton>
                            ))}
                          </div>
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavCls(isActive(item.url))}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            Chat Genie v2.0
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}