import React from 'react';
import styles from './styles.module.css'
import ArticleRow from "../ArticleRow";
import {ArrowRightIcon} from "../../icons/shared";
import {useRouter} from "next/router";

const SearchResults = ({ posts, searchValue, onClose }) => {
  const router = useRouter()
  const viewResults = () => {
    router.push("/search?value=" + searchValue)
    onClose()
  }

  return (
    <div className={styles.searchResults}>
      {posts
        .slice(0, 3)
        .map((i, idx) => (
          <ArticleRow
            key={idx}
            slug={i.slug}
            data={i.data}
            titleRender={title => <span dangerouslySetInnerHTML={{__html: title.replaceAll(searchValue, `<b>${searchValue}</b>`)}}></span>}
          />
        ))}
      <button onClick={viewResults} className={styles.viewResults}>
        <ArrowRightIcon/> view results
      </button>
    </div>
  );
};

export default SearchResults;
