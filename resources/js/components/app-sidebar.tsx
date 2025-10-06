import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import AppLogo from './app-logo';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <AppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="mx-auto mb-6 flex flex-col justify-end">
        <AppearanceToggleDropdown className="cursor-pointer" />
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="mx-auto">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
