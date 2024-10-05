import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Aside() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const handleClick = () => {
    setClicked(!clicked);
  };
  const handleLinkClick = (link) => {
    setActiveLink((preActive) => (preActive === link ? null : link));
    setClicked(false);
  };
  useEffect(() => {
    //update active link status when the page is reloaded
    setActiveLink(router.pathname);
  }, [router.pathname]);
  return (
    <>
      <aside className="asideleft active">
        <ul>
          <Link href="/">
            <li className="navactive">
              <IoHome />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link href="/">
            <li
              className={
                activeLink === "/blogs"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/blogs")}
            >
              <div className="flex gap-1">
                <BsPostcard />
                <span>Blogs</span>
              </div>
              {activeLink === "/blogs" && (
                <ul>
                  <Link href="/">
                    <li>All Blogs</li>
                  </Link>
                  <Link href="/">
                    <li>Draft Blogs</li>
                  </Link>
                  <Link href="/">
                    <li>Add Blog</li>
                  </Link>
                </ul>
              )}
            </li>
            <li
              className={
                activeLink === "/projects"
                  ? "navactive flex-col flex-left"
                  : "flex-col flex-left"
              }
              onClick={() => handleLinkClick("/projects")}
            >
              <div className="flex gap-1">
                <BsPostcard />
                <span>Projects</span>
              </div>
              {activeLink === "/projects" && (
                <ul>
                  <Link href="/">
                    <li>All Projects</li>
                  </Link>
                  <Link href="/">
                    <li>Draft Projects</li>
                  </Link>
                  <Link href="/">
                    <li>Add Projects</li>
                  </Link>
                </ul>
              )}
            </li>
          </Link>
        </ul>
      </aside>
    </>
  );
}
