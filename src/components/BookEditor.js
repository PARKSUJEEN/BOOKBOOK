import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookDispatchContext, userContext } from "../App";

import { colorList } from "../util/colorlist";
import { getStringDateTime } from "../util/date";
import BookColorItem from "./BookColorItem";

const BookEditor = ({ isEdit, originData, onClose }) => {
  const { onCreate, onEdit } = useContext(BookDispatchContext);

  const [bookname, setBookname] = useState("");
  const [bookColor, setBookColor] = useState(3);
  const [bookdate, setBookdate] = useState(getStringDateTime(new Date()));
  const userData = useContext(userContext);
  const navigate = useNavigate();

  const handleChangeBook = (e) => {
    setBookname(e.target.value);
  };

  const onChangeBookC = (id) => {
    setBookColor(id);
  };

  const handleSubmit = () => {
    if (
      window.confirm(
        isEdit ? "책을 수정하시겠습니까?" : "새 책을 추가하시겠습니까?"
      )
    ) {
      if (bookname.length < 1) {
        alert("제목을 입력해주세요");
        return;
      }
      if (!isEdit) {
        onCreate(bookname, bookColor, bookdate);
        onClose();
      } else {
        onEdit(originData.id, bookname, bookColor);
        navigate(-1, { replace: true });
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setBookname(originData.bookname);
      setBookColor(originData.bookcolor);
    } else {
    }
  }, [isEdit, originData]);

  return (
    <div className="BookEditor">
      <div>
        <section>
          <div>
            <h3>닉네임</h3>
            <input readOnly value={userData.udata.name} />
            <p
              onClick={() => {
                window.location.href = "./name";
              }}
            >
              변경을 하고싶다면 여기를 클릭
            </p>
          </div>
          <div className="input_box bookname">
            <h3>책의 이름</h3>
            <input
              value={bookname}
              onChange={(e) => {
                setBookname(e.target.value);
              }}
            />
          </div>
        </section>

        <section>
          <h3>책 색상</h3>
          <div className="input_box color_list_wrap">
            {colorList.map((it) => (
              <div className="color_btn" key={it.cid}>
                <BookColorItem
                  key={it.cid}
                  {...it}
                  onClick={onChangeBookC}
                  isSelected={it.id === bookColor}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="BookEditor_btn">
        {isEdit ? (
          <>
            <button onClick={handleSubmit}>책 수정하기</button>
          </>
        ) : (
          <>
            <button onClick={handleSubmit}>책 추가</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookEditor;
