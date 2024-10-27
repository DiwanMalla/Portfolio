import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

export default function Gallery() {
  const { alldata, loading } = useFetchData("/api/photos");

  return (
    <>
      <Head>
        <title>Diwan Malla: Gallery Photos</title>
      </Head>
      <div className="gallerypage">
        <div className="container">
          <div className="gallerytopsec">
            <div className="topphonesec">
              <div className="lefttitlesec">
                <h4>DIWAN MALLA GALLERY PHOTOS</h4>
                <h1>
                  Diwan <br /> Photographs
                </h1>
                <Link href="/gallery#galleryimages">
                  <button>VIEW MORE</button>
                </Link>
              </div>
              <div className="rightimgsec">
                <img
                  src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/1.jpg"
                  alt=""
                />
                <div className="r_imge_top">
                  <img
                    src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/3.jpg"
                    alt=""
                  />
                  <img
                    src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/5.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallerybtmphotos" id="galleryimages">
          <div className="container">
            <div className="gbtmtitles text-center">
              <h3>
                <span>01// OUR PORTFOLIO</span>
              </h3>
              <h2>
                Diwan Malla capture<span> All of your</span>
                <br />
                beautiful memories
              </h2>
            </div>
            <div className="gallery_image_grid">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {alldata?.length > 0 ? (
                    alldata.map((photo) => (
                      <div className="image-item" key={photo._id}>
                        <img src={photo.images[0]} alt={photo.title} />
                        <div className="galeryimgiteminfo">
                          <h2>{photo.title}</h2>
                          <p>by Diwan Malla</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No photos available</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
