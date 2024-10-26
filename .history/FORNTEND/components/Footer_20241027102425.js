import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footersec flex">
          <div>
            <img src="/img/logo.png" />
          </div>
          <div>
            <li>
              <Link href="/services">Services</Link>
            </li>
          </div>
        </div>
      </footer>
    </>
  );
}
