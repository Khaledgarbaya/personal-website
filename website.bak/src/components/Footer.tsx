import Image from "next/image";
import React from "react";

export const Footer = () => (
  <footer className=" text-sm text-gray-800 mx-auto border-t border-teal-600 py-4 text-center space-y-5">
    <div>
      <strong>
        © 2012–{new Date().getUTCFullYear()} Copyright Khaled Garbaya. All
        rights reserved.
      </strong>
    </div>
    <div>
      <a
        href="https://www.contentful.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
          style={{ maxWidth: "100px", width: "100%" }}
          width={100}
          height={32}
          className="mx-auto"
          alt="Contentful Logo"
        />
      </a>
    </div>
  </footer>
);
