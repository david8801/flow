import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as keys from "../helpers/keys";
import {setSideNavigation, setTheme} from "../store/main/mainSlice";
import {getRunningTextShownSelector, getSideNavigationSelector, getThemeSelector} from "../store/main/selectors";
import Marquee from "react-fast-marquee";
import SignToNews from "./SignToNews";

const StateManager = ({ children, runningLineSettings = {} }) => {
  const dispatch = useDispatch()
  const theme = useSelector(getThemeSelector)
  const sideNavigation = useSelector(getSideNavigationSelector)
  const [subscribePopup, setSubscribePopup] = useState(false);

  useEffect(() => {
    const storageSignToNewsShown = localStorage.getItem(keys.signToNews)
    const storageTheme = localStorage.getItem(keys.theme)
    const storageSideNavigation = localStorage.getItem(keys.sideNavigation)
    let defaultTheme = "light"

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      defaultTheme = "dark"
    }

    dispatch(setTheme(storageTheme || defaultTheme))
    dispatch(setSideNavigation(storageSideNavigation ? storageSideNavigation === "true" : true))

    if (!storageSignToNewsShown) {
      setTimeout(() => setSubscribePopup(true), 10000)
    }
  }, [])

  if (!theme) {
    return <div style={{ visibility: 'hidden' }}>
      {children}
    </div>
  }

  const closeSubscriptionPopup = () => {
    localStorage.setItem(keys.signToNews, "seen")
    setSubscribePopup(false)
  }

  const runningTextClick = () => runningLineSettings.link && window.open(runningLineSettings.link)

  return (
    <div
      id={"state-manager"}
      className={`state-manager ${theme}-theme ${sideNavigation ? "menu-left" : "menu-top"} ${runningLineSettings.active ? "running-text-shown" : ""}`}>
      {runningLineSettings.active && (
        <div onClick={runningTextClick} className={"running-text-wrapper"}>
          <Marquee speed={40} gradient={false}>
            {runningLineSettings.text}
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
