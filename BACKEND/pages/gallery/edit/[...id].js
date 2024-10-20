import Blog from "@/components/Blog";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import { router, useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { SiBloglovin } from "react-icons/si";
import { FaImages } from "react-icons/fa";
import Photo from "@/components/photo";

export default function EditPhoto() {
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

  return (
    <>
      <Head>
        <title>Update Photo</title>
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
            <span>Edit Photo</span>
          </div>
        </div>
        <div className="mt-3">{photoInfo && <Photo {...photoInfo} />}</div>
      </div>
    </>
  );
}
