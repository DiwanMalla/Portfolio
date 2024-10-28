import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Ensure styles are imported

export default function ShopSlug() {
  const router = useRouter();
  const { slug } = router.query;
  const { alldata, loading } = useFetchData(`/api/shops?slug=${slug}`);
  const [mainImage, setMainImage] = useState("");

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  // UseEffect to set mainImage once alldata is available
  useEffect(() => {
    if (alldata && alldata.images && alldata.images.length > 0) {
      setMainImage(alldata.images[0]); // Set the first image as the main image
    }
  }, [alldata]);

  // Handle loading state
  if (loading) {
    return <Spinner />; // Use your Spinner component for loading state
  }

  // Handle case where no shops are found
  if (!alldata) {
    return <div>No shop found for this slug.</div>;
  }

  const createdAtDate = alldata.createdAt ? new Date(alldata.createdAt) : null;

  // Function to format the date
  const formatDate = (date) => {
    if (!date || isNaN(date)) {
      return ""; // Handle the error as needed
    }
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

  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // 3 seconds
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
                whiteSpace: "pre-wrap",
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
        <title>{alldata.title}</title>
      </Head>

      <div className="shopslugpage">
        <div className="shopcontent">
          <div className="container">
            <div className="shopcontbox">
              <div className="leftshopimgbox">
                <div className="leftshopmainimg">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <img src={mainImage} alt={"Main product"} />
                  )}
                </div>
                <div className="leftsimgboxlist">
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={30}
                    freeMode={true}
                    grabCursor={false}
                    modules={[FreeMode]}
                    className="mySwiper"
                  >
                    {alldata?.images?.length > 0 ? (
                      alldata.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            onClick={() => handleImageClick(image)}
                            src={image}
                            alt={`Thumbnail ${index}`}
                            style={{ cursor: "pointer" }} // Add cursor style
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <div>No images available</div> // Handle case when there are no images
                    )}
                  </Swiper>
                </div>
              </div>
              <div className="rightshopcontbox">
                <h1>{alldata?.title}</h1>
                <h3 className="rightshopprice">
                  Price: <span>{alldata.price}</span>
                </h3>
                <a
                  className="shopnowbtn"
                  target="_blank"
                  href={alldata.afilink}
                >
                  Shop Now
                </a>
                <div className="blogcontent">
                  <h2 className="bctitle">Product Details: </h2>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{ code: Code }}
                  >
                    {alldata.description}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
