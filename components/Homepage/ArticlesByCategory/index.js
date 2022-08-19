import React, {useEffect, useMemo, useState} from 'react';
import styles from "./styles.module.css";
import ArticleCard from "../../ArticleCard";
import {ArrowRightIcon} from "../../../icons/shared";

const ArticlesByCategory = ({ posts, categories }) => {
  const orderByCategory = useMemo(() => {
    return categories.reduce((acc, val) => {
      console.log("val", val)
      acc[val.slug] = val.data.order

      if (!acc.tranding) {
        acc.tranding = -100
      }

      return acc
    }, {})
  }, [categories])
  const [articlesDivided, setArticlesDivided] = useState({});

  console.log(posts)
  useEffect(() => {
    let final = posts.reduce((acc, val) => {
      const category = val.data.category;
      if (acc[category]) {
        acc[category].push(val)
      } else {
        acc[category] = [val]

        if (!acc.tranding) {
          acc.tranding = [val]
        } else if (acc.tranding.length < 4) {
          acc.tranding.push(val)
        }
      }
      return acc
    }, {})

    setArticlesDivided(final)
  }, [posts])

  return (
    <div className={styles.articlesByCategoryWrapper}>
      {Object.entries(articlesDivided)
        .sort((a, b) => orderByCategory[a[0]] - orderByCategory[b[0]])
        .map((i, idx) => (
          <div key={idx} className={styles.dividedSection}>
            <div className={styles.dividedSectionHead}>
              <span
                className="section-title"
                {...(i[0] !== "tranding" && { style: { color: i[1][0].data.category_color } })}
              >
                {i[0] !== "tranding" ? "." : ""}{i[0]}
              </span>

              {i[0] !== "tranding" && (
                <button>
                  <ArrowRightIcon/> more
                </button>
              )}
            </div>
            <div className={styles.dividedSectionArticles}>
              {i[1].map((i, idx) => (
                <ArticleCard
                  key={idx}
                  data={i.data}
                  showSubtitle={!i.data.sponsored}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ArticlesByCategory;
