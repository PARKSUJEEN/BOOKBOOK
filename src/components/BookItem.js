import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookItem = ({ bookname, id, bookcolor, bookdate }) => {
  const navigate = useNavigate();

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
          <div>{strDate.slice(0, strDate.length - 11)} </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BookItem);
