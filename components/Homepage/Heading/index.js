import React from 'react';
import styles from "./styles.module.css";
import ArticleRow from "../../ArticleRow";

const Heading = ({posts}) => {
  const mainPost = posts[0];
  const additionalPosts = posts.slice(1, 5)

  return (
    <div className={styles.head}>
      <div className={styles.mainArticle}>
        <img src={mainPost.data.image} alt=""/>
        <div className={styles.mainArticleContent}>
          <ArticleRow size={"big"} data={mainPost.data} showSubtitle/>
        </div>
      </div>
      <div className={styles.articleList}>
        {additionalPosts.map(i => (
          <ArticleRow data={i.data}/>
        ))}
      </div>
    </div>
  );
};

export default Heading;
