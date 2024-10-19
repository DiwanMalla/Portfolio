import Project from "@/components/Project"; // import your Project form component
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaProjectDiagram } from "react-icons/fa"; // Use relevant icons

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query; // Retrieve project ID from the URL
  const [projectInfo, setProjectInfo] = useState(null); // State to hold project data

  // Fetch project data when the ID is available
  useEffect(() => {
    if (!id) return;
    axios.get("/api/projects?id=" + id).then((response) => {
      setProjectInfo(response.data); // Set the fetched project data
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Project</title>
      </Head>
      <div className="blogpage">
        {/* Page Title and Breadcrumb */}
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{projectInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaProjectDiagram />
            <span>/</span>
            <span>Edit Project</span>
          </div>
        </div>

        {/* Render the Project form component */}
        <div className="mt-3">
          {projectInfo && <Project {...projectInfo} />}
        </div>
      </div>
    </>
  );
}
