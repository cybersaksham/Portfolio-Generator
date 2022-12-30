import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import appData from "../../../appdata.config.json";

export default function HomepageFeatures() {
  const FeatureList = [
    {
      title: "Less to Learn",
      Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
      description: (
        <>
          You don't need to learn and configure many build tools. You are only
          expected to install <code>node js</code>. When it's time to deploy,
          your bundles are optimized automatically.
        </>
      ),
    },
    {
      title: "Focus on What Matters",
      Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
      description: (
        <>
          {appData.appName} lets you focus on just your website. You only have
          to run the command and fill up all the data. You need not to worry
          what is running behind the scenes.
        </>
      ),
    },
    {
      title: "Output in Next JS",
      Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
      description: (
        <>
          The generated code will be in Next JS. You can use Next JS script{" "}
          <code>npm run dev</code> to run the development server. Run{" "}
          <code>npm run build</code> to make a production ready build.
        </>
      ),
    },
  ];

  function Feature({ Svg, title, description }) {
    return (
      <div className={clsx("col col--4")}>
        <div>{Svg && <Svg className={styles.featureSvg} role="img" />}</div>
        <div className="padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
