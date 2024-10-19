import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import Spinner from "./Spinner";

export default function Project({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  client: existingClient,
  projectCategory: existingProjectCategory,
  tags: existingTags,
  status: existingStatus,
  livePreview: existingLivePreview,
}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [client, setClient] = useState(existingClient || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [projectCategory, setProjectCategory] = useState(
    existingProjectCategory || []
  );
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || "");
  const [livePreview, setLivePreview] = useState(existingLivePreview || "");

  // For images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createProject(ev) {
    ev.preventDefault();
    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }
    const data = {
      title,
      slug,
      images,
      description,
      projectCategory,
      tags,
      status,
      livePreview,
    };
    if (_id) {
      await axios.put("/api/projects", { ...data, _id });
      toast.success("Project Updated");
      router.push("/projects");
    } else {
      await axios.post("/api/projects", data);
      toast.success("Project Created");
      router.push("/projects");
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
    router.push("/projects");
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
        <title>{_id ? `Edit ${existingTitle}` : "Add Project"}</title>
      </Head>
      <form className="addWebsiteform" onSubmit={createProject}>
        {/* Project title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Project slug url */}
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
        {/* Project Client Name  */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Client Name</label>
          <input
            type="text"
            id="client"
            placeholder="Enter Client Name"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        {/* Live Preview URL */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="livePreview">Live Preview URL</label>
          <input
            type="url"
            id="livePreview"
            placeholder="Enter live preview URL"
            value={livePreview}
            onChange={(e) => setLivePreview(e.target.value)}
          />
        </div>

        {/* Project category */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">
            Select category (for multi-select, press Ctrl + click)
          </label>
          <select
            onChange={(e) =>
              setProjectCategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={projectCategory}
            name="category"
            id="category"
            multiple
          >
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="DevOps">DevOps</option>
            <option value="Database Management">Database Management</option>
            <option value="AI/ML">AI/ML</option>
            <option value="E-commerce Site">E-commerce Site</option>
          </select>
        </div>

        {/* Project images */}
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

        {/* Markdown editor for project description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description" className="w-100">
            Project Description
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
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React JS</option>
            <option value="nodejs">Node JS</option>
            <option value="database">Database</option>
          </select>
        </div>

        {/* Project status */}
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
          <button type="submit" className="w-100 addwebbtn flex-center">
            SAVE PROJECT
          </button>
        </div>
      </form>
    </>
  );
}
