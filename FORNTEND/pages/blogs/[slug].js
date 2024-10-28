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
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
// import handle from "../api/comment";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query; //fetch the slug parameter from the router

  //hook for all data fetching
  const { alldata } = useFetchData("/api/blogs");

  const [blogData, setBlogData] = useState({ blog: {}, comments: [] }); //initialize comments as an empty array
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpera: "",
    mainComment: true,
    parent: null, //track parent comment id for replies
    parentName: "", //track parent comment name
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [messageOk, setMessageOk] = useState("");
  useEffect(() => {
    const fetchBlogsData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch blog data, please try again later.");
          setLoading(false);
        }
      }
    };
    fetchBlogsData();
  }, [slug]); //fetch the data whenever slug changes

  if (loading) {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <p>Error:{error}</p>;
  }

  //function to format the date as '27 oct 2024 14:11pm'
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Date unavailable";

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const blogUrl = `http://localhost:3000/blogs/${slug}`;

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); //reset copied after 3 seconds
  };
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setTimeout(false);
      }, 3000); //3 seconds
    };
    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflow: "auto",
                whiteSpace: "pre-wrao",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
          >
            {copied ? "Copied" : "Copy Code"}
          </button>
        </div>
      );
    } else {
      return <code className="md-post-code">{children}</code>;
    }
  };
  return (
    <>
      <Head>
        <title>{blogData.blog.title}</title>
      </Head>
      {blogData && (
        <div className="blogslugpage">
          <div className="container">
            <div className="blogslugpagecont">
              <div className="leftsidedetails">
                <div className="leftbloginfoimg">
                  <img
                    src={blogData.blog.images[0] || `/img/noimage.png`}
                    alt={blogData && blogData.title}
                  />
                </div>
                <div className="slugbloginfopub">
                  <div className="flex gap-2">
                    <div className="adminslug">
                      <img src={`/img/me.png`} />
                      <span>By Diwan Malla</span>
                    </div>
                    <div className="adminslug">
                      <SlCalender />
                      <span>{formatDate(blogData.blog.createdAt)}</span>
                    </div>
                    <div className="adminslug">
                      <CiRead />
                      <span>
                        Comments (
                        {blogData.comments ? blogData.comments.length : 0})
                      </span>
                    </div>
                  </div>
                  <div className="shareblogslug ml-3">
                    {/* Copy URL button */}
                    <div
                      title="Copy URL"
                      onClick={() => handleCopyUrl(blogUrl)}
                      style={{ cursor: "pointer" }}
                    >
                      <BsCopy />
                      <span>{copied ? "Copied" : ""}</span>
                    </div>

                    {/* Facebook share button */}
                    <a
                      target="_blank"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        blogUrl
                      )}`}
                      rel="noopener noreferrer"
                    >
                      <RiFacebookFill />
                    </a>

                    {/* Twitter share button */}
                    <a
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `Check out this blog post: ${blogUrl}`
                      )}&text=${encodeURIComponent(blogData.blog.title)}`}
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
                    </a>

                    {/* WhatsApp share button */}
                    <a
                      target="_blank"
                      href={`https://wa.me/?text=${encodeURIComponent(
                        blogUrl
                      )}`}
                      rel="noopener noreferrer"
                    >
                      <RiWhatsappFill />
                    </a>

                    {/* LinkedIn share button */}
                    <a
                      target="_blank"
                      href={`https://www.linkedin.com/shareArticle?text=${encodeURIComponent(
                        `Check out this blog post: ${blogUrl}`
                      )}&title=${encodeURIComponent(blogData.blog.title)}`}
                      rel="noopener noreferrer"
                    >
                      <BiLogoLinkedin />
                    </a>
                  </div>
                </div>
                <h1>{blogData.blog.title}</h1>
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="blogcontent">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{ code: Code }}
                    >
                      {blogData.blog.description}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
