import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../../App";

const BookDiaryItem = ({
  bdiaryTitle,
  bdiaryContent,
  bdiaryDate,
  id,
  testid,
}) => {
  const navigate = useNavigate();

  const goDetail = () => {
    console.log("testid확인", testid);
    console.log("godetail id확인", id);

    navigate(`/diary/${testid}/${id}/read`);
  };

  return (
    <div className="BookDiaryItem">
      <div className="BookDiaryItem_wrap" onClick={goDetail}>
        <div className="title">
          <span>"</span>
          {`${bdiaryTitle}`}
          <span>"</span>
        </div>
        <div className="date">{`${bdiaryDate}`.replace(/-/gi, ".")}</div>
        <div className="content">{`${bdiaryContent}`.slice(0, 50)} ...</div>
      </div>
    </div>
  );
};

export default BookDiaryItem;
