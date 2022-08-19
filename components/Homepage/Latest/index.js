import React from 'react';
import styles from "./styles.module.css";
import ArticleRow from "../../ArticleRow";

const Latest = ({ posts }) => {
  const latestPosts = posts.slice(0, 12)

  return (
    <div className={styles.latestWrapper}>
      <div className={styles.latestHeader}>
        <span className="section-title">the latest</span>
      </div>
      {latestPosts.map((i, idx) => (
        <ArticleRow key={idx} data={i.data} showSubtitle size={"small"}/>
      ))}
    </div>
  );
};

export default Latest;
