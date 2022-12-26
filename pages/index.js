import Head from 'next/head'
import getPosts from "./api/getPosts";
import styles from "../styles/homepage.module.css"
import getCategories from "./api/getCategories";
import React from "react";
import Heading from "../components/Homepage/Heading";
import Latest from "../components/Homepage/Latest";
import ArticlesByCategory from "../components/Homepage/ArticlesByCategory";
import HeadSEO from "../components/HeadSEO";

export default function Home({ posts, categories }) {

  return (
    <>
      <HeadSEO
        title={"Zoom in tech power | The Cymes"}
        description={"The Cymes is a new media platform that covers the latest news and developments in the world of IT and technology. Founded by Ukrainian entrepreneurs, developers, and designers, The Cymes offers a unique perspective on the world of tech. With a focus on delivering high-quality content and staying up-to-date on the latest trends and innovations, The Cymes is a valuable resource for anyone interested in staying informed about the constantly evolving world of IT and technology. Whether you're a developer, designer, or simply a tech enthusiast, The Cymes is sure to have something for you."}
        image={process.env.NEXT_PUBLIC_WEBSITE_URL + "/meta.png"}
      />
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
