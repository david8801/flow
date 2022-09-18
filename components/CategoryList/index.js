import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "./styles.module.css"

const CategoryList = ({ categories }) => {
  const router = useRouter();
  console.log(router)
  return <>
    <Link href={"/"}>
          <span
            className={styles.category}
            style={{
              color: "#B987F2",
              borderBottom: router.pathname === "/" ? "1px solid #B987F2" : ""
          }}
          >
            home
          </span>
    </Link>
    {categories.map((i, idx) => (
      <Link href={"/category/" + i.slug} key={idx}>
            <span
              style={{
                color: i.data.color,
                borderBottom: router.query.id === i.slug ? "1px solid " + i.data.color : ""
              }}
              className={styles.category}
            >
              {i.data.name}
            </span>
      </Link>
    ))}
  </>
};

export default CategoryList;
