import React from 'react';
import styles from "./styles.module.css";
import {Discord, Instagram, Logo, Telegram, Twitter} from "../../icons/header";
import Switch from "../ui/Switch";
import Link from "next/link";
import SearchWrapper from "../SearchWrapper";

const HeaderContent = ({
                         sideNavigation,
                         theme,
                         toggleDarkMode,
                         toggleSideNavigation,
                         search,
                         setSearch,
                         searchResults,
                         setSearchResults,
                         submitSearch,
                         searchActive,
                         setSearchActive,
                         categories
                       }) => {
  console.log(categories)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.media}>
            <Telegram/>
            <Twitter/>
            <Discord/>
            <Instagram/>
          </div>
          <Link href={"/"}>
            <Logo/>
          </Link>
          <div className={styles.actions}>
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
            <button>
              click to not loose our news
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.categoriesWrapper} categories-wrapper`}>
        <div id={"categories"} className={styles.categories}>
          {categories.map(({ data }, idx) => (
            <span key={idx} style={{ color: data.color }}>{data.name}</span>
          ))}
          <SearchWrapper
            onChange={setSearch}
            submitSearch={submitSearch}
            value={search}
            active={searchActive}
            setActive={setSearchActive}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
