import React, {useEffect, useMemo, useState} from 'react';
import styles from "./styles.module.css";
import ArticleCard from "../../ArticleCard";
import {ArrowRightIcon} from "../../../icons/shared";
import {useRouter} from "next/router";

const ArticlesByCategory = ({ posts, categories }) => {
  const router = useRouter();
  const [articlesDivided, setArticlesDivided] = useState({});

  const orderByCategory = useMemo(() => {
    return categories.reduce((acc, val) => {
      console.log("val", val)
      acc[val.slug] = val.data.order

      if (!acc.trending) {
        acc.trending = -100
      }

      return acc
    }, {})
  }, [categories])

  useEffect(() => {
    let final = posts.reduce((acc, val) => {
      const category = val.data.category;

      if (val.data.trending) {
        if (!acc.trending) {
          acc.trending = [val]
        } else if (acc.trending.length < 4) {
          acc.trending.push(val)
        }
      }

      if (acc[category]?.length < 4) {
        acc[category].push(val)
      } else if (!acc[category]) {
        acc[category] = [val]
      }
      return acc
    }, {})

    setArticlesDivided(final)
  }, [posts])

  console.log("articlesDivided",articlesDivided)
  return (
    <div className={styles.articlesByCategoryWrapper}>
      {Object.entries(articlesDivided)
        .sort((a, b) => orderByCategory[a[0]] - orderByCategory[b[0]])
        .map((i, idx) => {
          const redirect = () => router.push("/category/" + i[1][0].category_slug)
          return (
            <div key={idx} className={styles.dividedSection}>
              <div className={styles.dividedSectionHead}>
              <span
                className="section-title"
                {...(i[0] !== "trending" && {
                  style: { color: i[1][0].data.category_color, cursor: "pointer" },
                  onClick: redirect
                })}
              >
                {i[0] !== "trending" ? "." : ""}{i[0]}{i[0] === "trending" ? " now" : ""}
              </span>

                {i[0] !== "trending" && (
                  <button onClick={redirect} className={`${styles.desktop} ${styles.showMore}`}>
                    <ArrowRightIcon/> more
                  </button>
                )}
              </div>
              <div className={styles.dividedSectionArticles}>
                {i[1].map((i, idx) => (
                  <ArticleCard
                    slug={i.slug}
                    key={idx}
                    data={i.data}
                    showSubtitle={!i.data.sponsored}
                  />
                ))}
              </div>

              {i[0] !== "trending" && (
                <button onClick={redirect} className={`${styles.mobile} ${styles.showMore}`}>
                  <ArrowRightIcon/> more
                </button>
              )}
            </div>
          )
        })}
    </div>
  );
};

export default ArticlesByCategory;
