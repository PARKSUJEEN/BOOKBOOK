import React, { useContext, useEffect, useState } from "react";
import { BookDispatchContext, BookStateContext } from "../../App";
import Pagination from "../../pages/Book/Pagination";

import BookDiaryItem from "./BookDiaryItem";

const BookDiaryList = ({ bookid }) => {
  const [namedata, setNamedata] = useState("");
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const { onTitleGet } = useContext(BookDispatchContext);
  const initBookData = useContext(BookStateContext);

  const sortDate = () => {
    const compare = (a, b) => parseInt(b.bdiaryDate) - parseInt(a.bdiaryDate);
    const copyList = JSON.parse(JSON.stringify(initBookData.bddata));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  useEffect(() => {
    onTitleGet(bookid);
  }, []);

  return (
    <div className="BookDiaryList">
      <div className="BookDiaryList_wrap">
        {sortDate().map((it) => (
          <BookDiaryItem key={it.bdiaryId} id={it.id} bookid={bookid} {...it} />
        ))}
      </div>
      {initBookData.bddata.length > 9 ? (
        <Pagination
          total={sortDate().length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      ) : null}
    </div>
  );
};

BookDiaryList.defaultProps = {
  initBookData: [],
};

export default BookDiaryList;
