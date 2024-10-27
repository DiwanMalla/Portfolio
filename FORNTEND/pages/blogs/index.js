import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function blogs() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage, setPerPage] = useState(4);

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  //fetch blog data
  const { alldata = [], loading } = useFetchData("/api/blogs");

  //function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //total number of blogs
  const allblog = alldata?.length;

  //filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
  //calculate index of the first blog displayed on the current page

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;

  //Get the current page's blogs
  const currentBlogs = Array.isArray(filteredBlogs)
    ? filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
    : [];
  const publishedData = Array.isArray(currentBlogs)
    ? currentBlogs.filter((ab) => ab.status === "publish")
    : [];
  const sliderpubdata = alldata.filter((ab) => ab.status === "publish");
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <Head>
        <title>Blogs</title>
      </Head>
      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  Welcome to <span>Diwan Blogs!</span>
                </h1>
                <p>
                  I write about we, mobile app development and moern Havascript
                  frameworks. The best articles, links and news related to web
                  and mobile app development
                </p>
                <div className="subemail">
                  <form className="flex">
                    <input placeholder="Search blogs here.." type="text" />
                    <button>Search</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="featured">
              <div className="container">
                <div className="border"></div>
                <div className="featuredposts">
                  <div className="fetitle flex">
                    <h3>Featured Posts:</h3>
                  </div>
                  <div className="feposts flex">
                    <Swiper
                      slidesPerView={"auto"}
                      freeMode={true}
                      spaceBetween={30}
                      className="mySwiper"
                      modules={[FreeMode]}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <>
                          {sliderpubdata.slice(0, 6).map((blog) => {
                            return (
                              <SwiperSlide key={blog._id}>
                                <div className="fpost" key={blog._id}>
                                  <Link href={`/blogs/${blog.slug}`}>
                                    <img
                                      src={blog.images[0]}
                                      alt={blog.title}
                                    />
                                  </Link>
                                  <div className="fpostinfo">
                                    <div className="tegs flex">
                                      {blog.blogCategory.map((cat) => {
                                        return (
                                          <Link
                                            href={`/blog/category${cat}`}
                                            className="ai"
                                          >
                                            <span></span>
                                            {cat}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                    <h2>
                                      <Link href={`/blogs/${blog.slug}`}>
                                        {blog.title}
                                      </Link>
                                    </h2>
                                    <div className="fpostby flex">
                                      <img src="/img/me.png" alt="author" />
                                      <p>By Diwan Malla</p>
                                    </div>
                                  </div>
                                </div>
                              </SwiperSlide>
                            );
                          })}
                        </>
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="populartegssec">
          <div className="container">
            <div className="border"></div>
            <div className="populartegsdata">
              <div className="fetile">
                <h3>Popular Tags</h3>
              </div>
              <div className="poputegs">
                <Link href="/blog/category/Next Js" className="pteg">
                  <img src="/img/skills/next-js.webp" alt="Next js" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Next Jsx
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Node Js" className="pteg">
                  <img src="/img/skills/node-js.svg" alt="Node js" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Node Jsx
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/javascript" className="pteg">
                  <img src="/img/skills/javascript.svg" alt="Javascript" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Javascript
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/React Js" className="pteg">
                  <img src="/img/skills/react.svg" alt="react" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>React Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/tailwind" className="pteg">
                  <img src="/img/skills/tailwind.svg" alt="tailwind" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Tailwind CSS
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostsec ">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Latest Articles:</h3>
              </div>
              <div className="latestposts">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    {publishedData.map((blog) => {
                      return (
                        <div className="lpost" key={blog._id}>
                          <div className="lpostimg">
                            <Link href={`/blogs/${blog.slug}`}>
                              <img src={blog.images[0]} alt={blog.title} />
                            </Link>
                            <div className="tegs">
                              {blog.blogCategory.map((cat) => {
                                return (
                                  <Link
                                    href={`/blog/category${cat}`}
                                    className="ai"
                                  >
                                    <span></span>
                                    {cat}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                          <div className="lpostinfo">
                            <h3>
                              <Link href={`/blogs/${blog.slug}`}>
                                {blog.title}
                              </Link>
                              <p>{blog.description}</p>
                              <h4 className="flex">
                                <img src="/img/me.png" alt="author" />
                                <span> by Diwan Malla</span>
                              </h4>
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div>
              {/*for pagination*/}
              {publishedData.length === 0 ? (
                ""
              ) : (
                <div className="blogspaginationbtn flex flex-center mt-3 mb-3">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                  >
                    Previous
                  </button>
                  {pageNumbers
                    .slice(
                      Math.max(currentPage - 3, 0),
                      Math.min(currentPage + 2, pageNumbers.length)
                    )
                    .map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`${currentPage === number ? "active" : ""}`}
                      >
                        {number}
                      </button>
                    ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    aria-label={`Go to page ${currentPage + 1}`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
