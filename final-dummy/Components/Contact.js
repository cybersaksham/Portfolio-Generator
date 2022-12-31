import { useState } from "react";
import about from "../Data/About";
import contact_links from "../Data/Contact";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mailDetail, setMailDetail] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = () => {
    setMailDetail({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    });
  };

  let tOut;

  const sendMail = async (e) => {
    e.preventDefault();

    if (tOut) clearTimeout(tOut);

    setIsSuccess(false);
    setIsError(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailDetail),
      });
      await response.json();

      setIsLoading(false);
      if (response.status === 200) setIsSuccess(true);
      else setIsError(true);
    } catch (e) { }

    tOut = setTimeout(() => {
      setIsSuccess(false);
      setIsError(false);
    }, 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact</h2>
          <p>Contact Me</p>
        </div>
        <div className="row mt-2">
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-map" />
              <h3>My Address</h3>
              <p>{about.city}</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-share-alt" />
              <h3>Social Profiles</h3>
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
          </div>
          <div className="col-md-6 mt-4 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-envelope" />
              <h3>Email Me</h3>
              <p>{contact_links.email}</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 d-flex align-items-stretch">
            <div className="info-box">
              <i className="bx bx-phone-call" />
              <h3>Call Me</h3>
              <p>{contact_links.phone}</p>
            </div>
          </div>
        </div>
        <form role="form" className="php-email-form mt-4" onSubmit={sendMail}>
          <div className="row">
            <div className="col-md-6 form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
                value={mailDetail.name}
              />
            </div>
            <div className="col-md-6 form-group mt-3 mt-md-0">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Your Email"
                required
                onChange={handleChange}
                value={mailDetail.email}
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control"
              name="subject"
              id="subject"
              placeholder="Subject"
              required
              onChange={handleChange}
              value={mailDetail.subject}
            />
          </div>
          <div className="form-group mt-3">
            <textarea
              className="form-control"
              name="message"
              id="message"
              rows={5}
              placeholder="Message"
              required
              onChange={handleChange}
              value={mailDetail.message}
            />
          </div>
          <div className="text-center mt-3">
            <button type="submit" disabled={isLoading}>
              Send Message
            </button>
          </div>
          <div className="my-3" style={{ display: "block", height: "30px" }}>
            <div className={`loading ${isLoading ? "d-block" : ""}`}>
              Loading
            </div>
            <div
              className={`error-message ${isError ? "d-block" : ""}`}
              style={{ textAlign: "center" }}
            >
              Try again.
            </div>
            <div className={`sent-message ${isSuccess ? "d-block" : ""}`}>
              Your message has been sent. Thank you!
            </div>
          </div>
        </form>
      </div>
    </section >
  );
};

export default Contact;
