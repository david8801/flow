import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSideNavigationSelector, getThemeSelector} from "../../store/main/selectors";
import {setSideNavigation, setTheme} from "../../store/main/mainSlice";
import HeaderContent from "../HeaderContent";
import SidebarContent from "../SidebarContent";
import SearchResults from "../SearchResults";
import {debounce} from "lodash";

const Header = ({ categories, posts }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([])
  const sideNavigation = useSelector(getSideNavigationSelector);
  const theme = useSelector(getThemeSelector)
  const dispatch = useDispatch()

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
    {sideNavigation
      ? (
        <SidebarContent
          sideNavigation={sideNavigation}
          theme={theme}
          toggleDarkMode={toggleDarkMode}
          toggleSideNavigation={toggleSideNavigation}
          search={searchValue}
          setSearch={setSearchValue}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
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
          searchResults={searchResults}
          setSearchResults={setSearchResults}
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
