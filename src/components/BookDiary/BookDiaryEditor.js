import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookDispatchContext } from "../../App";
import { getStringDate, getStringDateTime } from "../../util/date";

const BookDiaryEditor = ({ isEdit, originData }) => {
  const [bdiaryTitle, setBdiaryTitle] = useState("");
  const [bdiaryContent, setBdiaryContent] = useState("");
  const [bdiaryDate, setBdiaryDate] = useState(getStringDate(new Date()));
  const { id } = useParams();

  const navigate = useNavigate();
  const { onTitleCreate, onTitleEdit } = useContext(BookDispatchContext);

  const onTitleChange = (e) => {
    setBdiaryTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setBdiaryContent(e.target.value);
  };

  const bdiaryId = Math.random().toString(36).substring(2, 7);

  const onhandleSubmit = () => {
    if (!isEdit) {
      if (bdiaryTitle.length < 1) {
        alert("제목을 입력해주세요");
        return;
      }

      if (bdiaryContent.length < 1) {
        alert("내용을 입력해주세요");
        return;
      }

      setBdiaryDate(getStringDateTime(new Date()));

      onTitleCreate(bdiaryTitle, bdiaryContent, bdiaryDate, bdiaryId, id);
      navigate(-1, { replace: true });
    } else {
      onTitleEdit(originData.id, bdiaryTitle, bdiaryContent, bdiaryDate, id);
      navigate(-1, { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setBdiaryTitle(originData.bdiaryTitle);
      setBdiaryContent(originData.bdiaryContent);
    } else {
    }
  }, [isEdit, originData]);

  return (
    <div className="BookDiaryEdit">
      <div className="BookDiaryEdit_wrap">
        <div className="inputdate_wrap">
          <input
            className="input_date"
            value={bdiaryDate}
            onChange={(e) => setBdiaryDate(e.target.value)}
            type="date"
          />
        </div>
        <div className="inputtitle_wrap">
          <input
            type="text"
            className="input_title"
            value={bdiaryTitle}
            onChange={onTitleChange}
            placeholder={"오늘의 기록 제목"}
          />
        </div>
        <div className="textareacontent_wrap">
          <textarea
            className="input_content"
            value={bdiaryContent}
            onChange={onContentChange}
            placeholder={"오늘의 기록 내용"}
          />
        </div>
        <div className="btn">
          {isEdit ? (
            <>
              <button onClick={onhandleSubmit}>수정하기</button>
              <button
                onClick={() => {
                  navigate(-1, { replace: true });
                }}
              >
                취소하기
              </button>
            </>
          ) : (
            <>
              <button onClick={onhandleSubmit}>저장하기</button>
              <button
                onClick={() => {
                  navigate(-1, { replace: true });
                }}
              >
                취소하기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDiaryEditor;
