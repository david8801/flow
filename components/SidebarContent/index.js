import React from 'react';
import headerStyles from "../HeaderContent/styles.module.css"
import styles from "./styles.module.css"
import {Discord, Facebook, Instagram, Logo, SearchIcon, Telegram, Twitter} from "../../icons/header";
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
                          submitSearch,
                          searchActive,
                          setSearchActive,
                          categories,
                          clearResults
                        }) => {
  return (
    <div className={`${headerStyles.header} ${styles.sidebar}`}>
      <Link href={"/"}>
        <Logo width={134} height={50} style={{minWidth: '134px', minHeight: "50px"}}/>
      </Link>
      <div className={styles.search}>
        <SearchWrapper
          submitSearch={submitSearch}
          active={searchActive}
          setActive={setSearchActive}
          onChange={setSearch}
          value={search}
          clearResults={clearResults}
          sidebar
        />
      </div>

      <div className={styles.categories}>
        <Link href={"/"}>
          <span style={{ color: "#B987F2" }}>
            home
          </span>
        </Link>
        {categories.map((i, idx) => (
          <Link href={"/category/" + i.slug} key={idx}>
            <span style={{ color: i.data.color }}>
              {i.data.name}
            </span>
          </Link>
        ))}
      </div>
      <div className={styles.social}>
        <Telegram width={16} height={16}/>
        <Facebook width={16} height={16}/>
        <Twitter width={16} height={16}/>
        <Discord width={16} height={16}/>
        <Instagram width={16} height={16}/>
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
