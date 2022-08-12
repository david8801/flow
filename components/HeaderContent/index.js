import React from 'react';
import styles from "./styles.module.css";
import {Discord, Instagram, Logo, SearchIcon, Telegram, Twitter} from "../../icons/header";
import Switch from "../ui/Switch";
import {categories} from "../../constants/header";
import Link from "next/link";
import {setTheme} from "../../store/main/mainSlice";
import Input from "../ui/Input";

const HeaderContent = ({
                         sideNavigation,
                         theme,
                         toggleDarkMode,
                         toggleSideNavigation,
                         search,
                         setSearch,
                         searchResults,
                         setSearchResults,
                         submitSearch
                       }) => {
  const searchActive = typeof search === "string"
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

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
        <div className={styles.categories}>
          {categories.map(i => (
            <span style={{ color: i.color }}>{i.name}</span>
          ))}
          <div className={styles.searchWrapper}>
            <form className={`${styles.searchForm} ${searchActive ? styles.searchFormActive : ""}`}
                  onSubmit={submitSearch}>
              <Input StartIcon={<SearchIcon/>} value={search} onChange={handleSearch} type="text"/>
            </form>
            <span className={`${styles.searchHandler} ${searchActive ? styles.searchHandlerInactive : ""}`}
                  onClick={() => setSearch("")}>
            <SearchIcon/>search
          </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
