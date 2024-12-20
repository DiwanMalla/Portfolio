import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footersec flex flex-center flex-col gap-2">
          <div className="logo">
            <img src="/img/logo.png" alt="logo" />
          </div>
          <div className="ul flex gap-2">
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/services">Works</Link>
            </li>
            <li>
              {" "}
              <Link href="/services">Resumes</Link>
            </li>
            <li>
              <Link href="/services">Skills</Link>
            </li>
            <li>
              {" "}
              <Link href="/services">Testinomials</Link>
            </li>
            <li>
              {" "}
              <Link href="/contact">Contact</Link>
            </li>
          </div>
          <ul className="hero_social">
            <li>
              <a href="https://www.facebook.com/dipin.malla.9/">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/dipin_malla/?hl=en">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/diwan-malla/">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://www.github.com/diwanmalla">
                <FaGithub />
              </a>
            </li>
          </ul>
          <div className="copyrights">
            &copy; 2024 All Rights Reserved By <span>Diwan Malla</span>
          </div>
        </div>
      </footer>
    </>
  );
}
