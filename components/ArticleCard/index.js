import React from 'react';
import styles from "./styles.module.css"
import moment from "moment"
import {useRouter} from "next/router";

const ArticleCard = ({ data, slug, showSubtitle, horizontal }) => {
  const { category, category_color, date, subtitle, title, image, sponsored } = data;
  const router = useRouter();

  const openArticle = () => router.push("/article/" + slug)
  return (
    <div
      {...(sponsored && { style: {backgroundColor: category_color}})}
      onClick={openArticle}
      className={`${styles.articleCard} ${sponsored ? styles.sponsored : ""} ${horizontal ? styles.horizontal : ""}`}
    >
      <img src={process.env.NEXT_PUBLIC_WEBSITE_URL + "/" + image} alt=""/>
      <div className={styles.articleCardContent}>
        <div className={styles.articleRowTop}>
        <span style={{ color: sponsored ? "white" : category_color }} className={styles.category}>
          .{category}
        </span>
          <span className={styles.date}>
            {moment(date).format('D MMMM HH:mm')}
          </span>
        </div>
        <span className={styles.title}>
        {title}
      </span>
        {showSubtitle && (
          <span className={styles.subtitle}>
          {subtitle}
        </span>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
