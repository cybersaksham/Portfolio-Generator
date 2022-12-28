import about from "../Data/About";
import counterItems from "../Data/Counter";
import contact_links from "../Data/Contact";
import skills from "../Data/Skills";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-me container">
        <div className="section-title">
          <h2>About</h2>
          <p>Learn more about me</p>
        </div>
        <div className="row">
          <div className="col-lg-4" data-aos="fade-right">
            <img
              src="/Gallery/pic.webp"
              className="img-fluid"
              alt=""
              style={{ borderRadius: "500px" }}
              draggable={false}
            />
          </div>
          <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
            <h3 className="typewriter">
              <span id="mainSpan" data-text={about.about}></span>
              <span id="cursorSpan"></span>
            </h3>
            <p className="fst-italic">{about.bio}</p>
            <div className="row" style={{ overflowX: "auto" }}>
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right" />{" "}
                    <strong>Website:</strong>{" "}
                    <span>{contact_links.website}</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right" />{" "}
                    <strong>Phone:</strong> <span>{contact_links.phone}</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right" /> <strong>City:</strong>{" "}
                    <span>{about.city}</span>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <ul>
                  <li>
                    <i className="bi bi-chevron-right" /> <strong>Age:</strong>{" "}
                    <span>{about.age}</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right" />{" "}
                    <strong>Degree:</strong> <span>{about.degree}</span>
                  </li>
                  <li>
                    <i className="bi bi-chevron-right" />{" "}
                    <strong>Email:</strong> <span>{contact_links.email}</span>
                  </li>
                </ul>
              </div>
            </div>
            <p>{about.longBio}</p>
          </div>
        </div>
      </div>
      <div className="counts container">
        <div className="row">
          {counterItems.map((item, i) => (
            <div key={i} className="col-lg-3 col-md-6 mt-5 mt-lg-0">
              <div className="count-box">
                <i className={item.icon} />
                <span
                  data-purecounter-start={0}
                  data-purecounter-end={item.count}
                  data-purecounter-duration={item.duration}
                  className="purecounter"
                />
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="skills container">
        <div className="section-title">
          <h2>Skills</h2>
        </div>
        <div className="row skills-content">
          {skills.map((skill, i) => (
            <div className="col-lg-6" key={i}>
              <div className="progress">
                <span className="skill">
                  {skill.title} <i className="val">{skill.value}%</i>
                </span>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={skill.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={skill.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="interests container">
        <div className="section-title">
          <h2>Interests</h2>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="icon-box">
              <i className="ri-store-line" style={{ color: "#ffbb2c" }} />
              <h3>Lorem Ipsum</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div className="icon-box">
              <i
                className="ri-bar-chart-box-line"
                style={{ color: "#5578ff" }}
              />
              <h3>Dolor Sitema</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div className="icon-box">
              <i
                className="ri-calendar-todo-line"
                style={{ color: "#e80368" }}
              />
              <h3>Sed perspiciatis</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
            <div className="icon-box">
              <i className="ri-paint-brush-line" style={{ color: "#e361ff" }} />
              <h3>Magni Dolores</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i className="ri-database-2-line" style={{ color: "#47aeff" }} />
              <h3>Nemo Enim</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i className="ri-gradienter-line" style={{ color: "#ffa76e" }} />
              <h3>Eiusmod Tempor</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i className="ri-file-list-3-line" style={{ color: "#11dbcf" }} />
              <h3>Midela Teren</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i className="ri-price-tag-2-line" style={{ color: "#4233ff" }} />
              <h3>Pira Neve</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i className="ri-anchor-line" style={{ color: "#b2904f" }} />
              <h3>Dirada Pack</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i className="ri-disc-line" style={{ color: "#b20969" }} />
              <h3>Moton Ideal</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i
                className="ri-base-station-line"
                style={{ color: "#ff5828" }}
              />
              <h3>Verdo Park</h3>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 mt-4">
            <div className="icon-box">
              <i className="ri-fingerprint-line" style={{ color: "#29cc61" }} />
              <h3>Flavor Nivelanda</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonials container">
        <div className="section-title">
          <h2>Testimonials</h2>
        </div>
        <div
          className="testimonials-slider swiper"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="testimonial-item">
                <p>
                  <i className="bx bxs-quote-alt-left quote-icon-left" />
                  Proin iaculis purus consequat sem cure digni ssim donec
                  porttitora entum suscipit rhoncus. Accusantium quam, ultricies
                  eget id, aliquam eget nibh et. Maecen aliquam, risus at
                  semper.
                  <i className="bx bxs-quote-alt-right quote-icon-right" />
                </p>
                <img
                  src="/assets/img/testimonials/testimonials-1.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Saul Goodman</h3>
                <h4>Ceo &amp; Founder</h4>
              </div>
            </div>
          </div>
          <div className="swiper-pagination" />
        </div>
        <div className="owl-carousel testimonials-carousel"></div>
      </div> */}
    </section>
  );
};

export default About;
