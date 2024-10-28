// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import Head from "next/head";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import handle from "../api/comment";
import Blogsearch from "@/components/Blogsearch";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query; //fetch the slug parameter from the router

  //hook for all data fetching
  const { alldata } = useFetchData("/api/blogs");
  const handleSearchOpen = () => {
    setSearchInput(!searchInput);
  };
  const handleSearchClose = () => {
    setSearchInput(!searchInput);
  };
  const [searchInput, setSearchInput] = useState(false);
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
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/blogs/${slug}`, newComment);
      //check if it's reply or root comment
      if (newComment.parent) {
        //add the new comment to its parent's children array
        {
          const updatedComments = prevData.comments.map((comment) => {
            if (comment._id === newComment.parent) {
              return {
                ...comment,
                children: [...comment.children, response.data],
              };
            } else if (comment.children && comment.children.length > 0) {
              //recursively update children comments
              return {
                ...comment,
                children: updateChildrenComments(
                  comment.children,
                  newComment.parent,
                  response.data
                ),
              };
            }
            return comment;
          });
          return { ...prevData, comments: updatedComments };
        }
      } else {
        //add new root comment
        setBlogData((prevData) => ({
          ...prevData,
          comments: [response.data, ...prevData.comments],
        }));
      }
      setMessageOk("✅ Comment posted succesfully");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); //clear message after 5 seconds
      //clear form after succesfully submission
      setNewComment({
        name: "",
        email: "",
        title: "",
        contentpera: "",
        mainComment: true,
        parent: null,
        parentName: "", //reset parent name after submission
      });
    } catch (err) {
      console.log(err);
      setMessageOk("❌ Failed to post comment");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); //clear message after 5 seconds
    }
  };

  //for scroll down to comment form
  const replyFormRef = useRef();
  const handleReply = (parentCommentId, parentName) => {
    setNewComment({
      ...newComment,
      parent: parentCommentId,
      parentName: parentName, //set parent name for the reply
      mainComment: false, //set maincomment to false for replies
    });
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleRemoveReply = () => {
    setNewComment({
      ...newComment,
      parent: null,
      parentName: null,
      mainComment: true, //set mainComment to true
    });
  };
  const updateChildrenComments = (comments, parentId, newComment) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        //add new reply to children array
        return {
          ...comment,
          children: [...comment.children, newComment],
        };
      } else if (comment.children && comment.children.length > 0) {
        //recursively update children comments
        return {
          ...comment,
          children: updateChildrenComments(
            comment.children,
            parentId,
            newComment
          ),
        };
      }
      return comment;
    });
  };
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
        setCopied(false);
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
  const renderComments = (comments) => {
    if (!comments) {
      return null; //handle case when comments are not yet loaded
    }
    //create a map to efficiently find children of each comment
    const commentsMap = new Map();
    comments.forEach((comment) => {
      if (comment.mainComment) {
        commentsMap.set(comment._id, []);
      }
    });

    //populate children coments into their respective parents
    comments.forEach((comment) => {
      if (!comment.mainComment && comment.parent) {
        if (commentsMap.has(comment.parent)) {
          commentsMap.get(comment.parent).push(comment);
        }
      }
    });
    //render the comments
    return comments
      .filter((comment) => comment.mainComment)
      .map((parentComment) => (
        <div className="blogcomment" key={parentComment._id}>
          <h3>
            {parentComment.name}{" "}
            <span>{new Date(parentComment.createdAt).toLocaleString()}</span>
          </h3>
          <h4>
            Topic: <span>{parentComment.title}</span>
          </h4>
          <p>{parentComment.contentpera}</p>
          <button
            onClick={() => handleReply(parentComment._id, parentComment.name)}
          >
            Reply
          </button>{" "}
          {parentComment.parent && (
            <span className="repliedto">
              Replied to {parentComment.parentName}
            </span>
          )}
          <div className="children-comments">
            {commentsMap.get(parentComment._id).map((childComment) => (
              <div className="child-comment" key={childComment._id}>
                <h3>
                  {childComment.name}
                  <span>
                    {new Date(childComment.createdAt).toLocaleString()}
                  </span>
                </h3>
                <span>Replied to {childComment.parentName}</span>
                <h4>
                  Topic: <span>{childComment.title}</span>
                </h4>
                <p>{childComment.contentpera}</p>
              </div>
            ))}
          </div>
        </div>
      ));
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
                      <span>{copied ? "Copied" : "Copy Code"}</span>
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
                <div className="blogslugtags">
                  <div className="blogstegs">
                    <h2>Tags:</h2>
                    <div className="flex flex-wrap gap-2">
                      {blogData &&
                        blogData.blog.tags.map((cat) => {
                          return <span>{cat}</span>;
                        })}
                    </div>
                  </div>
                </div>
                <div className="blogusecomments">
                  <h2>Comments</h2>
                  {renderComments(blogData.comments)}
                </div>
                <div className="blogslugcomments" ref={replyFormRef}>
                  {newComment.parentName && (
                    <h2>
                      Leave a reply to{" "}
                      <span className="parentname">
                        {newComment.parentName}
                      </span>{" "}
                      <button
                        className="removereplybtn"
                        onClick={handleRemoveReply}
                      >
                        Remove reply
                      </button>
                    </h2>
                  )}
                  {!newComment.parentName && <h2>Leave a reply to</h2>}
                  <p>
                    Your email address will not be publish. Required fields are
                    marked *
                  </p>
                  <form
                    className="leaveareplyform"
                    onSubmit={handleCommentSubmit}
                  >
                    <div className="nameemailcomment">
                      <input
                        type="text"
                        placeholder="Enter Name"
                        value={newComment.name}
                        onChange={(e) =>
                          setNewComment({ ...newComment, name: e.target.value })
                        }
                      />
                      <input
                        type="email"
                        placeholder="Enter Email"
                        value={newComment.email}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <input
                      type="text"
                      value={newComment.title}
                      onChange={(e) =>
                        setNewComment({ ...newComment, title: e.target.value })
                      }
                      placeholder="Comment Title"
                      required
                    />
                    <textarea
                      value={newComment.contentpera}
                      onChange={(e) =>
                        setNewComment({
                          ...newComment,
                          contentpera: e.target.value,
                        })
                      }
                      placeholder="Your Comment"
                      required
                    ></textarea>
                    <button type="submit">Post Comment</button>
                    <p>{messageOk}</p>
                  </form>
                </div>
              </div>
              <div className="rightsitedetails">
                <div className="rightslugsearchbar">
                  <input
                    type="text"
                    placeholder="Search..."
                    onClick={handleSearchOpen}
                  />
                  <button>
                    <FiSearch />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
        </div>
      )}
    </>
  );
};

export default BlogPage;
