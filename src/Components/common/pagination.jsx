import React from "react";

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;
  console.log(itemsCount);
  console.log(pageSize);
  const pageCount = itemsCount / pageSize;
  console.log("PageCount" + Math.ceil(pageCount));
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="/#">
            1
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
