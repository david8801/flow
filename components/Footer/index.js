import React, {useState} from 'react';
import styles from "./styles.module.css"
import {Discord, Instagram, Logo, Telegram, Twitter} from "../../icons/header";
import {ArrowRightIcon} from "../../icons/shared";
import Link from "next/link";

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
        <Link href={"/"}>
          <span style={{ color: "#B987F2" }}>
            home
          </span>
        </Link>
        {categories.map(({ data }, idx) => (
          <Link href={"/category/" + data.name.split(" ").join("-")} key={idx}>
            <span style={{ color: data.color }}>
              {data.name}
            </span>
          </Link>
        ))}
      </div>
      <div className={styles.media}>
        <Telegram/>
        <Twitter/>
        <Discord/>
        <Instagram/>
      </div>
      <span className={styles.copyright}>
        © Flow 2022
      </span>
    </div>
  )
};

export default Footer;
