import React from 'react';
import styles from "./styles.module.css"
import moment from "moment"

const ArticleCard = ({ data, showSubtitle }) => {
  const { category, category_color, date, subtitle, title, image, sponsored } = data
  return (
    <div
      {...(sponsored && { style: {backgroundColor: category_color}})}
      className={`${styles.articleCard} ${sponsored ? "sponsored" : ""}`}
    >
      <img src={image} alt=""/>
      <div className={styles.articleCardContent}>
        <div className={styles.articleRowTop}>
        <span style={{ color: sponsored ? "white" : category_color }} className={styles.category}>
          .{category}
        </span>
          <span className={`${styles.date} theme-grey-text`}>
          {moment(date).format('D MMMM HH:mm')}
        </span>
        </div>
        <span className={`${styles.title} theme-text`}>
        {title}
      </span>
        {showSubtitle && (
          <span className={`${styles.subtitle} theme-darkgrey-text`}>
          {subtitle}
        </span>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
