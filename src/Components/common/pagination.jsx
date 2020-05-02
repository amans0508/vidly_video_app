import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;
  console.log(itemsCount);
  console.log(pageSize);
  const pagesCount = itemsCount / pageSize;
  console.log("PageCount1" + pagesCount);
  const pages = _.range(1, pagesCount + 1);
  console.log("array of pages" + pages);
  console.log("PageCount" + Math.ceil(pagesCount));
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <a className="page-link" href="/#">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
