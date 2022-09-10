import React, {useCallback, useState} from 'react';
import styles from "./styles.module.css"
import {Logo, SearchIcon} from "../../icons/header";
import Link from "next/link";

const MobileHeader = () => {
  const [menuActive, setMenuActive] = useState(false);

  const triggerMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <div className={styles.header}>
      <SearchIcon width={24} height={24}/>
      <Link href={"/"}>
        <Logo width={150} height={60}/>
      </Link>
      <div
        onClick={triggerMenu}
        className={`${styles.burgerMenu} ${menuActive ? styles.active : ""}`}
      >
        <span/>
        <span/>
        <span/>
      </div>
    </div>
  );
};

export default MobileHeader;
