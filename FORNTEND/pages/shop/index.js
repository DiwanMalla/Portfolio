import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Shop() {
  const { alldata, loading } = useFetchData(`/api/shops`);
  const publishData = alldata.filter((ab) => ab.status === "publish");

  // Function to format the date as '27 Oct 2024 02:11 PM'
  const formatDate = (date) => {
    if (!date || isNaN(date)) {
      return ""; // Handle the error as needed
    }
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour clock
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <div className="shoppage">
        <div className="shoppagetoptitle">
          <div className="container">
            <h2>Demo Only</h2>
            <br />
            <br />
            <h3>SHOP ONLINE</h3>
            <h2>OUR PRODUCTS</h2>
          </div>
        </div>
        <div className="shopproducts">
          <div className="container">
            <div className="shopprocards">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {publishData.map((pro) => {
                    const createdAtDate = pro.createdAt
                      ? new Date(pro.createdAt)
                      : null; // Get the createdAt date for each product

                    return (
                      <Link
                        href={`/shop/${pro.slug}`}
                        key={pro._id}
                        className="spprocard"
                      >
                        <div className="spprocardimg">
                          <img src={pro.images[0]} alt={pro.title} />
                        </div>
                        <div className="spprocinfo">
                          <h2>{pro.title}</h2>
                          <h3>${pro.price}</h3>{" "}
                          {/* Added a dollar sign for price */}
                          <div className="spprotags">
                            {pro.tags.map((tag) => {
                              return <span key={tag}>{tag}</span>;
                            })}
                          </div>
                          <p>{formatDate(createdAtDate)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
