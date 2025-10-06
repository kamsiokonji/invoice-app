import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ComponentPropsWithoutRef } from 'react';

export function NavFooter({ className, ...props }: ComponentPropsWithoutRef<typeof SidebarGroup> & {}) {
  const { auth } = usePage<SharedData>().props;
  return (
    <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {/* <a href={item.href} target="_blank" rel="noopener noreferrer">
                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                    <span>{item.title}</span>
                                </a> */}
              <Avatar className="size-16 hover:bg-transparent">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="rounded-full" />
                <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
