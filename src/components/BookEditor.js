import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookDispatchContext, userContext } from "../App";
import Home from "../pages/Home";
import ModalTest from "../pages/ModalTest";
import New from "../pages/New";
import useModal from "../pages/useModal";

import { colorList } from "../util/colorlist";
import BookColorItem from "./BookColorItem";

const BookEditor = ({ isEdit, originData, onClose }) => {
  const { onCreate, onEdit } = useContext(BookDispatchContext);

  const [bookname, setBookname] = useState("");
  const [bookColor, setBookColor] = useState(3);
  const [bookdate, setBookdate] = useState(new Date());
  const userData = useContext(userContext);
  const navigate = useNavigate();

  const handleChangeBook = (e) => {
    setBookname(e.target.value);
  };

  const onChangeBookC = (id) => {
    setBookColor(id);
    console.log(id);
  };

  const handleSubmit = () => {
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(bookname, bookColor, bookdate);
        onClose();

        console.log("생성됨~");
      } else {
        onEdit(originData.id, bookname, bookColor);
        navigate(-1);
      }
    }

    alert("저장성공!");
  };

  useEffect(() => {
    if (isEdit) {
      setBookname(originData.bookname);
    } else {
    }
  }, [isEdit, originData]);

  return (
    <div className="BookEditor">
      <div>
        {/* <>{isEdit ? "수정하기" : "새 책장추가하기"}</> */}
        <section>
          <div>
            <h3>닉네임</h3>
            <input readOnly value={userData.udata.name} />
            <p>변경을하고싶다면 여기를 클릭</p>
          </div>
          <div className="input_box bookname">
            <h3>새 책의 이름</h3>
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
            <button onClick={handleSubmit}>수정하기</button>
          </>
        ) : (
          <>
            <button onClick={handleSubmit}>책장추가</button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookEditor;
