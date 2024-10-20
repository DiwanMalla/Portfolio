import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import Spinner from "./Spinner";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

export default function Product({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  tags: existingTags,
  afilink: existingAfilink,
  price: existingPrice,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [tags, setTags] = useState(existingTags || []);
  const [afilink, setAfilink] = useState(existingAfilink || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [status, setStatus] = useState(existingStatus || "");

  // For images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createProduct(ev) {
    ev.preventDefault();
    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }
    const data = {
      title,
      slug,
      images,
      description,
      tags,
      afilink,
      price,
      status,
    };
    if (_id) {
      await axios.put("/api/shops", { ...data, _id });
      toast.success("Product Updated");
      router.push("/shops");
    } else {
      await axios.post("/api/shops", data);
      toast.success("Product Created");
      router.push("/shops");
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
    router.push("/shops");
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
        <title>{_id ? `Edit ${existingTitle}` : "Add Product"}</title>
      </Head>
      <form className="addWebsiteform" onSubmit={createProduct}>
        {/* Product title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Product slug url */}
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

        {/* Product affiliate link */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="afilink">Affiliate Link</label>
          <input
            type="url"
            id="afilink"
            placeholder="Enter affiliate link"
            value={afilink}
            onChange={(e) => setAfilink(e.target.value)}
          />
        </div>

        {/* Product price */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Product images */}
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

        {/* Image preview and sortable */}
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

        {/* Markdown editor for product description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description" className="w-100">
            Product Description
            <MarkdownEditor
              className="w-100"
              style={{ height: "400px" }}
              value={description}
              onChange={(e) => setDescription(e.text)}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            />
          </label>
        </div>

        {/* Tags */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">
            Tags (for multi-select, press Ctrl + click)
          </label>
          <select
            name="tags"
            id="tags"
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={tags}
            multiple
          >
            <option value="mobile">Mobile</option>
            <option value="smartphone">Smartphone</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="accessories">Accessories</option>
            <option value="gadgets">Gadgets</option>
          </select>
        </div>

        {/* Product status */}
        <div className="flex w-100 flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">No select</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addProductBtn flex-center">
            SAVE PRODUCT
          </button>
        </div>
      </form>
    </>
  );
}
