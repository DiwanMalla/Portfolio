import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage, setPerPage] = useState(4);

  //search
  const [searchQuery, setSearchQuery] = useState("");

  //fetch blog category data
  const { alldata, loading } = useFetchData(
    `/api/blogs?blogCategory=${category}`
  );
  const filteredBlogs = alldata
    .filter((item) => item.category === item.category)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);

  const blogCategoryData = [...filteredBlogs].reverse();

  //function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const allblog = alldata?.length;
  //calculate index of the first blog displayed on the current page

  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastBlog = currentPage * perPage;
  //Get the current page's blogs
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const publishedData = currentBlogs.filter((ab) => ab.status === "publish");
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <Head>
        <title>Blog category page</title>
      </Head>
      <div className="blogcategory">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  category <span>{category}</span>
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostssec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>{category} Article :</h3>
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
                              </Link>{" "}
                            </h3>
                            <p>{blog.description}</p>
                            <h4 className="flex">
                              <img src="/img/me.png" alt="author" />
                              <span> by Diwan Malla</span>
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

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
        </section>
      </div>
    </>
  );
}
