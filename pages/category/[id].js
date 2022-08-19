import React from 'react';
import {useRouter} from "next/router";
import RenderContent from "../../components/RenderContent";
import Head from "next/head";
import styles from "../../styles/category.module.css";
import getPosts from "../api/getPosts";
import getCategories from "../api/getCategories";
import ArticleCard from "../../components/ArticleCard";
import SignToNews from "../../components/SignToNews";

const Category = ({ categories, posts, category, tags }) => {
  const router = useRouter()
  const { id } = router.query
  const { name, color } = category.data;

  console.log("id", id)
  console.log("category", category)
  console.log("posts", posts)
  console.log("tags", tags)
  return (
    <RenderContent categories={categories}>
      <Head>
        <title>{category.data.name} - Flow</title>
        <meta name="description" content={`${category.data.name} - Flow blog`}/>
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>
      <div className={styles.category}>
        <div className={styles.categoryTop}>
          <span style={{ color: color }}>
            .{name}
          </span>

          <div className={styles.sortWrapper}>
            <span>sort : </span>
            <span className={styles.sortValue}>
              recent
            </span>
          </div>
        </div>
        <div className={styles.tagsWrapper}>
          {tags.map(i => (
            <span>{i}</span>
          ))}
        </div>
        <div className={styles.categoryPosts}>
          {posts.map(({ data }, idx) => (
            <>
              <ArticleCard
                data={data}
                horizontal
                showSubtitle
              />
              {idx === 1 && (
                <SignToNews inline/>
              )}
            </>
          ))}
        </div>
      </div>
    </RenderContent>
  )
}

export async function getStaticPaths() {
  const categories = await getCategories()

  // TODO: probably will need to be changed when CRM will be backended
  console.log(categories.map(i => ({ params: { id: i.slug } })))
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
  console.log(posts)
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
