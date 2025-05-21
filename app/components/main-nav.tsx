import { useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import { ModeToggle } from "./mode-toggle";
import { Menu, X } from "lucide-react";

export default function MainNav() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="container">
      <div className="mx-auto max-w-2xl lg:max-w-6xl flex items-center justify-between">
        <div className="flex items-center">
          {location.pathname !== "/" && (
            <Link to="/" className="nav-link" viewTransition>
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-8"
                style={{
                  viewTransitionName: "logo",
                }}
              />
            </Link>
          )}
        </div>

        <button
          className="md:hidden z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`
          fixed inset-0 bg-background/95 backdrop-blur-sm z-40
          flex flex-col items-center justify-center
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          md:static md:bg-transparent md:flex-row md:justify-between md:opacity-100 md:visible
        `}
        >
          <ul className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <li>
              <Link
                className="nav-link"
                to="/blog"
                viewTransition
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/til"
                viewTransition
                onClick={toggleMenu}
              >
                TIL
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/about"
                viewTransition
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/uses"
                viewTransition
                onClick={toggleMenu}
              >
                Uses
              </Link>
            </li>
            <li>
              <Link
                className="nav-link"
                to="/newsletter"
                viewTransition
                onClick={toggleMenu}
              >
                Newsletter
              </Link>
            </li>
          </ul>
          <div className="mt-4 md:mt-0">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
