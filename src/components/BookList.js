import React, { useEffect, useState } from "react";
import Pagination from "../pages/Book/Pagination";
import BookItem from "./BookItem";

const BookList = ({ bookdata }) => {
  const [bookname, setBookname] = useState("");
  const [findBook, setFindBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  useEffect(() => {
    console.log(bookdata);
    if (bookdata) {
      setFindBook(bookdata);
    }
  }, [bookdata]);

  const onChangeBookname = (e) => {
    setBookname(e.currentTarget.value);
  };

  const findingBook = () => {
    const filteredBook = bookdata.filter((it) => {
      return it.bookname.includes(bookname);
    });
    setFindBook(filteredBook);
  };

  const sortDate = () => {
    const compare = (a, b) => parseInt(b.date) - parseInt(a.date);
    const sortedList = findBook.sort(compare);
    return sortedList;
  };

  return (
    <div className="BookList">
      <div className="BookList_findBook">
        <div className="search">
          <input
            type="text"
            placeholder="책 이름"
            onChange={onChangeBookname}
          ></input>
        </div>
        <div>
          <button onClick={findingBook}>검색</button>
        </div>
      </div>

      {findBook.length === 0 ? (
        <div className="booklist_wrapper">
          <p>찾으시는 책이 존재하지 않습니다.</p>
        </div>
      ) : (
        <>
          <div className="booklist_wrapper">
            {sortDate()
              .slice(offset, offset + limit)
              .map((it) => (
                <div className="booklist_item" key={it.id}>
                  <BookItem
                    key={it.id}
                    id={it.id}
                    {...it}
                    bookdate={it.date}
                    bookcolor={it.bookcolor}
                  />
                </div>
              ))}
          </div>

          {findBook.length > 9 ? (
            <div>
              <Pagination
                total={sortDate().length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

BookList.defaultProps = {
  findBook: [],
};

export default React.memo(BookList);
