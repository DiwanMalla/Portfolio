import Spinner from "@/components/Spinner";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaThreads,
} from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
export default function Home() {
  //active service background color
  const [activeIndex, setActiveIndex] = useState(0);
  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // set the first item as active when mouse leaves
  };
  // services data
  const services = [
    {
      title: "Web Development",
      description:
        "I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need.",
    },
    {
      title: "Mobile Development",
      description:
        "Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development.",
    },
    {
      title: "Digital Marketing(SEO)",
      description:
        "My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers.",
    },
    {
      title: "Content Creator",
      description:
        "Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content.",
    },
  ];

  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const [allWork, setAllWork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogsResponse] = await Promise.all([
          fetch("/api/projects"),
        ]);
        const projectData = await projectResponse.json();

        setAllData(projectData);
      } catch (err) {
        console.error(`Error fetching data`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    //filter projects based on selectioncategory
    if (selectedCategory === "All") {
      setFilteredProjects(allData.filter((pro) => pro.status === "publish"));
    } else {
      setFilteredProjects(
        allData.filter(
          (pro) =>
            pro.status === "publish" &&
            pro.projectCategory.includes(selectedCategory)
        )
      );
    }
  }),
    [setSelectedCategory, allData];
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <Head>
        <title>Diwan Malla - Personal Portfolio</title>
        <meta name="description" content="vbmcoder - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text
              x="50%"
              y="50%"
              text-anchor="middle"
              className="animate-stroke"
            >
              HI
            </text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title">I am Diwan Malla</span>
              <h1 className="hero_title">
                Full Stack Developer +<br />
                <span>Ux Designer</span>
              </h1>
              <div className="hero_img_box heroimgbox">
                <img src="/img/me.png" alt="coder" />
              </div>
              <div className="lead">
                I specialize in building responsive and user-friendly
                applications that enhance user experience. With a keen eye for
                design and a solid understanding of backend technologies, I
                create seamless digital solutions tailored to meet client needs.
              </div>
              <div className="hero_btn_box">
                <Link href="/" download={"/img/me.png"} className="download_cv">
                  Download CV <BiDownload />
                </Link>
                <ul className="hero_social">
                  <li>
                    <a href="https://www.facebook.com/dipin.malla.9/">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/dipin_malla/?hl=en">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/diwan-malla/">
                      <FaLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.threads.net/@dipin_malla">
                      <FaThreads />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/*rightside image section*/}

            <div className="heroimageright">
              <div className="hero_img_box">
                <img src="/img/me.png" alt="coder" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item">
              <h3>1+</h3>
              <h4>
                Year of
                <br /> Learning Experience
              </h4>
            </div>
            <div className="funfect_item">
              <h3>10+</h3>
              <h4>
                Projects
                <br /> Completed
              </h4>
            </div>
            <div className="funfect_item">
              <h3>6+</h3>
              <h4>
                Tools & Technologies
                <br /> Learned
              </h4>
            </div>
            <div className="funfect_item">
              <h3>5</h3>
              <h4>
                Certifications
                <br /> Earned
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>My Quality Services</h2>
            <p>
              I put your ideas and thus your wishes in the form of a unique web
              project that inspires you and your customers.
            </p>
          </div>
          <div className="services_menu">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${
                  activeIndex === index ? `sactive` : ""
                }`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={() => handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2>My Recent Works</h2>
            <p>
              I put your ideas and thus your wishes in the form of a unique web
              project that inspires you and your customers.
            </p>
          </div>
          <div className="project_buttons">
            <button
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => setSelectedCategory("All")}
            >
              ALL
            </button>

            <button
              className={
                selectedCategory === "Website Development" ? "active" : ""
              }
              onClick={() => setSelectedCategory("Website Development")}
            >
              Website
            </button>
            <button
              className={selectedCategory === "App Development" ? "active" : ""}
              onClick={() => setSelectedCategory("App Development")}
            >
              Apps
            </button>
            <button
              className={selectedCategory === "E-commerce site" ? "active" : ""}
              onClick={() => setSelectedCategory("E-commerce site")}
            >
              E-Commerce
            </button>
            <button
              className={selectedCategory === "Content" ? "active" : ""}
              onClick={() => setSelectedCategory("Content")}
            >
              Content
            </button>
          </div>
          <div className="projects_cards">
            {loading ? (
              <div className="flex flex-center wh_100">
                <Spinner />
              </div>
            ) : filteredProjects.length === 0 ? (
              <h1 className="w-100 flex flex-center mt-3">No Project Found</h1>
            ) : (
              filteredProjects.slice(0, 4).map((pro) => (
                <Link href="/" key={pro._id} className="procard">
                  <div className="proimgbox">
                    <img src={pro.images[0]} alt={pro.title} />
                  </div>
                  <div className="procontentbox">
                    <h2>{pro.title}</h2>
                    <GoArrowUpRight />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy"></section>

      {/* My Skills */}
      <section className="myskills"></section>

      {/* Recent Blogs */}
      <section className="recentblogs"></section>
    </>
  );
}
