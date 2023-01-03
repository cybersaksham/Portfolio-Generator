import { useEffect, useState } from "react";
import portfolio from "../Data/Portfolio";
import ValidImage from "./ValidImage";

const Detail = ({ id }) => {
  const [project, setProject] = useState(null);
  const { getDetails } = portfolio;

  useEffect(() => {
    setProject(getDetails(id));
  }, [id]);

  return (
    <div id="portfolio-details" className="portfolio-details">
      <div className="container">
        {project && (
          <div className="row">
            <div className="col-lg-8">
              <div className="portfolio-details-slider swiper">
                <div className="swiper-wrapper align-items-center">
                  {Array.from(Array(project.slides).keys()).map((i) => (
                    <div className="swiper-slide" key={i}>
                      <ValidImage
                        src={`/Gallery/Projects/${project.img}/${i}.webp`}
                        fallbackSrc="/Gallery/404.webp"
                        alt=""
                        style={{
                          height: "550px",
                          width: "700px",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>
            <div className="col-lg-4 portfolio-info">
              <h3>{project.name}</h3>
              <ul>
                <li>
                  <strong>Category</strong>: {project.category}
                </li>
                {Array.from(project.urls).map((url) => (
                  <li key={url}>
                    <strong>{url[0]}</strong>:{" "}
                    <a href={url[1]} target="_blank" rel="noreferrer">
                      {url[1]}
                    </a>
                  </li>
                ))}
                {Array.from(project.desc).map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
