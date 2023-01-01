/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Loader from "../Loader";

import styles from "./styles.module.css";

export default function BrowserWindow({
  url = "http://localhost:3000",
  imgSrc,
  isWebsite = false,
}) {
  function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    addEventListener("fullscreenchange", () => {
      let images = document.getElementsByClassName("fullscreenimage");
      if (document.fullscreenElement) {
        Array.from(images).forEach((image) => (image.style.opacity = 1));
      } else {
        Array.from(images).forEach((image) => (image.style.opacity = 0));
      }
    });
  }, []);

  return (
    <div className={styles.browserWindow}>
      <div className={styles.browserWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{ background: "#f25f58" }} />
          <span className={styles.dot} style={{ background: "#fbbe3c" }} />
          <span className={styles.dot} style={{ background: "#58cb42" }} />
        </div>
        <div className={clsx(styles.browserWindowAddressBar, "text--truncate")}>
          {url}
        </div>
        <div className={styles.browserWindowMenuIcon}>
          <div>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        </div>
      </div>

      <div
        className={styles.browserWindowBody}
        style={{
          backgroundImage: `url(${imgSrc})`,
          width: "100%",
          height: "500px",
        }}
      >
        {loader && <Loader />}
        {isWebsite ? (
          <iframe
            onLoad={() => {
              setLoader(false);
            }}
            id="website"
            src={url}
            height="100%"
            width="100%"
            style={{ visibility: loader ? "hidden" : "visible" }}
          />
        ) : (
          <img
            className="fullscreenimage"
            src={imgSrc}
            onLoad={() => setLoader(false)}
            style={{ cursor: "pointer", opacity: 0, height: "100%" }}
            onClick={(e) => {
              openFullscreen(e.target);
            }}
          />
        )}
      </div>
    </div>
  );
}
