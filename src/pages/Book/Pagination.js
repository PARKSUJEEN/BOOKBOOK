import React from "react";

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <div className="Pagination">
      <div className="Pagination_wrap">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <span>처음</span>
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          끝
        </button>
      </div>
    </div>
  );
};

export default Pagination;
