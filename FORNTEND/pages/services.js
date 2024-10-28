import Head from "next/head";

export default function Services() {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>

      <div className="servicespage">
        <div className="topservices">
          <div className="container">
            <h2>Diwan Malla Services</h2>
            <p>
              Home <span>&gt;</span> Services
            </p>
          </div>
        </div>
        <div className="centerservices">
          <div className="container">
            <div className="cservicesbox">
              {/* Web Development Service */}
              <div className="csservice">
                <span>01</span>
                <div>
                  <h2>Web Development</h2>
                  <img
                    src="/img/services/website_icon.svg"
                    alt="Web Development Icon"
                  />
                </div>
                <ul>
                  <li>Performance & Load Time</li>
                  <li>Reusable Components</li>
                  <li>Responsiveness</li>
                  <li>Quality Assurance and Testing</li>
                  <li>Ongoing Maintenance and Bug Fixes</li>
                </ul>
                <p>
                  I offer reliable web development services to generate the
                  remarkable results your business needs. My focus is on
                  creating user-friendly applications tailored to meet client
                  requirements.
                </p>
              </div>

              {/* Mobile Development Service */}
              <div className="csservice">
                <span>02</span>
                <div>
                  <h2>Mobile Development</h2>
                  <img
                    src="/img/services/mobile-app.svg"
                    alt="Mobile Development Icon"
                  />
                </div>
                <ul>
                  <li>High-Performance Applications</li>
                  <li>User-Centric Design</li>
                  <li>Cross-Platform Solutions</li>
                  <li>iOS and Android Development</li>
                  <li>Continuous Integration and Delivery</li>
                </ul>
                <p>
                  As an experienced mobile developer, I offer innovative
                  solutions to create high-performance, user-centric mobile
                  apps.
                </p>
              </div>

              {/* Digital Marketing Service */}
              <div className="csservice">
                <span>03</span>
                <div>
                  <h2>Digital Marketing (SEO)</h2>
                  <img
                    src="/img/services/seo.svg"
                    alt="Digital Marketing Icon"
                  />
                </div>
                <ul>
                  <li>Traffic Generation Strategies</li>
                  <li>Brand Awareness Improvement</li>
                  <li>Content Optimization</li>
                  <li>Analytics and Reporting</li>
                  <li>Social Media Marketing</li>
                </ul>
                <p>
                  My digital marketing services are designed to elevate your
                  business, driving traffic to your website and improving brand
                  awareness among potential customers.
                </p>
              </div>

              {/* Content Creation Service */}
              <div className="csservice">
                <span>04</span>
                <div>
                  <h2>Content Creator</h2>
                  <img
                    src="/img/services/content.jpg"
                    alt="Content Creation Icon"
                  />
                </div>
                <ul>
                  <li>Photography and Videography</li>
                  <li>Visual Storytelling</li>
                  <li>Creative Content Development</li>
                  <li>Editing and Post-Production</li>
                  <li>Social Media Content Strategy</li>
                </ul>
                <p>
                  I am passionate about capturing moments creatively,
                  transforming visions into visual stories through expert
                  photography and videography.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
