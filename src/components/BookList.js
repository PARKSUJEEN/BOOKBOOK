import React, { useContext, useEffect, useState } from "react";
import { BookStateContext } from "../App";
import Pagination from "../pages/Book/Pagination";
import Loading from "../pages/Main/Loading";
import NullPage from "../pages/Main/NullPage";
import BookItem from "./BookItem";

const BookList = ({ onRemove, onEdit, bookdata, searchBook }) => {
  const [bookname, setBookname] = useState("");
  const [findBook, setFindBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  useEffect(() => {
    if (searchBook === undefined || searchBook === null) {
      return setFindBook(bookdata);
    }
  }, [bookdata]);

  const onChangeBookname = (e) => {
    setBookname(e.currentTarget.value);
  };

  const data = useContext(BookStateContext);

  const findingBook = () => {
    const filteredBook = data.data.filter((it) => {
      return it.bookname.includes(bookname);
    });

    return setFindBook(filteredBook);
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
            placeholder="책이름"
            onChange={onChangeBookname}
          ></input>
        </div>
        <div>
          <button onClick={findingBook}>검색</button>
        </div>
      </div>
      {loading ? <Loading /> : null}

      {findBook.length === 0 ? (
        <div className="booklist_wrapper">
          <p>찾으시는책이 존재하지 않습니다.</p>
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
