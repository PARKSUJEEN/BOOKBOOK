import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookDispatchContext, BookStateContext, userContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import Loading from "./Loading";

const BookContent = () => {
  const [bookDiaryData, setBookDiaryData] = useState([]);
  const [bookName, setBookName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { key } = useParams();
  const { onTitleGet, onTitleRemove } = useContext(BookDispatchContext);
  const initBookData = useContext(BookStateContext);

  const udata = useContext(userContext);

  useEffect(() => {
    onTitleGet(id);
  }, []);

  const bdata = () => {
    initBookData.bddata.map((it) => {
      if (it.id === key) {
        setBookDiaryData({
          key: it.id,
          title: it.bdiaryTitle,
          content: it.bdiaryContent,
          date: it.bdiaryDate,
        });
      }
    });

    initBookData.data.map((it) => {
      if (it.id === id) {
        setBookName(it.bookname);
      }
    });
  };

  useEffect(() => {
    bdata();
  }, [id, initBookData.bddata]);
  const strDate = new Date(parseInt(bookDiaryData.date))
    .toLocaleString()
    .slice(0, 21);

  return (
    <div className="BookContent">
      <MyHeader
        headText={`${bookName}`}
        leftChild={
          <MyButton
            text="<"
            onClick={() => {
              navigate(-1, { raplace: true });
            }}
          />
        }
      />
      <div className="BookContent_wrap">
        <div className="bookname">{`${bookName}`}</div>

        <div className="title">{`${bookDiaryData.title}`.slice(0, 40)}</div>
        <div className="userName">{udata.udata.name}</div>
        <div className="date">{strDate}</div>
        <div className="content">{bookDiaryData.content}</div>

        <div className="btn">
          <button
            onClick={() => {
              navigate(`/diary/${id}/${key}/edit`);
            }}
          >
            수정하기
          </button>
          <button
            onClick={() => {
              if (window.confirm("정말 기록을 삭제하실건가요?")) {
                onTitleRemove(id, key);
                navigate(-1, { replace: true });
              }
            }}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookContent;
