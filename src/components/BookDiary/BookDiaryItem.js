import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../../App";

const BookDiaryItem = ({
  bdiaryTitle,
  bdiaryContent,
  bdiaryDate,
  bdiaryId,
  id,
  bookid,
}) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${bookid}/${bdiaryId}/read`);
  };

  const strDate = new Date(parseInt(bdiaryDate)).toLocaleString().slice(0, 21);

  return (
    <div className="BookDiaryItem">
      <div className="BookDiaryItem_wrap" onClick={goDetail}>
        <div className="title">
          <h3> {`${bdiaryTitle}`}</h3>
        </div>
        <div className="date">{`${strDate}`.padStart(2, "0")}</div>
        <div className="content">{`${bdiaryContent}`}</div>
      </div>
    </div>
  );
};

export default BookDiaryItem;
