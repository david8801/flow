import React, {useEffect, useState} from 'react';
import styles from "./styles.module.css";
import ArticleCard from "../../ArticleCard";

const ArticlesByCategory = ({ posts, categories }) => {
  const [artliclesDivided, setArtliclesDivided] = useState({});

  console.log(posts)
  useEffect(() => {
    let final = {}
    posts.forEach(i => {
      const category = i.data.category
      if (final[category]) {
        final[category].push(i)
      } else {
        final[category] = [i]
      }
    })
    Object.entries(final).forEach(i => {
      if (!final.tranding) {
        final.tranding = [i[1][0]]
      } else if (final.tranding.length < 4) {
        final.tranding.push(i[1][0])
      }
    })
    console.log("final", final)
    setArtliclesDivided(final)
  }, [posts])

  return (
    <div className={styles.articlesByCategoryWrapper}>
      {Object.entries(artliclesDivided)
        .sort(i => i[0] === "tranding" ? -1 : 0)
        .map((i, idx) => (
          <div className={styles.dividedSection}>
            <div className={styles.dividedSectionHead}>
              <span
                className="section-title theme-text"
                {...(i[0] !== "tranding" && { style: {color: i[1][0].data.category_color} })}
              >
                .{i[0]}
              </span>
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
