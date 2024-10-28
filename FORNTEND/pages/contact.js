import Head from "next/head";
import { FaPhoneVolume, FaThreads } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import { GrLinkedin } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [project, setProject] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [messageOk, setMessageOk] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const sortedCountries = response.data
          .map((country) => ({
            name: country.name.common,
            code: country.cca2,
            flag: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountryOptions(sortedCountries);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const createProduct = async (ev) => {
    ev.preventDefault();
    setMessageOk("Sending...");
    const data = {
      fname,
      lname,
      email,
      company,
      phone,
      country,
      project,
      price,
      description,
    };
    try {
      await axios.post("/api/contacts", data);
      setMessageOk("✅ Message sent successfully");
      setFname("");
      setLname("");
      setEmail("");
      setCompany("");
      setPhone("");
      setCountry("");
      setProject([]);
      setPrice("");
      setDescription("");
      setSelectedFlag("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessageOk("❌ Failed to send message");
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const selectedCountry = countryOptions.find(
      (country) => country.code === selectedCountryCode
    );
    setCountry(selectedCountryCode);
    setSelectedFlag(selectedCountry ? selectedCountry.flag : "");
  };

  const handleProjectChange = (projectOption) => {
    setProject((prevProject) =>
      prevProject.includes(projectOption)
        ? prevProject.filter((option) => option !== projectOption)
        : [...prevProject, projectOption]
    );
  };

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="contactpage">
        <div className="container">
          <div className="contactformp">
            <div className="leftcontp">
              <h2>Get in Touch</h2>
              <h2>Let's Talk About Your Project</h2>
              <p>
                Thinking about a new project, a problem to solve, or just want
                to connect? Let's do it!
              </p>
              <div className="leftsociinfo">
                <ul>
                  <li>
                    <FaPhoneVolume /> Phone:{" "}
                    <a href="tel:+610452140630">+61 0452140630</a>
                  </li>
                  <li>
                    <MdAttachEmail /> Email:{" "}
                    <a href="mailto:malladipin@gmail.com">
                      malladipin@gmail.com
                    </a>
                  </li>
                  <li>
                    <GrLinkedin /> LinkedIn:{" "}
                    <a
                      href="https://www.linkedin.com/diwan-malla"
                      target="_blank"
                    >
                      Diwan Malla
                    </a>
                  </li>
                  <li>
                    <FaThreads /> Threads:{" "}
                    <a
                      href="https://www.threads.net/@dipin_malla"
                      target="_blank"
                    >
                      @diwanmalla
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rightcontp">
              <form onSubmit={createProduct}>
                <div className="rightconttitle">
                  <h2>Your Contact Information</h2>
                </div>
                <div className="rightcontinputs">
                  <input
                    type="text"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    placeholder="Last Name"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company Name"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                  />

                  <div className="country-select-wrapper">
                    {selectedFlag && (
                      <img
                        src={selectedFlag}
                        alt="Selected Country Flag"
                        className="country-flag"
                      />
                    )}
                    <select
                      id="country"
                      value={country}
                      onChange={handleCountryChange}
                      required
                    >
                      <option value="">Select Country</option>
                      {countryOptions.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="rightcontitle">
                  <h2>What services do you need for your project?</h2>
                </div>
                <div className="rightcontcheckbox">
                  {[
                    "Website Development",
                    "App Development",
                    "Design System",
                    "Website Migration",
                    "E-commerce Site",
                    "Performance Evaluation",
                  ].map((projectOption) => (
                    <label
                      key={projectOption}
                      className="cyberpunk-checkbox-label"
                    >
                      <input
                        type="checkbox"
                        className="cyberpunk-checkbox"
                        value={projectOption}
                        checked={project.includes(projectOption)}
                        onChange={() => handleProjectChange(projectOption)}
                      />
                      {projectOption}
                    </label>
                  ))}
                </div>
                <div className="rightconttitle">
                  <h2>Tell me about your project</h2>
                </div>
                <div className="rightcontpera">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    rows={4}
                    id=""
                    placeholder="Project Description"
                  ></textarea>
                </div>
                <hr />
                <div className="righhcontsbtn flex gap-3">
                  <button type="submit">Send Message</button>
                  {messageOk && <p>{messageOk}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .country-select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .country-flag {
          width: 24px;
          height: 16px;
        }
      `}</style>
    </>
  );
}
