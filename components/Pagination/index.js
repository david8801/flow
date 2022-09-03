import React from 'react';
import classnames from 'classnames';
import {usePagination, DOTS} from '../../hooks/usePagination';

const Pagination = ({
                      onPageChange,
                      totalCount,
                      siblingCount = 1,
                      currentPage,
                      pageSize = 10,
                      className,
                      offset,
                      setOffset
                    }) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <div className="pages">
        {paginationRange.map(pageNumber => {

          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              className={classnames('pagination-item', {
                selected: pageNumber === currentPage
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </div>
      <span
        onClick={() => {
          if (currentPage !== lastPage) {
            setOffset(offset + 10)
            onPageChange(currentPage + 1)
          }
        }}
        className={classnames("show-more", { disabled: currentPage === lastPage })}
      >
        show more
      </span>
      <div className="pagination-actions">
        <li
          className={classnames('pagination-item', {
            disabled: currentPage === 1
          })}
          onClick={onPrevious}
        >
          previous
        </li>
        <li
          className={classnames('pagination-item', {
            disabled: currentPage === lastPage
          })}
          onClick={onNext}
        >
          next
        </li>
      </div>
    </ul>
  );
};

export default Pagination;
