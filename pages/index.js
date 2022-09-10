import Head from 'next/head'
import getPosts from "./api/getPosts";
import styles from "../styles/homepage.module.css"
import getCategories from "./api/getCategories";
import React from "react";
import Heading from "../components/Homepage/Heading";
import Latest from "../components/Homepage/Latest";
import ArticlesByCategory from "../components/Homepage/ArticlesByCategory";

export default function Home({ posts, categories }) {
  console.log("categories", categories)

  return (
    <>
      <Head>
        <title>Flow</title>
        <meta name="description" content="Flow blog"/>
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>
      <div className={styles.homepage}>
        <Heading posts={posts}/>
        <div className={styles.verticalSplit}>
          <ArticlesByCategory posts={posts} categories={categories}/>
          <Latest posts={posts}/>
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
