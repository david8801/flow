import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSideNavigationSelector, getThemeSelector} from "../../store/main/selectors";
import {setSideNavigation, setTheme} from "../../store/main/mainSlice";
import HeaderContent from "../HeaderContent";
import SidebarContent from "../SidebarContent";
import SearchResults from "../SearchResults";
import {debounce} from "lodash";
import MobileHeader from "../MobileHeader";

const Header = ({ categories, posts }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([])
  const [width, setWidth] = useState(null)
  const sideNavigation = useSelector(getSideNavigationSelector);
  const theme = useSelector(getThemeSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener("resize", onResize)
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
      window.removeEventListener("resize", onResize)
    };
  }, []);

  const onResize = (e) => {
    setWidth(e.target.innerWidth)
  }

  const escFunction = (event) => {
    if (event.key === "Escape") {
      setSearchActive(false)
    }
  }

  const toggleDarkMode = (e) => {
    dispatch(setTheme(e.target.checked ? "dark" : "light"))
  }

  const toggleSideNavigation = (e) => {
    dispatch(setSideNavigation(e.target.checked))
  }

  const closeSearch = () => {
    setSearchValue("")
    clearResults()
  }

  const clearResults = () => {
    setSearchResults([])
  }

  const submitSearch = (e) => {
    e?.preventDefault()

    if (e?.type === "submit" && !searchValue) {
      setSearchActive(false)
      return
    }

    setSearchValue(searchValue => {
      console.log("terasdf", posts.filter(i => i.data.title.includes(searchValue)))
      setSearchResults([...posts.filter(i => i.data.title.includes(searchValue))])
      return searchValue
    })
    // setSearchActive(false)
  }
  const searchDebounce = useMemo(() => debounce(submitSearch, 500), [])

  useEffect(() => {
    searchDebounce()
  }, [searchValue])

  return <>
    {width <= 800
      ? <MobileHeader/>
      : sideNavigation
        ? (
          <SidebarContent
            sideNavigation={sideNavigation}
            theme={theme}
            toggleDarkMode={toggleDarkMode}
            toggleSideNavigation={toggleSideNavigation}
            search={searchValue}
            setSearch={setSearchValue}
            submitSearch={submitSearch}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
            categories={categories}
            clearResults={clearResults}
          />
        )
        : (
          <HeaderContent
            sideNavigation={sideNavigation}
            theme={theme}
            toggleDarkMode={toggleDarkMode}
            toggleSideNavigation={toggleSideNavigation}
            search={searchValue}
            setSearch={setSearchValue}
            submitSearch={submitSearch}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
            categories={categories}
            clearResults={clearResults}
          />
        )}
    {!!searchValue && !!searchResults.length && (
      <SearchResults posts={searchResults} searchValue={searchValue} onClose={closeSearch}/>
    )}
  </>;
};

export default Header;
