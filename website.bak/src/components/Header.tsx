import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import { useState } from "react";

export const Header = ({
  navLinks,
}: {
  navLinks: { title: string; url: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="container items-center justify-between p-4 mx-auto sm:flex">
      <div className="w-full sm:flex sm:justify-between">
        <div className="flex items-center justify-between px-3 py-3">
          <div>
            <h1 className="p-2">
              <Link
                href="/"
                aria-label="Khaled Garbaya"
                title="khaledgarbaya.net"
              >
                <Image
                  className="w-16 h-16 mx-auto"
                  width={64}
                  height={64}
                  src="/logo.svg"
                  alt="logo"
                />
              </Link>
            </h1>
          </div>
          <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
        <Navigation navLinks={navLinks} isOpen={isOpen} />
      </div>
    </header>
  );
};
