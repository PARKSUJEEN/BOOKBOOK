import React from "react";
import { useNavigate } from "react-router-dom";
import BookDiaryEditor from "../components/BookDiary/BookDiaryEditor";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const BookNew = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div>
          <MyHeader
            leftChild={
              <MyButton
                text={
                  <span className="material-symbols-outlined">
                    arrow_back_ios
                  </span>
                }
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
            headText={"NEW BOOK DIARY"}
          />
        </div>
        <div>
          <BookDiaryEditor />
        </div>
      </div>
    </div>
  );
};

export default BookNew;
