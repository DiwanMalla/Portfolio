import Shop from "@/components/Shop";
import { SiShopware } from "react-icons/si";

export default function AddProduct() {
  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Add <span>Product</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <SiShopware />
            <span>/</span>
            <span>AddProduct</span>
          </div>
        </div>
        <div className="blogsadd">
          <Shop />
        </div>
      </div>
    </>
  );
}
