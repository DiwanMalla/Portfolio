import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Head from "next/head";
import Blog from "@/components/Blog";
import { SiBloglovin } from "react-icons/si";
export default function DeleteProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/api/blogs?id=" + id).then((response) => {
        setProductInfo(response.data);
      });
    }
  }, [id]);

  function goBack() {
    router.push("/blogs");
  }
  async function deleteBlog() {
    await axios.delete("/api/blogs?id=" + id);
    toast.success("delete succesfully");
    goBack();
  }
  return (
    <>
      <Head>
        <title>Delete Blog</title>
      </Head>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{productInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiBloglovin />
            <span>/</span>
            <span>Delete blog</span>
          </div>
        </div>
        <div>
          <div>
            <svg></svg>
          </div>
        </div>
      </div>
    </>
  );
}
