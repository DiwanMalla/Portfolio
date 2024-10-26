import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

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
              <Link href="/services">Works</Link>
              <Link href="/services">Resumes</Link>
              <Link href="/services">Skills</Link>
              <Link href="/services">Testinomials</Link>
            </li>
          </div>
        </div>
      </footer>
    </>
  );
}
