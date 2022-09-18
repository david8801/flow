import React, {useState} from 'react';
import styles from "./styles.module.css"
import {Discord, Facebook, Instagram, Logo, Telegram, Twitter} from "../../icons/header";
import {ArrowRightIcon} from "../../icons/shared";
import Link from "next/link";
import CategoryList from "../CategoryList";

const Footer = ({ categories }) => {

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerTop}>
        <Link href={"/"}>
          <Logo height={71}/>
        </Link>

        <a className={styles.email} href="mailto:hello@flow.com">
          <ArrowRightIcon height={45} width={45}/>
          hello@flow.com
        </a>
      </div>
      <div className={styles.categories}>
        <CategoryList categories={categories}/>
      </div>
      <div className={styles.media}>
        <Telegram/>
        <Facebook/>
        <Twitter/>
        <Discord/>
        <Instagram/>
      </div>
      <div className={styles.categoriesMobile}>
        <CategoryList categories={categories}/>
      </div>
      <span className={styles.copyright}>
        © The Cymes 2022
      </span>
    </div>
  )
};

export default Footer;
