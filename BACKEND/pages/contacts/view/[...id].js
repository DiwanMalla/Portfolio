import { useRouter } from "next/router";
import { GrContactInfo } from "react-icons/gr";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { fetchData } from "next-auth/client/_utils";
export default function Contactview() {
  const router = useRouter();
  const { id } = router.query;
  const [contactData, setContactData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch contact details based on ID
      const fetchContact = async () => {
        try {
          await axios.get(`/api/contacts/`).then((response) => {
            setContactData(response.data.find((item) => item._id == id));
          });
        } catch (error) {
          console.error("Error fetching contact data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchContact();
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  // if (!contactData) {
  //   return <p>Contact not found.</p>;
  // }

  return (
    <>
      <div className="blogpage">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Contact: <span>{contactData.email}</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <GrContactInfo />
            <span>/</span>
            <span>Contacts</span>
          </div>
        </div>
        <div className="contactinfo">
          <h2>
            Name: <span>{contactData.fname}</span>
          </h2>
          <h2>
            Last name: <span>{contactData.lname}</span>
          </h2>
          <h2>
            Email: <span>{contactData.email}</span>
          </h2>
          <h2>
            Company: <span>{contactData.company}</span>
          </h2>
          <h2>
            Phone: <span>{contactData.phone}</span>
          </h2>
          <h2>
            Country: <span>{contactData.country}</span>
          </h2>
          <h2>
            Projects:{" "}
            <span>
              {Array.isArray(contactData.project)
                ? contactData.project.join(", ")
                : contactData.project}
            </span>
          </h2>

          <h2>
            Description: <span>{contactData.description}</span>
          </h2>
          <h2>
            Contact time:{" "}
            <span>
              {`${new Date(contactData.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })} at ${new Date(contactData.createdAt).toLocaleTimeString(
                "en-US",
                {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }
              )}`}
            </span>
          </h2>
        </div>
      </div>
    </>
  );
}
