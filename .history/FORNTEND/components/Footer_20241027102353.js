import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div>
          <div>
            <img src="/img/logo.png" />
          </div>
          <div>
            <li>
                <Link>Services</Link>
            </li>
        </div>
      </footer>
    </>
  );
}
