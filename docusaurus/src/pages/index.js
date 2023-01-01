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
