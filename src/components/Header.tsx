import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const Header = () => {
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
        <nav className={`sm:flex sm:items-center ${isOpen ? "" : "hidden"}`}>
          <Link
            className="block w-full p-2 sm:ml-4 sm:w-1/3 href"
            href="/about"
          >
            About
          </Link>

          <Link
            className="block w-full p-2 sm:ml-4 sm:w-1/3 href"
            href="/courses"
          >
            Courses
          </Link>

          <Link
            className="p-2 sm:ml-4 w-full block sm:w-1/3 href"
            href="/newsletter"
          >
            Newsletter
          </Link>
        </nav>
      </div>
    </header>
  );
};
