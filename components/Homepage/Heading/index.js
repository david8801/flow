import React from 'react';
import styles from "./styles.module.css";
import ArticleRow from "../../ArticleRow";
import {useRouter} from "next/router";

const Heading = ({ posts }) => {
  const router = useRouter();
  const mainPost = posts[0];
  const additionalPosts = posts.slice(1, 6)

  const openMainArticle = () => router.push("/article/" + mainPost.slug)
  return (
    <div className={styles.head}>
      <div onClick={openMainArticle} className={styles.mainArticle}>
        <img src={mainPost.data.image} alt=""/>
        <div className={styles.mainArticleContent}>
          <ArticleRow
            size={"big"}
            slug={mainPost.slug}
            data={mainPost.data}
            showSubtitle
          />
        </div>
      </div>
      <div className={styles.articleList}>
        {additionalPosts.map((i, idx) => (
          <ArticleRow slug={i.slug} data={i.data} key={idx}/>
        ))}
      </div>
    </div>
  );
};

export default Heading;
