import React, { useContext, useEffect, useState } from "react";
import { BookDispatchContext, BookStateContext } from "../App";
import BookItem from "./BookItem";

const BookList = ({ onRemove, onEdit, bookdata }) => {
  const [isBookin, setIsBookin] = useState(true);
  useEffect(() => {
    const main = () => {
      if (bookdata.length > 1) {
        setIsBookin(true);
      } else {
        setIsBookin(false);
      }
    };
  }, []);
  return (
    <div className="BookList">
      {isBookin ? (
        <>
          <div>
            <h2>BOOK LIST {bookdata.length}</h2>
          </div>
          <div className="booklist_wrapper">
            {bookdata.map((it) => (
              <div className="booklist_item" key={it.id}>
                <BookItem
                  key={it.id}
                  id={it.id}
                  {...it}
                  bookcolor={it.bookcolor}
                  onRemove={onRemove}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        " 책이 하나도 없네용 .. 입력해주삼요!"
      )}
    </div>
  );
};

BookList.defaultProps = {
  bookdata: [],
};

export default React.memo(BookList);
