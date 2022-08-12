import React from 'react';
import headerStyles from "../HeaderContent/styles.module.css"
import styles from "./styles.module.css"
import {Logo, SearchIcon} from "../../icons/header";
import {categories} from "../../constants/header";
import Switch from "../ui/Switch";
import Link from "next/link";

const SidebarContent = ({ theme, toggleSideNavigation, sideNavigation, toggleDarkMode }) => {
  return (
    <div className={`${headerStyles.header} ${styles.sidebar}`}>
      <Link href={"/"}>
        <Logo width={134}/>
      </Link>
      <span className={styles.search}><SearchIcon/>search</span>
      <div className={styles.categories}>
        {categories.map(i => (
          <span style={{ color: i.color }}>{i.name}</span>
        ))}
      </div>
      <div className={styles.switches}>
        <Switch
          checked={sideNavigation}
          onChange={toggleSideNavigation}
          label={"side navigation"}/>
        <Switch
          checked={theme === "dark"}
          onChange={toggleDarkMode}
          label={"dark mode"}
        />
      </div>
      <button className={styles.subscribe}>
        Subscribe
      </button>
    </div>
  );
};

export default SidebarContent;
