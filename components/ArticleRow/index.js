import React from 'react';
import styles from "./styles.module.css"
import moment from "moment"
import {useRouter} from "next/router";

const ArticleRow = ({ data, slug, showSubtitle, size, titleRender }) => {
  const { category, category_color, date, subtitle, title } = data
  const router = useRouter();

  const openArticle = () => router.push("/article/" + slug)
  return (
    <div
      style={{ background: size === "big" ? category_color : null }}
      onClick={openArticle}
      className={`${styles.articleRow} ${styles[size] || ""} ${showSubtitle ? styles.subtitleShown : ""}`}
    >
      <div className={styles.articleRowTop}>
        <span
          {...(size !== "big" && { style: { color: category_color } })}
          className={styles.category}>
          .{category}
        </span>
        <span className={styles.date}>
          {moment(date).format('D MMMM HH:mm')}
        </span>
      </div>
      {titleRender
        ? titleRender(title)
        : <span
          className={styles.title}
        >
        {size === "big" && (
          <span>{"<"}</span>
        )}
          {(size === "big" ? "   " : "") + (!titleRender ? title : "")}
          {size === "big" && (
            <span>/></span>
          )}
      </span>
      }
      {showSubtitle && (
        <span className={styles.subtitle}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default ArticleRow;
