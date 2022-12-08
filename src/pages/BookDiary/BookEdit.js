import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../../App";
import BookDiaryEditor from "../../components/BookDiary/BookDiaryEditor";
import MyButton from "../../components/MyButton";
import MyHeader from "../../components/MyHeader";

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
      const targetDiary = initBookData.bddata.find((it) => it.bdiaryId === key);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate(-1, { replace: true });
      }
    }
  }, [id, initBookData.bddata.length]);

  return (
    <div>
      <div>
        <MyHeader
          leftChild={
            <MyButton
              onClick={() => {
                navigate(-1, { replace: true });
              }}
              text={
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              }
            />
          }
          // headText={`${originData.bookname}`}
          headText={""}
        />
      </div>
      {originData && (
        <BookDiaryEditor bookid={id} isEdit={true} originData={originData} />
      )}
    </div>
  );
};

export default BookEdit;
