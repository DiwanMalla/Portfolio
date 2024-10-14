import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";

export default function Blog({ _id }) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("");

  //for images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];
  async function createBlog(ev) {
    ev.preventDefault();
    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }
    const data = {
      title,
      slug,
      images,
      description,
      blogCategory,
      tags,
      status,
    };
    if (_id) {
      await axios.put("/api/blogs", { ...data, _id });
      toast.success("Data Updated");
      router.push("/blogs");
    } else {
      await axios.post("/api/blogs", data);
      toast.success("Blog Created");
      router.push("/blogs");
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

        //use the axios.post method and push the promise to the queue
        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      //wait for all images to finish uploading
      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
      toast.success("Images Uploaded");
    } else {
      toast.error(`An error occured!`);
    }
  }
  if (redirect) {
    router.push("/blogs");
    return null;
  }

  function updateImagesOrder(images) {
    setImages(images);
  }
  function handleDeleteImage(index) {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setImages(updateImages);
    toast.success("Image Deleted Successfully");
  }
  //for slug url
  const handleSlugChange = (e) => {
    const inputValue = e.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-"); //replace spaces with hyphens
    setSlug(newSlug);
  };
  console.log(title, slug, blogCategory);
  return (
    <>
      <form className="addWebsiteform" onSubmit={createBlog}>
        {/*blog title*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter small title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/*blog slug url*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug (seo friendly url)</label>
          <input
            type="text"
            id="slug"
            placeholder="Enter slug url"
            value={slug}
            onChange={handleSlugChange}
          />
        </div>
        {/*blog category*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">
            Select category (for multi select press ctrl + mouse left key)
          </label>
          <select
            onChange={(e) =>
              setBlogCategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={blogCategory}
            name="category"
            id="category"
            multiple
          >
            <option value="Node js">Node Js</option>
            <option value="React js">React Js</option>
            <option value="Next js">Next Js</option>
            <option value="CSS">CSS</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Flutter Dev">Flutter Dev</option>
            <option value="Database">Database</option>
            <option value="Deployment">Deployment</option>
          </select>
        </div>
        {/*blog image*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label>
              Images (first image will be show as thumbnail, you can drag)
            </label>
            <input
              type="file"
              id="fileInput"
              className="mt-1"
              accept="image/"
              multiple
              onChange={uploadImages}
            />
          </div>
          <div className="w-100 flex flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>

        {/*Image preview and image sortable with delete image*/}
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
        {/*markdown description*/}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description" className="w-100">
            Blog Content (for image: first upload and copy link and paste in
            ![alt text](link))
            <MarkdownEditor
              className="w-100"
              style={{ height: "400px" }} //you can adjust the height as needed
              value={description}
              onChange={(e) => setDescription(e.text)}
              renderHTML={(text) => (
                <ReactMarkdown
                  components={{
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      if (inline) {
                        return <code>{children}</code>;
                      } else if (match) {
                        return (
                          <div style={{ position: "relative" }}>
                            <pre
                              style={{
                                padding: "0",
                                borderRadius: "5px",
                                overflowX: "auto",
                                whiteSpace: "pre-wrap",
                              }}
                              {...props}
                            >
                              <code>{children}</code>
                            </pre>
                            <button
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                zIndex: "1",
                              }}
                              onClick={() =>
                                navigator.clipboard.writeText(text)
                              }
                            >
                              Copy code
                            </button>
                          </div>
                        );
                      } else {
                        return <code {...props}>{children}</code>;
                      }
                    },
                  }}
                >
                  {text}
                </ReactMarkdown>
              )}
            />{" "}
          </label>
        </div>
        {/*tags*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">
            Tags (for multi select press ctrl + mouse left key)
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
            <option value="nextjs">Next js</option>
            <option value="reactjs">React js</option>
            <option value="database">Database</option>
          </select>
        </div>
        {/*blog status*/}
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
            SAVE BLOG
          </button>
        </div>
      </form>
    </>
  );
}
