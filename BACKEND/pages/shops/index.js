import useFetchData from "@/hooks/useFetchData";
import { SiShopware } from "react-icons/si"; // Example shop icon
import { useState } from "react";
import Dataloading from "@/components/Dataloading";
import Link from "next/link";

//import icon
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Shops() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4); // Default perPage is 4 items per page

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  // Fetch shop data
  const { alldata = [], loading } = useFetchData("/api/shops");

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of products
  const allProducts = alldata?.length;

  // Filter data based on search query
  const filteredProducts =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Calculate the index of the first and last product displayed on the current page
  const indexOfFirstProduct = (currentPage - 1) * perPage;
  const indexOfLastProduct = currentPage * perPage;

  // Get the current page's products
  const currentProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const publishedProducts = Array.isArray(currentProducts)
    ? currentProducts.filter((product) => product.status === "publish")
    : [];

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allProducts / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All published <span>Products</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiShopware />
            <span>/</span>
            <span>Products</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Products:</h2>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2 mb-1">
            <label htmlFor="perPage">Products per page:</label>
            <select
              id="perPage"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to page 1 when changing perPage
              }}
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
          <table className="table table-styling">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <Dataloading />
                  </td>
                </tr>
              ) : (
                <>
                  {publishedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Product Found
                      </td>
                    </tr>
                  ) : (
                    publishedProducts.map((product, index) => (
                      <tr key={product.id}>
                        <td>{indexOfFirstProduct + index + 1}</td>
                        <td>
                          <img
                            src={product.images[0]}
                            width={180}
                            alt="image"
                          />
                        </td>
                        <td>
                          <h3>{product.title}</h3>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/shops/edit/" + product._id}>
                              <button>
                                <FaEdit />
                              </button>
                            </Link>
                            <Link href={"/shops/delete/" + product._id}>
                              <button>
                                <RiDeleteBin6Fill />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </>
              )}
            </tbody>
          </table>
          {/*for pagination*/}
          {publishedProducts.length === 0 ? (
            ""
          ) : (
            <div className="blogpagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
              >
                Previous
              </button>
              {pageNumbers
                .slice(
                  Math.max(currentPage - 2, 0),
                  Math.min(currentPage + 3, pageNumbers.length)
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
    </>
  );
}
