'use client';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { sidebar } from '@/constants/sidebar.constant';
import { usePathname } from 'next/navigation';

const { navMain, user } = sidebar;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const itemsWithActiveState = navMain.map((item) => {
    const isChildActive = item.children?.some(child => child.url === pathname);
    const isActive = item.url === pathname || isChildActive;

    const childrenWithActiveState = item.children?.map(child => ({
      ...child,
      isActive: child.url === pathname,
    }));

    return {
      ...item,
      isActive,
      children: childrenWithActiveState,
    };
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="px-2 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-sm">
            <span className="font-bold">GJ</span>
          </div>
          <div className="font-semibold">
            <span className="text-amber-600">Gold</span>
            <span>Job</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="bg-amber-200/50" />
      <SidebarContent>
        <NavMain items={itemsWithActiveState} />
      </SidebarContent>
      <SidebarSeparator className="bg-amber-200/50" />
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-amber-200" />
    </Sidebar>
  );
}
