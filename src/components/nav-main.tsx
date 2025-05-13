'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  children?: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
};

export function NavMain({
  items,
}: {
  items: NavItem[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-amber-600 font-medium">GoldJob</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    'data-[active=true]:bg-amber-50 data-[active=true]:text-amber-800',
                    'data-[active=true]:dark:bg-amber-950/20 data-[active=true]:dark:text-amber-400',
                    'data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-1/2',
                    'data-[active=true]:before:h-5 data-[active=true]:before:w-1',
                    'data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:rounded-r-md',
                    'data-[active=true]:before:bg-amber-500',
                  )}
                  data-active={item.isActive}
                  tooltip={item.title}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        'data-[active=true]:text-amber-600',
                      )}
                      data-active={item.isActive}
                    />
                  )}
                  <span>{item.title}</span>
                  <ChevronRight
                    className={cn(
                      'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90',
                      'data-[active=true]:text-amber-500',
                    )}
                    data-active={item.isActive}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.children?.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className={cn(
                          'data-[active=true]:bg-amber-50 data-[active=true]:text-amber-800',
                          'data-[active=true]:dark:bg-amber-950/20 data-[active=true]:dark:text-amber-400',
                          'data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-1/2',
                          'data-[active=true]:before:h-4 data-[active=true]:before:w-1',
                          'data-[active=true]:before:-translate-y-1/2 data-[active=true]:before:rounded-r-md',
                          'data-[active=true]:before:bg-amber-500',
                        )}
                        data-active={subItem.isActive}
                      >
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
