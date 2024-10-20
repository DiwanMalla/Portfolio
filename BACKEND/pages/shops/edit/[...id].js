import Shop from "@/components/Shop";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SiShopware } from "react-icons/si"; // Relevant icon for shops

export default function EditShop() {
  const router = useRouter();
  const { id } = router.query; // Get the shop ID from the URL
  const [productInfo, setProductInfo] = useState(null); // State to hold shop data

  // Fetch shop data when the ID is available
  useEffect(() => {
    if (!id) return;
    axios.get("/api/shops?id=" + id).then((response) => {
      setProductInfo(response.data); // Set the fetched shop data
    });
  }, [id]);

  return (
    <>
      <Head>
        <title>Edit Product</title>
      </Head>
      <div className="blogpage">
        {/* Page Title and Breadcrumb */}
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Edit <span>{productInfo?.title}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiShopware />
            <span>/</span>
            <span>Edit Shop</span>
          </div>
        </div>

        {/* Render the Shop form component */}
        <div className="mt-3">
          {productInfo && <Shop {...productInfo} />}{" "}
          {/* Render the form with shop data */}
        </div>
      </div>
    </>
  );
}
