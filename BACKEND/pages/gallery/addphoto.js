import Photo from "@/components/photo";
import { FaImages } from "react-icons/fa";

export default function addphoto() {
  return (
    <>
      <div className="addblogspage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Add <span>Photo</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <FaImages />
            <span>/</span>
            <span>AddPhoto</span>
          </div>
        </div>
        <div className="blogsadd">
          <Photo />
        </div>
      </div>
    </>
  );
}
