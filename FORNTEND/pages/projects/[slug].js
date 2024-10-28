import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";
export default function ProjectSlug() {
  const router = useRouter();
  const { slug } = router.query;

  const { alldata, loading } = useFetchData(`/api/projects`);

  // Filter the data based on the slug
  const filteredData =
    alldata?.filter((project) => project.slug === slug) || [];
  console.log(filteredData);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case where no projects are found
  if (filteredData.length === 0) {
    return <div>No project found for this slug.</div>;
  }

  const createdAtDate = filteredData[0].createdAt
    ? new Date(filteredData[0].createdAt)
    : null;
  //function to format the date as '27 oct 2024 14:11pm'
  const formatDate = (date) => {
    //check if date is valid
    if (!date || isNaN(date)) {
      return ""; //or handle the error as needed
    }
    const options = {
      day: "2-digit",
      month: "short", // 'short' gives abbreviated month names
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour clock
    };
    return new Intl.DateTimeFormat("en-Us", options).format(date);
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
  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <div className="projectslug">
        {filteredData.map((project, index) => (
          <>
            <div key={index} className="projectslugimg">
              <div className="container">
                <div className="proslugimg">
                  <img src={project.images[0]} alt={project.title} />
                </div>
                <div className="projectsluginfo">
                  <div className="leftmainproinfo">
                    <h1>{project.title}</h1>
                    <div className="rightrecentpost">
                      {filteredData.map((project) => {
                        return (
                          <Link
                            key={project.slug} // add unique key for each project
                            href={`/projects/${project.slug}`}
                            className="rightrecentp"
                          >
                            <img src={project.images[0]} alt={project.title} />
                            <div>
                              <h3>Tags</h3>
                              <h4 className="mt-1">
                                {project.tags.map((tag) => (
                                  <span key={tag}>{tag}</span>
                                ))}
                              </h4>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.livePreview}
                    >
                      Live Preview
                    </a>
                  </div>
                  <div className="rightmainproinfo">
                    <div>
                      <h3>Categories</h3>
                      {/* Display categories in a comma-separated format */}
                      <h2>
                        {Array.isArray(project.projectCategory) &&
                        project.projectCategory.length > 0
                          ? project.projectCategory.join(", ")
                          : "No categories available"}
                      </h2>
                    </div>
                    <div>
                      <h3>Client</h3>
                      <h2>{project?.client}</h2>
                    </div>
                    <div>
                      <h3>Start Date</h3>
                      <h2>{formatDate(createdAtDate)}</h2>
                    </div>
                    <div>
                      <h3>Created By</h3>
                      <h2>Diwan Malla</h2>
                    </div>
                  </div>
                </div>
                <div className="projectslugsliderimg">
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={30}
                    freeMode={true}
                    grabCursor={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                  >
                    {filteredData[0]?.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img src={image} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="projectslugdescription">
              <div className="containers">
                <div className="psdescri">
                  <h2>Project Description</h2>
                  <div className="blogcontent">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{ code: Code }}
                    >
                      {filteredData[0].description}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
