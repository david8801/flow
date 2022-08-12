import React from 'react';
import styles from "./styles.module.css"
import moment from "moment"

const ArticleRow = ({ data, showSubtitle, size }) => {
  const { category, category_color, date, subtitle, title } = data
  return (
    <div
      style={size === "big" ? { background: category_color } : undefined}
      className={`${styles.articleRow} ${styles[size]}`}
    >
      <div className={styles.articleRowTop}>
        <span style={size !== "big" ? { color: category_color } : undefined} className={styles.category}>
          .{category}
        </span>
        <span className={`${styles.date} ${size !== "big" ? "theme-grey-text" : ""}`}>
          {moment(date).format('D MMMM HH:mm')}
        </span>
      </div>
      <span className={`${styles.title} ${size !== "big" ? "theme-text" : ""}`}>
        {size === "big" && (
          <span>{"<"}</span>
        )}
        {(size === "big" ? "   " : "") + title}
        {size === "big" && (
          <span>/></span>
        )}
      </span>
      {showSubtitle && (
        <span className={`${styles.subtitle} ${size !== "big" ? "theme-darkgrey-text" : ""}`}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default ArticleRow;
