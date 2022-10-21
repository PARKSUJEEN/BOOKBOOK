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
    navigate(`/diary/${testid}/${id}/read`);
  };

  const strDate = new Date(parseInt(bdiaryDate)).toLocaleString().slice(0, 21);

  return (
    <div className="BookDiaryItem">
      <div className="BookDiaryItem_wrap" onClick={goDetail}>
        <div className="title">
          <span>"</span>
          {`${bdiaryTitle}`.slice(0, 20)}
          <span> "</span>
        </div>
        <div className="date">{`${strDate}`.replace(/-/gi, ".")}</div>
        <div className="content">{`${bdiaryContent}`.slice(0, 50)}</div>
      </div>
    </div>
  );
};

export default BookDiaryItem;
