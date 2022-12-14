import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookDispatchContext, BookStateContext, userContext } from "../../App";
import MyButton from "../../components/MyButton";
import MyHeader from "../../components/MyHeader";

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
      if (it.bdiaryId === key) {
        setBookDiaryData({
          key: it.bdiaryId,
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

  const strDate = new Date(bookDiaryData.date).toLocaleString();

  return (
    <div className="BookContent">
      <MyHeader
        headText={`${bookName}`}
        leftChild={
          <MyButton
            text={
              <span className="material-symbols-outlined">arrow_back_ios</span>
            }
            onClick={() => {
              navigate(-1, { raplace: true });
            }}
          />
        }
      />
      <div className="BookContent_wrap">
        <div className="bookname">{bookName}</div>

        <div className="title">{bookDiaryData.title}</div>
        <div className="userName">{udata.udata.name}</div>
        <div className="date">{strDate.slice(0, strDate.length - 3)}</div>
        <div className="content">{bookDiaryData.content}</div>

        <div className="btn">
          <button
            onClick={() => {
              navigate(`/diary/${id}/${key}/edit`);
            }}
          >
            ????????????
          </button>
          <button
            onClick={() => {
              if (window.confirm("?????? ????????? ??????????????????????")) {
                onTitleRemove(id, key);
                navigate(-1, { replace: true });
              }
            }}
          >
            ????????????
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookContent;
