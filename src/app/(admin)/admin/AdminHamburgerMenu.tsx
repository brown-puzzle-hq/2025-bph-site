import { auth } from "~/server/auth/auth";
import { LogoutButton } from "~/app/nav/LogoutButton";
import { HamburgerMenu, MenuItem } from "~/app/nav/HamburgerMenu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AdminHamburgerMenu() {
  const session = await auth();

  const OtherMenuItems = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>+</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Errata</DropdownMenuItem>
          <DropdownMenuItem>Feedback</DropdownMenuItem>
          <DropdownMenuItem>Queries</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const leftMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      type: "link",
    },
    {
      title: "Puzzles",
      href: "/admin/solutions",
      type: "link",
    },
    {
      title: "Teams",
      href: "/admin/teams",
      type: "link",
    },
    {
      title: "Hints",
      href: "/admin/hints",
      type: "link",
    },
    {
      title: "Other",
      element: <OtherMenuItems />,
      type: "element",
    },
  ];

  const rightMenuItems: MenuItem[] = [
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
    {
      title: "Logout",
      element: <LogoutButton />,
      type: "element",
    },
  ];

  const hambergerMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      type: "link",
    },
    {
      title: "Puzzles",
      href: "/admin/solutions",
      type: "link",
    },
    {
      title: "Teams",
      href: "/admin/teams",
      type: "link",
    },
    {
      title: "Hints",
      href: "/admin/hints",
      type: "link",
    },
    {
      title: "Errata",
      href: "/admin/errata",
      type: "link",
    },
    {
      title: "Feedback",
      href: "/admin/feedback",
      type: "link",
    },
    {
      title: "Queries",
      href: "/admin/sql",
      type: "link",
    },
    {
      title: "Hunt",
      href: "/",
      type: "link",
    },
    {
      title: "Logout",
      element: <LogoutButton />,
      type: "element",
    },
  ];

  return (
    <HamburgerMenu
      leftMenuItems={leftMenuItems}
      rightMenuItems={rightMenuItems}
      hambergerMenuItems={hambergerMenuItems}
      side="admin"
    />
  );
}
