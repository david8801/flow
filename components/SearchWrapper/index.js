import React, {useEffect, useRef} from 'react';
import styles from "./styles.module.css";
import Input from "../ui/Input";
import {SearchIcon} from "../../icons/header";

const SearchWrapper = ({submitSearch, active, setActive, onChange, value, sidebar}) => {
  const handleSearch = (e) => {
    onChange(e.target.value)
  }

  useEffect(() => {
    if (active) {
      document.getElementById("search-input").focus()
    }
  }, [active])

  return (
    <div className={`${styles.searchWrapper} ${sidebar ? styles.sidebarSearch : ""}`}>
      <form className={`${styles.searchForm} ${active ? styles.searchFormActive : ""}`}
            onSubmit={submitSearch}>
        <Input id={"search-input"} StartIcon={<SearchIcon/>} value={value} onChange={handleSearch} type="text"/>
      </form>
      <span className={`${styles.searchHandler} ${active ? styles.searchHandlerInactive : ""}`}
            onClick={() => setActive(true)}>
            <SearchIcon/>search
          </span>
    </div>
  );
};

export default SearchWrapper;