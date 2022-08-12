import Head from 'next/head'
import getPosts from "./api/getPosts";
import styles from "../styles/homepage.module.css"
import getCategories from "./api/getCategories";
import ArticleRow from "../components/ArticleRow";
import Header from "../components/Header";
import React from "react";
import RenderContent from "../components/RenderContent";
import Heading from "../components/Homepage/Heading";
import Latest from "../components/Homepage/Latest";
import ArticlesByCategory from "../components/Homepage/ArticlesByCategory";

export default function Home({ posts, categories }) {
  console.log("categories", categories)

  return (
    <RenderContent categories={categories}>
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
    </RenderContent>
  )
}

export async function getStaticProps() {
  let posts = await getPosts()
  const categories = await getCategories()

  posts = posts.map(i => ({
    ...i,
    data: { ...i.data, category_color: categories.find(j => i.data.category === j.slug).data.color || null }
  }))

  return {
    props: { posts, categories }
  }
}
