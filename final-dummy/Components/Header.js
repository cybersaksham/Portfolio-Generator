import about from "../Data/About";
import contact_links from "../Data/Contact";

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <h1>{about.name}</h1>
        <h2 className="typewriter">
          I'm <span id="mainSpan" data-text={about.about}></span>
          <span id="cursorSpan"></span>
        </h2>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a className="nav-link active" href="#header">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="nav-link" href="#resume">
                Resume
              </a>
            </li>
            <li>
              <a className="nav-link" href="#portfolio">
                Portfolio
              </a>
            </li>
            <li>
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>
        <div className="social-links">
          <a
            href={contact_links.twitter}
            target="_blank"
            rel="noreferrer"
            className="twitter"
            aria-label="twitter"
          >
            <i className="bi bi-twitter" />
          </a>
          <a
            href={contact_links.github}
            target="_blank"
            rel="noreferrer"
            className="github"
            aria-label="github"
          >
            <i className="bi bi-github" />
          </a>
          <a
            href={contact_links.instagram}
            target="_blank"
            rel="noreferrer"
            className="instagram"
            aria-label="instagram"
          >
            <i className="bi bi-instagram" />
          </a>
          <a
            href={contact_links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="linkedin"
            aria-label="linkedin"
          >
            <i className="bi bi-linkedin" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
