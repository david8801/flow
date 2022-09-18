import React, {useCallback, useState} from 'react';
import styles from "./styles.module.css"
import {Logo, SearchIcon} from "../../icons/header";
import Link from "next/link";
import MobileSidebar from "../MobileSidebar";

const MobileHeader = ({
                        theme,
                        toggleDarkMode,
                        search,
                        setSearch,
                        submitSearch,
                        searchActive,
                        setSearchActive,
                        categories,
                        clearResults,
                        closeSearch
                      }) => {
  const [menuActive, setMenuActive] = useState(false);

  const handleAction = () => {
    if (searchActive) {
      closeSearch()
    } else {
      triggerMenu()
    }
  }

  const triggerMenu = () => {
    setMenuActive(!menuActive)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const openSearch = () => setSearchActive(true)

  return (
    <>
      <div className={styles.header}>
        <input
          value={search}
          className={`${styles.search} ${searchActive ? styles.searchActive : ""}`}
          type="text"
          onChange={handleSearch}
        />
        <SearchIcon className={styles.searchIcon} onClick={openSearch} width={24} height={24}/>
        <Link href={"/"}>
          <Logo width={150} height={60}/>
        </Link>
        <div
          onClick={handleAction}
          className={`${styles.burgerMenu} ${menuActive || searchActive ? styles.active : ""}`}
        >
          <span/>
          <span/>
          <span/>
        </div>
      </div>
      <MobileSidebar
        active={menuActive}
        theme={theme}
        toggleDarkMode={toggleDarkMode}
        categories={categories}
      />
    </>
  );
};

export default MobileHeader;
