import React from "react";
import styles from "./styles.module.css";
import CodeBlock from "@theme/CodeBlock";
import appData from "../../../appdata.config.json";

const GettingStarted = () => {
  return (
    <div className={styles.gettingStartedSection}>
      <div className="container padding-vert--xl text--left">
        <div className="row">
          <div className="col col--5 col--offset-1">
            <h2>Get started in seconds</h2>
            <p>
              You don&apos;t need to worry about code. Prepare your data which
              you are going to add in the portfolio website and you are ready to
              get started.
              <br />
              <br />
              To create a portfolio website called{" "}
              <code>
                <i>my-portfolio</i>
              </code>
              , run this command:
            </p>
            <CodeBlock className="language-sh">
              npx portfolio-generator@latest my-portfolio
            </CodeBlock>
            <br />
          </div>
          <div className="col col--5 col--offset-1">
            <img
              className={styles.featureImage}
              alt="Easy to get started in seconds"
              src={
                // appData.screencastURL
                "https://camo.githubusercontent.com/29765c4a32f03bd01d44edef1cd674225e3c906b/68747470733a2f2f63646e2e7261776769742e636f6d2f66616365626f6f6b2f6372656174652d72656163742d6170702f323762343261632f73637265656e636173742e737667"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;
