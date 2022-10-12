import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../App";
import BookSearch from "../pages/BookSearch";
import Loading from "../pages/Loading";
import BookItem from "./BookItem";

const BookList = ({ onRemove, onEdit, bookdata, searchBook }) => {
  const [findBook, setFindBook] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("BOOKLIST, findBook", searchBook);
  console.log(bookdata);

  useEffect(() => {
    if (searchBook === undefined || searchBook === null) {
      setFindBook(bookdata);
      console.log("BOOKLIST, findBook2", findBook);
    }
  }, []);

  const [bookname, setBookname] = useState("");
  // const [inBook, setInBook] = useState([]);
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

  return (
    <div className="BookList">
      <div className="BookList_findBook">
        <div className="search">
          <input
            type="text"
            placeholder="검색"
            onChange={onChangeBookname}
          ></input>
        </div>
        <div>
          <button onClick={findingBook}>검색</button>
        </div>
      </div>
      {loading ? <Loading /> : null}
      <div>{/* <h2>BOOK LIST {originBookData.length}</h2> */}</div>
      <div className="booklist_wrapper">
        {findBook.map((it) => (
          <div className="booklist_item" key={it.id}>
            <BookItem key={it.id} id={it.id} {...it} bookcolor={it.bookcolor} />
          </div>
        ))}
      </div>
    </div>
  );
};

BookList.defaultProps = {
  findBook: [],
};

export default React.memo(BookList);
