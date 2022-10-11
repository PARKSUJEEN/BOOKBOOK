import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookStateContext } from "../App";
import BookEditor from "../components/BookEditor";
import useModal from "./useModal";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();

  const bookdata = useContext(BookStateContext);

  const { id } = useParams();

  useEffect(() => {
    if (bookdata.data.length >= 1) {
      const targetDiary = bookdata.data.find((it) => it.id === id);
      console.log("targetDiary", targetDiary);
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id, bookdata]);

  return (
    <div>
      <div>
        {/* {id} 페이지 ~ .. */}
        {originData && (
          <BookEditor isEdit={true} originData={originData} testid={id} />
        )}
      </div>
    </div>
  );
};

export default Edit;
