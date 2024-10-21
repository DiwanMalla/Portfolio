import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun, LuSunMoon } from "react-icons/lu";

export default function Header() {
  //dark mode on off
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    //check local storage for dark mode preference on initial load
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);
  useEffect(() => {
    //apply dark mode style when darkmode state changes
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", true);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", false);
    }
  }, [darkMode]);

  //toggle darkmode function
  const toggleDarMode = () => {
    setDarkMode(!darkMode); //toggle dark mode status
  };
  //navlist active
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setClicked(false);
  };
  useEffect(() => {
    //update active linke state when the page is loaded
    setActiveLink(router.pathname);
  }, [router.pathname]);
  //mobile navbar
  const [mobile, setMobile] = useState(false);
  //open
  const handleMobileOpen = () => {
    setMobile(!mobile);
  };
  //close
  const handleMobileClose = () => {
    setMobile(false);
  };
  return (
    <>
      <header>
        <nav className="container flex flex-sb">
          <div className="logo flex gap-2">
            <Link href="/">
              <img src="/img/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="navlist flex gap-2">
            <ul className="flex gap-2">
              <li>
                <Link
                  href="/"
                  onClick={() => handleLinkClick("/")}
                  className={activeLink === "/" ? "active" : " "}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/blogs")}
                  className={activeLink === "/blogs" ? "active" : " "}
                  href="/blogs"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/gallery")}
                  className={activeLink === "/gallery" ? "active" : " "}
                  href="/gallery"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/services")}
                  className={activeLink === "/services" ? "active" : " "}
                  href="/services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/projects")}
                  className={activeLink === "/projects" ? "active" : " "}
                  href="/projects"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/shop")}
                  className={activeLink === "/shop" ? "active" : " "}
                  href="/shop"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/contact")}
                  className={activeLink === "/contact" ? "active" : " "}
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="darkmodetoggle" onClick={toggleDarMode}>
              {darkMode ? <IoMoonSharp /> : <LuSun />}
            </div>
            <button>
              <Link href="/contact">Hire Me!</Link>
            </button>
            <div className="mobiletogglesvg" onClick={handleMobileOpen}>
              <HiMiniBars3BottomRight />
            </div>
          </div>
          <div className={mobile ? `mobilenavlist active` : `mobilenavlist`}>
            <span
              onClick={handleMobileClose}
              className={mobile ? `active` : `first-letter:`}
            ></span>
            <div className="mobilelogo">
              <img src="/img/white.png" alt="logo" />
              <h2>Diwan Malla</h2>
            </div>
            <ul
              className="flex gap-1 flex-col flex-left mt-3"
              onClick={handleMobileClose}
            >
              <li>
                <Link
                  href="/"
                  onClick={() => handleLinkClick("/")}
                  className={activeLink === "/" ? "active" : " "}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/blogs")}
                  className={activeLink === "/blogs" ? "active" : " "}
                  href="/blogs"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/gallery")}
                  className={activeLink === "/gallery" ? "active" : " "}
                  href="/gallery"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/services")}
                  className={activeLink === "/services" ? "active" : " "}
                  href="/services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/projects")}
                  className={activeLink === "/projects" ? "active" : " "}
                  href="/projects"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/shop")}
                  className={activeLink === "/shop" ? "active" : " "}
                  href="/shop"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => handleLinkClick("/contact")}
                  className={activeLink === "/contact" ? "active" : " "}
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <p>Copyright &copy; 2024 | diwanmalla</p>
          </div>
        </nav>
      </header>
    </>
  );
}
