import { useState } from "react";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { GrContactInfo } from "react-icons/gr";

export default function Contacts() {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  // Fetch contact data
  const { alldata = [], loading } = useFetchData("/api/contacts");

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Total number of contacts
  const allContacts = alldata?.length;

  // Filter contacts based on search query
  const filteredContacts =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter(
          (contact) =>
            contact.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.lname.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Calculate the index of the first and last contact displayed on the current page
  const indexOfFirstContact = (currentPage - 1) * perPage;
  const indexOfLastContact = currentPage * perPage;

  // Get the current page's contacts
  const currentContacts = Array.isArray(filteredContacts)
    ? filteredContacts.slice(indexOfFirstContact, indexOfLastContact)
    : [];

  // Page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allContacts / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All <span>Contacts</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <GrContactInfo />
            <span>/</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Contacts:</h2>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2 mb-1">
            <label htmlFor="perPage">Contacts per page:</label>
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone no</th>
                <th>Project</th>
                <th>Open Contact</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <Dataloading />
                  </td>
                </tr>
              ) : (
                <>
                  {currentContacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Contacts Found
                      </td>
                    </tr>
                  ) : (
                    currentContacts.map((contact, index) => (
                      <tr key={contact._id}>
                        <td>{indexOfFirstContact + index + 1}</td>
                        <td>
                          {contact.fname} {contact.lname}
                        </td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.project[0]}</td>

                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/contacts/view/" + contact._id}>
                              <button>
                                <FaRegEye />
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
          {currentContacts.length === 0 ? (
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
