import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as keys from "../helpers/keys";
import {setSideNavigation, setTheme} from "../store/main/mainSlice";
import {getSideNavigationSelector, getThemeSelector} from "../store/main/selectors";
import Marquee from "react-fast-marquee";

const StateManager = ({ children }) => {
  const dispatch = useDispatch()
  const theme = useSelector(getThemeSelector)
  const sideNavigation = useSelector(getSideNavigationSelector)
  const [showRunningText, setShowRunningText] = useState(true);

  useEffect(() => {
    const storageTheme = localStorage.getItem(keys.theme)
    const storageSideNavigation = localStorage.getItem(keys.sideNavigation)

    dispatch(setTheme(storageTheme || "light"))
    dispatch(setSideNavigation(storageSideNavigation ? storageSideNavigation === "true" : true))
  }, [])

  if (!theme) {
    return <div style={{ visibility: 'hidden' }}>
      {children}
    </div>
  }

  return (
    <div
      className={`state-manager ${theme}-theme ${sideNavigation ? "menu-left" : "menu-top"} ${showRunningText ? "running-text-shown" : ""}`}>
      {showRunningText && (
        <div className={"running-text-wrapper"}>
          <Marquee speed={40} gradient={false}>
            Read new post 🔥🔥🔥 a Billion-Dollar NFT Gaming Startup Promised Riches and Delivered Disaster 🔥🔥🔥 Read new
            post 🔥🔥🔥 a Billion-Dollar NFT Gaming Startup Promised Riches and Delivered Disaster
          </Marquee>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  )
};

export default StateManager;
