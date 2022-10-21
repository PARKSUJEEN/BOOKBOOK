import React from "react";

const BookColorItem = ({ onClick, isSelected, cid }) => {
  return (
    <div
      onClick={() => {
        onClick(cid);
      }}
      className="bookColorItem"
    >
      <div className="bcolor">
        <input
          key={cid}
          className={`bcolor_${cid}`}
          type="radio"
          name="bookcolor"
        />
      </div>
    </div>
  );
};

export default BookColorItem;
