import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookDispatchContext } from "../App";

const BookItem = ({ bookname, id, isEdit, bookcolor }) => {
  const navigate = useNavigate();
  const { onRemove } = useContext(BookDispatchContext);

  const goDetail = () => {
    navigate(`/diary/${id}`);
    console.log("godetail id값", id, "bookcolor", bookcolor);
  };

  return (
    <div className="BookItem">
      <div className="BookItem_wrap">
        <div
          className={["BookItem_real", `BookItem_real_${bookcolor}`].join(" ")}
        >
          <div className="info" onClick={goDetail}>
            <span>{bookname}</span>
          </div>
          {/* <button
            onClick={() => {
              onRemove(id);
            }}
          >
            삭제
          </button> */}
          {/* <div>마지막 기록일</div> */}
        </div>
      </div>
    </div>
  );
};

export default BookItem;
