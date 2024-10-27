// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query; //fetch the slug parameter from the router

  //hook for all data fetching
  const { alldata } = useFetchData("/api/blogs");

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <div className="blogslugpage">
        <div className="container">
          <div className="blogslugpagecont">
            <div className="leftsidedetails">
              <div className="leftbloginfoimg">
                <img src={alldata} />
              </div>
              <div className="slugbloginfopub">
                <div className="flex gap-2">
                  <div className="adminslug">
                    <img src="/img/me.png" />
                    <span>By Diwan Malla</span>
                  </div>
                  <div className="adminslug">
                    <SlCalender />
                    <span>pending</span>
                  </div>
                  <div className="adminslug">
                    <CiRead />
                    <span>Comments (pending)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
