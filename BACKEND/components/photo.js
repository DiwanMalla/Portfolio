
import "react-markdown-editor-lite/lib/index.css";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import Spinner from "./Spinner";

export default function Photo({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);

  // For images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createPhoto(ev) {
    ev.preventDefault();
    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }
    const data = {
      title,
      slug,
      images,
    };
    if (_id) {
      await axios.put("/api/photos", { ...data, _id });
      toast.success("Photo Updated");
      router.push("/gallery");
    } else {
      await axios.post("/api/photos", data);
      toast.success("Photo Created");
      router.push("/gallery");
    }

    setRedirect(true);
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        // Use the axios.post method and push the promise to the queue
        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      // Wait for all images to finish uploading
      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
      toast.success("Images Uploaded");
    } else {
      toast.error("An error occurred!");
    }
  }

  if (redirect) {
    router.push("/gallery");
    return null;
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success("Image Deleted Successfully");
  }

  const handleSlugChange = (e) => {
    const inputValue = e.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-"); // Replace spaces with hyphens
    setSlug(newSlug);
  };

  return (
    <>
      <Head>
        <title>{_id ? `Edit ${existingTitle}` : "Add Photo"}</title>
      </Head>
      <form className="addWebsiteform" onSubmit={createPhoto}>
        {/* Photo title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Photo Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Photo slug url */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug (SEO-friendly URL)</label>
          <input
            type="text"
            id="slug"
            placeholder="Enter slug URL"
            value={slug}
            onChange={handleSlugChange}
          />
        </div>

        {/* Photo images */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label>
              Images (first image will be shown as thumbnail, you can drag to
              reorder)
            </label>
            <input
              type="file"
              id="fileInput"
              className="mt-1"
              accept="image/*"
              multiple
              onChange={uploadImages}
            />
          </div>
          <div className="w-100 flex flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>

        {/* Image preview and image sortable with delete */}
        {!isUploading && (
          <div className="flex">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImagesOrder}
              animation={200}
              className="flex gap-1"
            >
              {images?.map((link, index) => (
                <div key={link} className="uploadedimg">
                  <img src={link} alt="image" className="object-cover" />
                  <div className="deleteimg">
                    <button onClick={() => handleDeleteImage(index)}>
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addwebbtn flex-center">
            SAVE PHOTO
          </button>
        </div>
      </form>
    </>
  );
}
