import React, {useEffect, useState} from 'react';
import styles from "./styles.module.css";
import ArticleRow from "../../ArticleRow";
import moment from "moment/moment";

const Latest = ({ posts }) => {
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    setLatestPosts(posts.sort((a, b) => moment(b.data.date).diff(a.data.date)).slice(0, 12))
  }, [posts])

  return (
    <div className={styles.latestWrapper}>
      <span className="section-title">the latest</span>
      {latestPosts.map((i, idx) => (
        <ArticleRow key={idx} slug={i.slug} data={i.data} showSubtitle size={"small"}/>
      ))}
    </div>
  );
};

export default Latest;
