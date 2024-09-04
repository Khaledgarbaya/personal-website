import { Link } from "@remix-run/react";
import { ModeToggle } from "./mode-toggle";

export default function MainNav() {
  return (
    <nav className="container mx-auto flex justify-between items-center">
      <Link to="/">
        <img src="/logo.svg" alt="Khaled Garbaya" className="h-10 w-10" />
      </Link>
      <ul className="flex space-x-4 items-center">
        <li>
          <Link className="nav-link" to="/blog">
            Blog
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/til">
            TIL
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/newsletter">
            Newsletter
          </Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}
