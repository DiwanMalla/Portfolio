import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);
  const [mobile, setMobile] = useState(false);

  // Check and set dark mode preference on initial load
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  // Apply dark mode class on state change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Set active link on initial load or when pathname changes
  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);

  const handleMobileToggle = () => setMobile(!mobile);

  return (
    <header>
      <nav className="container flex flex-sb">
        <div className="logo flex gap-2">
          <Link href="/">
            <img
              src={darkMode ? "/img/white.png" : "/img/logo.png"}
              alt="logo"
            />
          </Link>
        </div>
        <div className="navlist flex gap-2">
          <ul className="flex gap-2">
            {[
              { name: "Home", path: "/" },
              { name: "Blogs", path: "/blogs" },
              { name: "Gallery", path: "/gallery" },
              { name: "Services", path: "/services" },
              { name: "Projects", path: "/projects" },
              { name: "Shop", path: "/shop" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={activeLink === link.path ? "active" : ""}
                  scroll={false}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="darkmodetoggle" onClick={toggleDarkMode}>
            {darkMode ? <IoMoonSharp /> : <LuSun />}
          </div>
          <button>
            <Link href="/contact">Hire Me!</Link>
          </button>
          <div className="mobiletogglesvg" onClick={handleMobileToggle}>
            <HiMiniBars3BottomRight />
          </div>
        </div>
        {mobile && (
          <div className="mobilenavlist active">
            <div onClick={handleMobileToggle}>
              <HiMiniBars3BottomRight />
            </div>
            <ul>
              {[
                { name: "Home", path: "/" },
                { name: "Blogs", path: "/blogs" },
                { name: "Gallery", path: "/gallery" },
                { name: "Services", path: "/services" },
                { name: "Projects", path: "/projects" },
                { name: "Shop", path: "/shop" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={activeLink === link.path ? "active" : ""}
                    scroll={false}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p>Copyright &copy; 2024 | diwanmalla</p>
          </div>
        )}
      </nav>
    </header>
  );
}
