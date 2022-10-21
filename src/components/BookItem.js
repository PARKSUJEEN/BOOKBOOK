import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../App";

const BookItem = ({ bookname, id, bookcolor, bookdate }) => {
  const navigate = useNavigate();
  const { onRemove } = useContext(BookDispatchContext);

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const strDate = new Date(bookdate).toLocaleString();

  return (
    <div className="BookItem">
      <div className="BookItem_wrap">
        <div
          className={["BookItem_real", `BookItem_real_${bookcolor}`].join(" ")}
          onClick={goDetail}
        >
          <div className="info">
            <span>{bookname}</span>
          </div>
          <button
            onClick={() => {
              onRemove(id);
            }}
          >
            삭제
          </button>
          {/* <div>마지막 기록일 : {strDate} </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
