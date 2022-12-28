import React, { useEffect, useRef } from "react";

const ValidImage = ({ src, fallbackSrc, ...rest }) => {
  function isImageValid(src) {
    let promise = new Promise((resolve) => {
      let img = document.createElement("img");
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
      img.src = src;
    });

    return promise;
  }

  const imgEl = useRef(null);
  useEffect(() => {
    isImageValid(src).then((isValid) => {
      if (!isValid) {
        imgEl.current.src = fallbackSrc;
      }
    });
  }, [src]);

  return <img {...rest} ref={imgEl} src={src} />;
};

export default ValidImage;
