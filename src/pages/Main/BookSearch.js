import React, { useContext, useState } from "react";
import { BookStateContext } from "../../App";
import BookList from "../../components/BookList";

const BookSearch = () => {
  const [bookname, setBookname] = useState("");
  const [inBook, setInBook] = useState([]);
  const onChangeBookname = (e) => {
    setBookname(e.currentTarget.value);
  };
  const data = useContext(BookStateContext);
  const findBook = () => {
    const filteredBook = data.data.filter((it) => {
      return it.bookname.includes(bookname);
    });
    return setInBook(filteredBook);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="책이름을 입력하세요."
        onChange={onChangeBookname}
      ></input>
      <button onClick={findBook}>확인버튼</button>
      {inBook.map((it) => (
        <BookList key={it.id} id={it.id} searchBook={[it]} />
      ))}
    </div>
  );
};

export default React.memo(BookSearch);
