import React, {useEffect, useState} from 'react';
import Head from "next/head";
import styles from "../../styles/category.module.css";
import getPosts from "../api/getPosts";
import getCategories from "../api/getCategories";
import ArticleCard from "../../components/ArticleCard";
import SignToNews from "../../components/SignToNews";
import {useSelector} from "react-redux";
import {getRunningTextShownSelector, getSideNavigationSelector} from "../../store/main/selectors";
import moment from "moment";
import Pagination from "../../components/Pagination";
import HeadSEO from "../../components/HeadSEO";

const Category = ({ posts, category, tags }) => {
  const { name, color } = category.data;
  const sideNavigation = useSelector(getSideNavigationSelector)
  const runningTextShown = useSelector(getRunningTextShownSelector)
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [activeTags, setActiveTags] = useState([]);
  const [offset, setOffset] = useState(0)
  const [width, setWidth] = useState(null)
  const runningTextHeight = runningTextShown ? 45 : 0

  useEffect(() => {
    let initialOffsetTop = sideNavigation ? runningTextHeight : (195 + runningTextHeight);

    // additional function is used because removeEventListener cannot remove the function which is receiving parameters
    const scrollListener = () => {
      onScroll(initialOffsetTop)
    }

    setWidth(window.innerWidth)
    window.addEventListener("resize", onResize)

    window.addEventListener("scroll", scrollListener)

    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", scrollListener)
    }
  }, [sideNavigation])

  const onResize = (e) => {
    setWidth(e.target.innerWidth)
  }

  const onScroll = (initialOffsetTop) => {
    const categoryHeader = document.getElementById("category-header"),
      offsetTop = categoryHeader?.offsetTop;

    if (initialOffsetTop !== offsetTop) {
      categoryHeader.classList.add("sticky")
    } else {
      categoryHeader.classList.remove("sticky")
    }
  }

  const toggleSort = () => {
    setSort(sort === "recent" ? "the oldest" : "recent")
  }

  const toggleTags = (name) => {
    setActiveTags(activeTags.includes(name) ? activeTags.filter(i => i !== name) : [...activeTags, name])
  }

  const filteredPosts = (
    posts
      .filter(i => activeTags.length ? activeTags.every(j => i.data.tags?.map(i => i.name).includes(j)) : true)
      .sort((a, b) => sort === "recent" ? moment(b.data.date).diff(a.data.date) : moment(a.data.date).diff(b.data.date))
  );
  return (
    <>
      <HeadSEO
        title={`${name} Category - The Cymes`}
        description={`${name} Category - The Cymes blog`}
        image={process.env.NEXT_PUBLIC_WEBSITE_URL + "/meta.png"}
      />
      <div>
        <div id={"category-header"} className={styles.categoryTopWrapper}>
          <div className={styles.categoryTop}>
            <span style={{ color: color }}>
              .{name}
            </span>

            <div onClick={toggleSort} className={styles.sortWrapper}>
              <span>sort : </span>
              <span className={styles.sortValue}>
                {sort}
              </span>
            </div>
            <div className={styles.tagsWrapper}>
              {tags.map(i => (
                <span className={activeTags.includes(i) ? styles.activeTag : ""} onClick={() => toggleTags(i)}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.category}>
          <div className={styles.categoryPosts}>
            {filteredPosts
              .slice(((page - 1) * 10) - (offset), page * 10)
              .map((i, idx) => (
                <>
                  <ArticleCard
                    slug={i.slug}
                    data={i.data}
                    horizontal={width > 650}
                    showSubtitle
                  />
                  {idx === 1 && (
                    <SignToNews type={"inline"}/>
                  )}
                </>
              ))}
          </div>
          <Pagination
            onPageChange={setPage}
            currentPage={page}
            offset={offset}
            setOffset={setOffset}
            siblingCount={3}
            totalCount={filteredPosts.length}
          />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const categories = await getCategories()

  // TODO: probably will need to be changed when CRM will be backended
  return {
    paths: categories.map(i => ({ params: { id: i.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let posts = await getPosts()
  const categories = await getCategories()
  const category = categories.find(i => i.slug === params.id)

  posts = posts
    .filter(i => i.data.category === category.data.name)
    .map(i => ({
      ...i,
      data: {
        ...i.data,
        category_color: category.data.color
      }
    }))

  let tags = [];
  posts.map(i => i.data.tags)
    .flat(2)
    .filter(i => i)
    .forEach(i => {
      if (!tags.includes(i.name || "")) {
        tags.push(i.name || "")
      }
    });

  return {
    props: { posts, categories, category, tags }
  }
}

export default Category;
