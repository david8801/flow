import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import styles from "./styles.module.css";
import {Discord, Facebook, Instagram, Logo, Telegram, Twitter} from "../../icons/header";
import Switch from "../ui/Switch";
import Link from "next/link";
import SearchWrapper from "../SearchWrapper";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {getRunningTextShownSelector} from "../../store/main/selectors";

const HeaderContent = ({
                         sideNavigation,
                         theme,
                         toggleDarkMode,
                         toggleSideNavigation,
                         search,
                         setSearch,
                         submitSearch,
                         searchActive,
                         setSearchActive,
                         categories,
                         clearResults,
                         handleSubscribe
                       }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const lastWidth = useRef();
  const router = useRouter()
  const categorySlugs = useMemo(() => categories.map(i => i.slug), [categories])
  const runningTextShown = useSelector(getRunningTextShownSelector)

  console.log(router)
  useEffect(() => {
    const categorySlug = router.pathname === "/" ? 'home' : router.query?.id;
    const activeCategoryElem = document.getElementById(categorySlug);
    const categoryListElem = document.getElementById("categories");
    const searchElem = document.getElementsByClassName("active-search")?.[0];

    if (((categorySlugs.includes(categorySlug) || categorySlug === "home") && activeCategoryElem) || searchElem) {
      const position = (searchElem || activeCategoryElem).getBoundingClientRect()
      const activeCategoryPointerElem = document.getElementById("active-category-pointer")

      if (activeCategoryPointerElem) {
        activeCategoryPointerElem.style.transition = "all 0.3s ease 0s"
        activeCategoryPointerElem.style.left = (position.left + categoryListElem.scrollLeft - 80) + "px";
        activeCategoryPointerElem.style.width = (position.width) + "px";
      }
      setActiveCategory(
        searchElem
          ? {
            slug: "active-search",
            data: {
              color: "#B987F2"
            }
          }
          : categorySlug === "home"
            ? {
              slug: "home",
              data: {
                color: "#B987F2"
              }
            }
            : categories.find(i => i.slug === categorySlug))
    }
  }, [router, categorySlugs, searchActive])

  useEffect(() => {
    setTimeout(() => onResize(), 100)
    window.addEventListener("resize", () => onResize())
    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener("resize", () => onResize())
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const onScroll = () => {
    const initialOffsetTop = 100 + (runningTextShown ? 45 : 0);
    const header = document.getElementById("categories-wrapper"),
      stateManager = document.getElementById("state-manager"),
      offsetTop = header?.offsetTop;

    console.log(offsetTop)

    if (initialOffsetTop !== offsetTop) {
      stateManager.classList.add("categories-sticky")
    } else {
      stateManager.classList.remove("categories-sticky")
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [router])

  const onResize = (e) => {
    const newWidth = e && e[0].contentRect.width;
    const activeCategoryElem = document.getElementsByClassName("active-category")?.[0];
    const categoryListElem = document.getElementById("categories");
    const searchElem = document.getElementsByClassName("active-search")?.[0];
    const activeCategoryPointerElem = document.getElementById("active-category-pointer")

    if (activeCategoryElem || searchElem) {
      const position = (searchElem || activeCategoryElem).getBoundingClientRect()

      if (activeCategoryPointerElem) {
        document.getElementById("categories").scrollLeft = 10000

        if (e && lastWidth.current !== newWidth) {
          activeCategoryPointerElem.style.transition = "none"
        } else {
          activeCategoryPointerElem.style.transition = "all 0.3s ease 0s"
        }
        activeCategoryPointerElem.style.left = (position.left + categoryListElem.scrollLeft - 80) + "px";
        activeCategoryPointerElem.style.width = (position.width) + "px";
        if (e) {
          lastWidth.current = newWidth
        }
      }
    } else {
      if (activeCategoryPointerElem) {
        activeCategoryPointerElem.style.width = '0px'
      }
    }
  }

  useEffect(() => {
    if (activeCategory) {
      const searchElem = document.getElementById("search-form")

      // TODO: new IntersectionObserver to determine if element is currently visible on screen
      const resizeObserver = new ResizeObserver(onResize);

      resizeObserver.observe(searchElem);
      return () => {
        resizeObserver.unobserve(searchElem)
      }
    }
  }, [activeCategory])

  const handleCategoryClick = (route) => {
    setSearchActive(false)
    router.push(route)
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.media}>
            <Telegram/>
            <Facebook/>
            <Twitter/>
            <Discord/>
            <Instagram/>
          </div>
          <Link href={"/"}>
            <Logo height={72}/>
          </Link>
          <div className={styles.actions}>
            <div className={styles.switches}>
              <Switch
                checked={sideNavigation}
                onChange={toggleSideNavigation}
                label={"side navigation"}/>
              <Switch
                checked={theme === "dark"}
                onChange={toggleDarkMode}
                label={"dark mode"}
              />
            </div>
            <button onClick={handleSubscribe}>
              click to not loose our news
            </button>
          </div>
        </div>
      </div>
      <div id={"categories-wrapper"} className={`${styles.categoriesWrapper} categories-wrapper`}>
        <div id={"categories"} className={styles.categories}>
          {activeCategory && (
            <div
              id={"active-category-pointer"}
              style={{
                backgroundColor: activeCategory.data.color
              }}
              className={styles.activeCategoryPointer}
            />
          )}
          <Link href={"/"}>
            <span
              className={activeCategory?.slug === "home" ? "active-category" : ""}
              style={{ color: "#B987F2" }}
              id={"home"}
            >
              home
            </span>
          </Link>
          {categories.map(i => (
            <span
              id={i.slug}
              onClick={() => handleCategoryClick("/category/" + i.slug)}
              className={activeCategory?.slug === i.slug ? "active-category" : ""}
              style={{ color: i.data.color }}
            >
                {i.data.name}
              </span>
          ))}
          <SearchWrapper
            onChange={setSearch}
            submitSearch={submitSearch}
            value={search}
            active={searchActive}
            setActive={setSearchActive}
            clearResults={clearResults}
          />
        </div>
      </div>
    </>
  );
};

export default HeaderContent;
