import React, { useState } from "react";
import Link from "next/link";

export interface NavigationProps {
  navLinks: Array<NavLink>;
  isOpen?: boolean;
}

export interface NavLink {
  title: string;
  url: string;
}

const Navigation: React.FC<NavigationProps> = ({
  navLinks,
  isOpen,
}: NavigationProps) => {
  if (!navLinks) {
    return null;
  }

  const links = [...navLinks.filter((l) => l.url !== "/")];
  return (
    <nav className={`sm:flex sm:items-center ${isOpen ? "" : "hidden"}`}>
      {links.map((e: NavLink, i: number) => (
        <Link
          className="block w-full p-2 sm:ml-4 sm:w-1/3 href"
          key={i}
          href={e.url}
        >
          {e.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
