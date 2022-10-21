import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../App";
import BookDiaryEditor from "../components/BookDiary/BookDiaryEditor";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const BookEdit = () => {
  const [originData, setOriginData] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  const { key } = useParams();

  const { onTitleGet } = useContext(BookDispatchContext);

  const initBookData = useContext(BookStateContext);

  useEffect(() => {
    onTitleGet(id);
  }, []);

  useEffect(() => {
    if (initBookData.bddata.length >= 1) {
      const targetDiary = initBookData.bddata.find((it) => it.id === key);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate(-1, { replace: true });
      }
    }
  }, [id, initBookData.bddata]);

  return (
    <div>
      <div>
        <MyHeader
          leftChild={
            <MyButton
              onClick={() => {
                navigate(-1);
              }}
              text={
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              }
            />
          }
          headText={"NEW BOOK"}
        />
      </div>
      {originData && (
        <BookDiaryEditor testid={id} isEdit={true} originData={originData} />
      )}
    </div>
  );
};

export default BookEdit;
