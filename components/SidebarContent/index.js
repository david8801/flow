import React from 'react';
import headerStyles from "../HeaderContent/styles.module.css"
import styles from "./styles.module.css"
import {Logo, SearchIcon} from "../../icons/header";
import Switch from "../ui/Switch";
import Link from "next/link";
import SearchWrapper from "../SearchWrapper";

const SidebarContent = ({
                          theme,
                          toggleSideNavigation,
                          sideNavigation,
                          toggleDarkMode,
                          search,
                          setSearch,
                          searchResults,
                          setSearchResults,
                          submitSearch,
                          searchActive,
                          setSearchActive,
                          categories
                        }) => {
  return (
    <div className={`${headerStyles.header} ${styles.sidebar}`}>
      <Link href={"/"}>
        <Logo width={134}/>
      </Link>
      <div className={styles.search}>
        <SearchWrapper
          submitSearch={submitSearch}
          active={searchActive}
          setActive={setSearchActive}
          onChange={setSearch}
          value={search}
          sidebar
        />
      </div>

      <div className={styles.categories}>
        <span style={{ color: "#B987F2" }}>home</span>
        {categories.map(({ data }, idx) => (
          <span key={idx} style={{ color: data.color }}>{data.name}</span>
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
