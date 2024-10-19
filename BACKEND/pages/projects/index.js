import useFetchData from "@/hooks/useFetchData";
import { SiBloglovin } from "react-icons/si";
import { useState } from "react";
import Dataloading from "@/components/Dataloading";
import Link from "next/link";

//import icon
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
export default function Projects() {
  //pagination
  const [currentPage, setCurrentPage] = useState(1); //for page 1
  const [perPage] = useState(7);

  //search
  const [searchQuery, setSearchQuery] = useState("");

  //fetch project data
  const { alldata = [], loading } = useFetchData("/api/projects");

  //function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //total number of projects
  const allproject = alldata?.length;

  //filter all data based on search query
  const filteredProjects =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
  //calculate index of the first project displayed on the current page

  const indexOfFirstProject = (currentPage - 1) * perPage;
  const indexOfLastProject = currentPage * perPage;

  //Get the current page's blogs
  const currentProjects = Array.isArray(filteredProjects)
    ? filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
    : [];
  const publishedProject = Array.isArray(currentProjects)
    ? currentProjects.filter((ab) => ab.status === "publish")
    : [];
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allproject / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              All published <span>Projects</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin />
            <span>/</span>
            <span>Projects</span>
          </div>
        </div>
        <div className="blogstable">
          <div className="flex gap-2 mb-1">
            <h2>Search Projects:</h2>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                  {publishedProject.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Project Found
                      </td>
                    </tr>
                  ) : (
                    publishedProject.map((project, index) => (
                      <tr key={project.id}>
                        <td>{indexOfFirstProject + index + 1}</td>
                        <td>
                          <img
                            src={project.images[0]}
                            width={180}
                            alt="image"
                          />
                        </td>
                        <td>
                          <h3>{project.title}</h3>
                        </td>
                        <td>
                          <div className="flex gap-2 flex-center">
                            <Link href={"/projects/edit/" + project._id}>
                              <button>
                                <FaEdit />
                              </button>
                            </Link>
                            <Link href={"/projects/delete/" + project._id}>
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
        </div>
      </div>
    </>
  );
}
