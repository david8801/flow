import React from 'react';
import styles from "./styles.module.css"
import CategoryList from "../CategoryList";
import Switch from "../ui/Switch";
import {Discord, Facebook, Instagram, Telegram, Twitter} from "../../icons/header";

const MobileSidebar = ({ active, theme, toggleDarkMode, categories }) => {
  return (
    <div className={`${styles.mobileSidebar} ${active ? styles.active : ""}`}>
      <div className={styles.mobileSidebarContent}>
        <div className={styles.categories}>
          <CategoryList categories={categories}/>
        </div>
        <Switch
          size={"medium"}
          checked={theme === "dark"}
          onChange={toggleDarkMode}
          className={styles.checkbox}
          label={"dark mode"}/>
        <button>
          Click to not loose our news
        </button>
        <div className={styles.media}>
          <Telegram/>
          <Facebook/>
          <Twitter/>
          <Discord/>
          <Instagram/>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
