import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as keys from "../helpers/keys";
import {setSideNavigation, setTheme} from "../store/main/mainSlice";
import {getRunningTextShownSelector, getSideNavigationSelector, getThemeSelector} from "../store/main/selectors";
import Marquee from "react-fast-marquee";
import SignToNews from "./SignToNews";

const StateManager = ({ children }) => {
  const dispatch = useDispatch()
  const theme = useSelector(getThemeSelector)
  const sideNavigation = useSelector(getSideNavigationSelector)
  const showRunningText = useSelector(getRunningTextShownSelector)
  const [subscribePopup, setSubscribePopup] = useState(true);

  useEffect(() => {
    const storageTheme = localStorage.getItem(keys.theme)
    const storageSideNavigation = localStorage.getItem(keys.sideNavigation)
    let defaultTheme = "light"

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      defaultTheme = "dark"
    }

    dispatch(setTheme(storageTheme || defaultTheme))
    dispatch(setSideNavigation(storageSideNavigation ? storageSideNavigation === "true" : true))
  }, [])

  if (!theme) {
    return <div style={{ visibility: 'hidden' }}>
      {children}
    </div>
  }

  const closeSubscriptionPopup = () => setSubscribePopup(false)

  return (
    <div
      id={"state-manager"}
      className={`state-manager ${theme}-theme ${sideNavigation ? "menu-left" : "menu-top"} ${showRunningText ? "running-text-shown" : ""}`}>
      {showRunningText && (
        <div className={"running-text-wrapper"}>
          <Marquee speed={40} gradient={false}>
            Read new post 🔥🔥🔥 a Billion-Dollar NFT Gaming Startup Promised Riches and Delivered Disaster 🔥🔥🔥 Read new
            post 🔥🔥🔥 a Billion-Dollar NFT Gaming Startup Promised Riches and Delivered Disaster
          </Marquee>
        </div>
      )}
      {children}
      {subscribePopup && (
        <div className="be-updated">
          <span onClick={closeSubscriptionPopup}>close</span>
          <SignToNews type={"popup"}/>
        </div>
      )}
    </div>
  )
};

export default StateManager;
