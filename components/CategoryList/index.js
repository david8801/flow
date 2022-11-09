import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "./styles.module.css"

const CategoryList = ({ categories, onClick }) => {
  const router = useRouter();
  return <>
    <Link href={"/"}>
          <span
            className={styles.category}
            onClick={onClick}
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
              onClick={onClick}
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
