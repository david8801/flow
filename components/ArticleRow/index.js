import React from 'react';
import styles from "./styles.module.css"
import moment from "moment"

const ArticleRow = ({ data, showSubtitle, size }) => {
  const { category, category_color, date, subtitle, title } = data
  return (
    <div
      style={{ background: size === "big" ? category_color : null }}
      className={`${styles.articleRow} ${styles[size] || ""} ${showSubtitle ? styles.subtitleShown : ""}`}
    >
      <div className={styles.articleRowTop}>
        <span
          {...(size !== "big" && {style: { color: category_color }})}
          className={styles.category}>
          .{category}
        </span>
        <span className={styles.date}>
          {moment(date).format('D MMMM HH:mm')}
        </span>
      </div>
      <span className={styles.title}>
        {size === "big" && (
          <span>{"<"}</span>
        )}
        {(size === "big" ? "   " : "") + title}
        {size === "big" && (
          <span>/></span>
        )}
      </span>
      {showSubtitle && (
        <span className={styles.subtitle}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default ArticleRow;
