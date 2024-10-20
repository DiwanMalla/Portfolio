import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import { FaTrash } from "react-icons/fa"; // Use an appropriate project icon

export default function DeleteProject() {
  const router = useRouter();
  const { id } = router.query; // Get the project ID from the URL
  const [projectInfo, setProjectInfo] = useState(null); // State to hold project data

  // Fetch project data when the ID is available
  useEffect(() => {
    if (!id) return;

    // Fetch the project details
    axios.get("/api/projects?id=" + id).then((response) => {
      setProjectInfo(response.data);
    });
  }, [id]);

  // Function to go back to the project list
  function goBack() {
    router.push("/projects"); // Adjust to your projects list route
  }

  // Function to delete the project
  async function deleteProject() {
    await axios.delete("/api/projects?id=" + id); // Delete request to the API
    toast.success("Project deleted successfully"); // Show success toast
    goBack(); // Redirect to projects list
  }

  return (
    <>
      <Head>
        <title>Delete Project</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Delete <span>{projectInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaTrash />
            <span>/</span>
            <span>Delete Project</span>
          </div>
        </div>
        <div className="deletesec flex flex-center wh_100">
          <div className="deletecard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-10 h-10"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#00F260", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#0575E6", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                d="M48 12H36V10a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v2H16a4 4 0 0 0-4 4v2h40v-2a4 4 0 0 0-4-4zm-4 4H20v36a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V16zM24 24h8v20h-8V24zm12 0h8v20h-8V24z"
                fill="url(#grad1)"
              />
              <path d="M20 10h24v2H20z" fill="currentColor" />
            </svg>
            <p className="cookieHeading">Are you sure?</p>
            <p className="cookieDescription">
              If you delete this project, it will be permanently removed.
            </p>
            <div className="buttonContainer">
              <button onClick={deleteProject} className="acceptButton">
                Delete
              </button>
              <button onClick={goBack} className="declineButton">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
