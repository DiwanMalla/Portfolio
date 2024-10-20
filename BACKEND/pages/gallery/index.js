import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import Dataloading from "@/components/Dataloading";
import Link from "next/link";

//import icon
import { FaEdit, FaImages } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
export default function Gallery() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage, setPerPage] = useState(4);

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  //fetch photo data
  const { alldata = [], loading } = useFetchData("/api/photos");
  console.log(alldata);
  //function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //total number of photos
  const allPhotos = alldata?.length;

  //filter all data based on search query
  const filteredPhotos =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((photo) =>
          photo.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  //calculate index of the first photo displayed on the current page
  const indexOfFirstPhoto = (currentPage - 1) * perPage;
  const indexOfLastPhoto = currentPage * perPage;

  //Get the current page's photos
  const currentPhotos = Array.isArray(filteredPhotos)
    ? filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto)
    : [];
  const publishedPhotos = Array.isArray(currentPhotos) ? currentPhotos : [];
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPhotos / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All published <span>Photos</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaImages />
            <span>/</span>
            <span>Gallery</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Photos:</h2>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2 mb-1">
            <label htmlFor="perPage">Photos per page:</label>
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
                <th>Title</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <tr>
                    <td>
                      <Dataloading />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {publishedPhotos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Photos Found
                      </td>
                    </tr>
                  ) : (
                    publishedPhotos.map((photo, index) => (
                      <tr key={photo.id}>
                        <td>{indexOfFirstPhoto + index + 1}</td>
                        <td>
                          <img src={photo.images[0]} width={180} alt="image" />
                        </td>
                        <td>
                          <h3>{photo.title}</h3>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/gallery/edit/" + photo._id}>
                              <button>
                                <FaEdit />
                              </button>
                            </Link>
                            <Link href={"/gallery/delete/" + photo._id}>
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
          {publishedPhotos.length === 0 ? (
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
    </>
  );
}
