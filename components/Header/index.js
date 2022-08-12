import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSideNavigationSelector, getThemeSelector} from "../../store/main/selectors";
import {setSideNavigation, setTheme} from "../../store/main/mainSlice";
import HeaderContent from "../HeaderContent";
import SidebarContent from "../SidebarContent";

const Header = () => {
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

  const submitSearch = (e) => {
    e.preventDefault()

    setSearchActive(false)
  }

  return sideNavigation
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
      />
    );
};

export default Header;
