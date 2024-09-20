import { Link } from "@remix-run/react";
import { ModeToggle } from "./mode-toggle";

export default function MainNav() {
  return (
    <nav className="container">
      <div className="mx-auto max-w-2xl lg:max-w-5xl flex gap-4">
        <div className="flex flex-1"></div>
        <ul className="flex flex-1 justify-end md:justify-center border-b">
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
            <Link className="nav-link" to="/uses">
              Uses
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/newsletter">
              Newsletter
            </Link>
          </li>
        </ul>
        <div className="flex justify-end md:flex-1">
        <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
