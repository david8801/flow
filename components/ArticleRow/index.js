import React from 'react';
import styles from "./styles.module.css"
import moment from "moment"

const ArticleRow = ({ data, showSubtitle, size }) => {
  const { category, category_color, date, subtitle, title } = data
  return (
    <div
      style={size ? { background: category_color } : undefined}
      className={`${styles.articleRow} ${styles[size]}`}
    >
      <div className={styles.articleRowTop}>
        <span style={!size ? { color: category_color } : undefined} className={styles.category}>
          .{category}
        </span>
        <span className={`${styles.date} ${!size ? "theme-grey-text" : ""}`}>
          {moment(date).format('D MMMM HH:mm')}
        </span>
      </div>
      <span className={`${styles.title} ${!size ? "theme-text" : ""}`}>
        {size === "big" && (
          <span>{"<"}</span>
        )}
        {(size === "big" ? "   " : "") + title}
        {size === "big" && (
          <span>/></span>
        )}
      </span>
      {showSubtitle && (
        <span className={`${styles.subtitle} ${!size ? "theme-darkgrey-text" : ""}`}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default ArticleRow;
