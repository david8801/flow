import {createSelector} from "@reduxjs/toolkit";

const getTheme = state => state.main.theme;
export const getThemeSelector = createSelector(getTheme, state => state);

const getSideNavigation = state => state.main.sideNavigation;
export const getSideNavigationSelector = createSelector(getSideNavigation, state => state)

const getRunningTextShown = state => state.main.runningTextShown;
export const getRunningTextShownSelector = createSelector(getRunningTextShown, state => state)
