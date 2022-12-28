import portfolio from "../Data/Portfolio";
import ValidImage from "./ValidImage";

const Portfolio = () => {
  const { filters, projects } = portfolio;

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-title">
          <h2>Portfolio</h2>
          <p>My Works</p>
        </div>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <li data-filter="*" className="filter-active">
                All
              </li>
              {filters.map((filter) => (
                <li data-filter={`.${filter}`} key={filter}>
                  {filter.split("-")[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row portfolio-container">
          {projects.map((project, i) => (
            <div
              className={`col-lg-4 col-md-6 portfolio-item ${project.filter}`}
              key={i}
            >
              <div className="portfolio-wrap">
                <ValidImage
                  className="img-fluid"
                  alt=""
                  style={{
                    height: "325px",
                    width: "700px",
                  }}
                  src={`/Gallery/Projects/${project.img}/0.webp`}
                  fallbackSrc="/Gallery/404.webp"
                />
                <div className="portfolio-info">
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      fontWeight: "600",
                    }}
                  >
                    {project.name}
                  </span>
                  <div className="portfolio-links">
                    <a
                      href={`/Gallery/Projects/${project.img}/0.webp`}
                      data-gallery="portfolioGallery"
                      className="portfolio-lightbox"
                      title={project.name}
                    >
                      <i className="bx bx-plus" />
                    </a>
                    <a
                      href={`/detail/${i}`}
                      data-gallery="portfolioDetailsGallery"
                      data-glightbox="type: external"
                      className="portfolio-details-lightbox"
                      title="Portfolio Details"
                    >
                      <i className="bx bx-link" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
