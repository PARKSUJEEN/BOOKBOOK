import React, { useContext, useEffect, useState } from "react";
import { BookDispatchContext, BookStateContext } from "../../App";

import BookDiaryItem from "./BookDiaryItem";

const BookDiaryList = ({ testid }) => {
  const [namedata, setNamedata] = useState("");
  const { onTitleGet } = useContext(BookDispatchContext);
  const initBookData = useContext(BookStateContext);

  useEffect(() => {
    onTitleGet(testid);
  }, []);

  return (
    <div className="BookDiaryList">
      <div className="BookDiaryList_wrap">
        {initBookData.bddata.map((it) => (
          <BookDiaryItem key={it.id} id={it.id} testid={testid} {...it} />
        ))}
      </div>
    </div>
  );
};

BookDiaryList.defaultProps = {
  initBookData: [],
};

export default BookDiaryList;
