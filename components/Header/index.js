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
    setSearchActive(false)
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
      setSearchResults([...posts.filter(i => i.data.title.toLowerCase().includes(searchValue.toLowerCase()))])
      return searchValue
    })
    // setSearchActive(false)
  }
  const searchDebounce = useMemo(() => debounce(submitSearch, 300), [])

  useEffect(() => {
    searchDebounce()
  }, [searchValue])

  const handleSubscribe = () => {
    document.getElementById("subscribe")?.scrollIntoView({behavior: "smooth"})
  }


  const innerProps = {
    sideNavigation,
    theme,
    toggleDarkMode,
    toggleSideNavigation,
    search: searchValue,
    setSearch: setSearchValue,
    submitSearch,
    searchActive,
    setSearchActive,
    categories,
    clearResults,
    closeSearch,
    handleSubscribe
  }
  return <>
    {width <= 800
      ? <MobileHeader {...innerProps}/>
      : sideNavigation
        ? <SidebarContent {...innerProps}/>
        : <HeaderContent {...innerProps}/>
    }
    {!!searchValue && !!searchResults.length && (
      <SearchResults posts={searchResults} searchValue={searchValue} onClose={closeSearch}/>
    )}
  </>;
};

export default Header;
