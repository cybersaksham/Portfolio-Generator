import React, { useEffect, useRef } from "react";

const ValidImage = ({
  imageUrls = [],
  setImageUrls = () => {},
  urlIndex = -1,
  src,
  fallbackSrc,
  ...rest
}) => {
  const changeImageURL = (data) => {
    if (
      imageUrls &&
      setImageUrls &&
      urlIndex > -1 &&
      imageUrls.length > urlIndex
    ) {
      let newUrls = imageUrls;
      newUrls[urlIndex] = data;
      setImageUrls([...newUrls]);
    }
  };

  function isImageValid(src) {
    let promise = new Promise((resolve) => {
      let img = document.createElement("img");
      img.onerror = () => {
        changeImageURL(false);
        resolve(false);
      };
      img.onload = () => {
        changeImageURL(true);
        resolve(true);
      };
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
