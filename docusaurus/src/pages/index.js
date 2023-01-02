import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import GettingStarted from "@site/src/components/GettingStarted";
import appData from "../../appdata.config.json";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--dark", styles.heroBanner)}>
      <div className="container">
        <img
          className={clsx(styles.heroBannerLogo, "margin-vert--md")}
          alt="Portfolio Generator logo"
          src={"img/icons/500x500.png"}
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.getStarted}>
          <Link
            className="button button--outline button--primary button--lg"
            to={appData.docURL}
          >
            Get Started
          </Link>
          <Link
            to={appData.sponsorURL}
            className={clsx(
              "button button--outline button--primary button--lg",
              styles.sponsorBtn
            )}
            style={{ boxShadow: "none" }}
            aria-label="Sponsor @cybersaksham"
          >
            <svg
              aria-hidden="true"
              height={16}
              viewBox="0 0 16 16"
              version="1.1"
              width={16}
              data-view-component="true"
              className="octicon octicon-heart icon-sponsor color-fg-sponsors mr-2"
            >
              <path
                fillRule="evenodd"
                d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"
              />
            </svg>
            <span>Sponsor</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <GettingStarted />
      </main>
    </Layout>
  );
}
