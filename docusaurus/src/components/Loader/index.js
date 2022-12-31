import React from "react";
import styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
