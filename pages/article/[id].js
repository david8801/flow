import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import Head from "next/head";
import styles from "../../styles/article.module.css";
import getPosts from "../api/getPosts";
import getCategories from "../api/getCategories";
import {useSelector} from "react-redux";
import {getRunningTextShownSelector, getSideNavigationSelector} from "../../store/main/selectors";
import {remark} from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';
import moment from "moment";
import {Discord, Facebook, Instagram, Telegram, Twitter} from "../../icons/header";
import ArticleCard from "../../components/ArticleCard";

const Article = ({ posts, post, category }) => {
  const { name, color } = category.data;
  const [content, setContent] = useState("")
  const sideNavigation = useSelector(getSideNavigationSelector)
  const runningTextShown = useSelector(getRunningTextShownSelector)
  const runningTextHeight = runningTextShown ? 45 : 0;

  const featuredPosts = useMemo(() => {
    const mainPostTags = post.data.tags?.map(i => i.name);

    return posts.reduce((acc, cur) => {
      let matchedTags = 0;
      cur.data.tags?.forEach(i => {
        if (mainPostTags.includes(i.name)) {
          matchedTags++
        }
      })
      cur.matchedTags = matchedTags

      acc.push(cur)
      return acc
    }, []).sort((a, b) => b.matchedTags - a.matchedTags)
  }, [post, posts])

  useEffect(() => {
    let initialOffsetTop = sideNavigation ? runningTextHeight : (195 + runningTextHeight);

    // additional function is used because removeEventListener cannot remove the function which is receiving parameters
    const scrollListener = () => {
      onScroll(initialOffsetTop)
    }

    window.removeEventListener("scroll", scrollListener)

    window.addEventListener("scroll", scrollListener)

    return () => {
      window.removeEventListener("scroll", scrollListener)
    }
  }, [sideNavigation])


  const onScroll = (initialOffsetTop) => {
    const categoryHeader = document.getElementById("article-header"),
      offsetTop = categoryHeader?.offsetTop;
    console.log(initialOffsetTop, offsetTop)

    if (initialOffsetTop !== offsetTop) {
      categoryHeader.classList.add("sticky")
    } else {
      categoryHeader.classList.remove("sticky")
    }
  }

  useLayoutEffect(() => {
    setContent(
      remark()
        .use(recommended)
        .use(remarkHtml)
        .processSync(post.content).toString()
        .replaceAll?.('src="img', 'src="' + process.env.NEXT_PUBLIC_WEBSITE_URL + "/img")
    )
  }, [])

  // TODO: !! COUNT BY MATCHING TAGS - SORT BY MATCHING TAGS AND SHOW RELATED TAGS
  // TODO: !! ADD TRENDING NOW CHECKBOX TO CRM AND MAP THEM ON HOMEPAGE

  console.log("post", post)
  console.log("category", category)
  console.log(content)
  return (
    <>
      <Head>
        <title>{post.data.title} - Flow</title>
        <meta name="description" content={`${post.data.title} - Flow blog`}/>
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>
      <div>
        <div id={"article-header"} className={styles.articleTopWrapper}>
          <div className={styles.articleMeta}>
            <span style={{ color: color }} className={styles.category}>.{name}</span>
            <span className={styles.date}>{moment(post.data.date).format('D MMMM HH:mm')}</span>
          </div>
          <div className={styles.articleMain}>
            <span className={styles.title}>
              <span className={styles.brace}>{"< "}</span>
              {post.data.title}
              <span className={styles.brace}>{"/>"}</span>
            </span>
            <span className={styles.subtitle}>{post.data.subtitle}</span>
          </div>
        </div>
        <div className={styles.articleWrapper}>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className={styles.article}
          />
          <div className={styles.media}>
            <Telegram/>
            <Facebook/>
            <Twitter/>
            <Discord/>
            <Instagram/>
          </div>
          <div className={styles.articleFooter}>
            <div className={styles.share}>
              <span>Share</span>

              <Telegram/>
              <Facebook/>
              <Twitter/>
              <Discord/>
              <Instagram/>
            </div>

            <div className={styles.meta}>
              <div className={styles.author}>
                <span>by  </span>
                <span className={styles.name}>{post.data.author}</span>
              </div>
              <span className={styles.date}>{moment(post.data.date).format('D MMMM YYYY')}</span>
            </div>

            <div className={styles.tagsWrapper}>
              {post.data.tags?.map(({ name }) => (
                <span>{name}</span>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.relatedArticlesWrapper}>
          <span>related articles</span>
          <div className={styles.relatedArticles}>
            {featuredPosts.slice(0, 3)?.map(i => (
              <ArticleCard
                data={i.data}
                slug={i.slug}
                showSubtitle
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const posts = await getPosts()

  // TODO: probably will need to be changed when CRM will be backended
  return {
    paths: posts.map(i => ({ params: { id: i.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let posts = await getPosts()
  const categories = await getCategories()
  const post = posts.find(i => i.slug === params.id)
  const category = categories.find(i => i.data.name === post.data.category)

  posts = posts.map(i => {
    const category = categories.find(j => i.data.category === j.data.name)
    return {
      ...i,
      category_slug: category.slug,
      data: { ...i.data, category_color: category?.data.color, category_order: category?.data.order }
    }
  })

  return {
    props: { posts, categories, category, post }
  }
}

export default Article;
