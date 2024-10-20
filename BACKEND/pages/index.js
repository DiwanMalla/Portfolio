import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { data } from "autoprefixer";

export default function Home() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  //use this on top for render error
  const [blogsData, setBlogsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);

  //define option within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Blogs Created Monthly by Year",
      },
    },
  };
  useEffect(() => {
    //fetch data from api
    const fetchData = async () => {
      try {
        const [response, responseProject, responseShop, responseGallery] =
          await Promise.all([
            fetch("/api/blogs"),
            fetch("/api/projects"),
            // fetch("/api/shops"),
            // fetch("/api/photos"),
          ]);

        const data = await response.json();
        const dataProject = await responseProject.json();
        // const dataShop = await responseShop.json();
        // const dataPhotos = await responseGallery.json();

        setBlogsData(data); //assuming data is an array of blogs object
        setProjectsData(dataProject);
        // setShopData(dataShop);
        // setPhotosData(dataPhotos);
        setLoading(false); //after fetching data make loading false
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData(); //call fetchdata function
  }, []);

  //Aggregate data by year and month
  const monthlyData = blogsData
    .filter((dat) => dat.status === "publish")
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear(); // Get the year
      const month = new Date(blog.createdAt).getMonth(); // Get the Month
      acc[year] = acc[year] || Array(12).fill(0); //Initialize array for the year if not is exist
      acc[year][month]++; //Increment count for the month
      return acc;
    }, {});
  const currentYear = new Date().getFullYear(); //get the current year
  const years = Object.keys(monthlyData);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const chartData = {
    labels,
    datasets: years.map((year) => ({
      label: `${year}`,
      data: monthlyData[year] || Array(12).fill(0), //If no data for a month, default to 0
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
    })),
  };
  return (
    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>
              Admin <span>Dashboard</span>
            </h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoHome /> <spna>/</spna>
            <span>Dashboard</span>
          </div>
        </div>
        {/*dashboard four cards*/}
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>
              {blogsData.filter((dat) => dat.status === "publish").length}
            </span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>
              {projectsData.filter((dat) => dat.status === "publish").length}
            </span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>
              {projectsData.filter((dat) => (dat.status = "publish")).length}
            </span>
          </div>
          <div className="four_card">
            <h2> Gallery Photos</h2>
            <span>5</span>
          </div>
        </div>

        {/*year overview*/}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-bot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">
                {blogsData.filter((dat) => dat.status === "publish").length}/365
                <br />
                <span>Total Published</span>
              </h3>
            </div>
            <Bar data={chartData} options={options} />
          </div>
          <div className="right_salescont">
            <div>
              <h3>Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-bot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  {" "}
                  <tr>
                    <td>Topic</td>
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Node Js</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) => dat.blogCategory[0] === "Node js"
                        ).length
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>Next Js</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) => dat.blogCategory[0] === "Next js"
                        ).length
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>Flutter Dev</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) => dat.blogCategory[0] === "Flutter Dev"
                        ).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Database</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) => dat.blogCategory[0] === "Database"
                        ).length
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>Deployment</td>
                    <td>
                      {
                        blogsData.filter(
                          (dat) => dat.blogCategory[0] === "Deployment"
                        ).length
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
