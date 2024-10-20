import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import Blog from "@/components/Blog";
import { SiBloglovin } from "react-icons/si";
import { FaImages } from "react-icons/fa";
export default function DeletePhoto() {
  const router = useRouter();
  const { id } = router.query;
  const [photoInfo, setPhotoInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/photos?id=" + id).then((response) => {
        setPhotoInfo(response.data);
      });
    }
  }, [id]);

  function goBack() {
    router.push("/gallery");
  }
  async function deletePhoto() {
    await axios.delete("/api/photos?id=" + id);
    toast.success("delete succesfully");
    goBack();
  }
  return (
    <>
      <Head>
        <title>Delete Photo</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{photoInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaImages />
            <span>/</span>
            <span>Delete Photo</span>
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
              If you delete this website content it will be permanent delete
              your content.
            </p>
            <div className="buttonContainer">
              <button onClick={deletePhoto} className="acceptButton">
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
