import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";

export default function Blog() {
  return (
    <>
      <form className="addWebsiteform">
        {/*blog title*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Enter small title" />
        </div>

        {/*blog slug url*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug (seo friendly url)</label>
          <input type="text" id="slug" placeholder="Enter slug url" />
        </div>
        {/*blog category*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">
            Select category (for multi select press ctrl + mouse left key)
          </label>
          <select name="category" id="category" multiple>
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
            />
          </div>
          <div className="w-100 flex flex-left mt-1">
            <Spinner />
          </div>
        </div>

        {/*Image preview and image sortable*/}
        {/*pending*/}
        {/*markdown description*/}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description" className="w-100">
            Blog Content (for image: first upload and copy link and paste in
            ![alt text](link))
            <MarkdownEditor
              className="w-100"
              style={{ height: "400px" }} //you can adjust the height as needed
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
          <select name="tags" id="tags" multiple>
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
          <select name="status" id="status">
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
