import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Head from "next/head";
import styles from "../styles/category.module.css";
import getPosts from "./api/getPosts";
import getCategories from "./api/getCategories";
import ArticleCard from "../components/ArticleCard";
import SignToNews from "../components/SignToNews";
import {useSelector} from "react-redux";
import {getRunningTextShownSelector, getSideNavigationSelector} from "../store/main/selectors";
import Pagination from "../components/Pagination";

const Search = ({ posts }) => {
  const sideNavigation = useSelector(getSideNavigationSelector)
  const runningTextShown = useSelector(getRunningTextShownSelector)
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(null)
  const router = useRouter();
  const searchValue = router.query.value;
  const runningTextHeight = runningTextShown ? 45 : 0

  useEffect(() => {
    let initialOffsetTop = sideNavigation ? runningTextHeight : (194 + runningTextHeight);

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

  const filteredPosts = posts.filter(i => i.data.title?.toLowerCase().includes(searchValue?.toLowerCase()));
  return (
    <>
      <Head>
        <title>{searchValue} Search - Flow</title>
        <meta name="description" content={`${searchValue} Search - Flow blog`}/>
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>
      <div>
        <div id={"category-header"} className={styles.categoryTopWrapper}>
          <div className={styles.categoryTop}>
            <span style={{ color: "white" }}>
              .search result "{searchValue}"
            </span>

            <div onClick={toggleSort} className={styles.sortWrapper}>
              <span>sort : </span>
              <span className={styles.sortValue}>
                {sort}
              </span>
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

export async function getStaticProps() {
  let posts = await getPosts()
  const categories = await getCategories()

  posts = posts.map(i => {
    const category = categories.find(j => i.data.category === j.data.name)
    return {
      ...i,
      category_slug: category.slug,
      data: { ...i.data, category_color: category?.data.color, category_order: category?.data.order }
    }
  })

  return {
    props: { posts, categories }
  }
}


export default Search;
