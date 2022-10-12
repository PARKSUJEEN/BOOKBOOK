import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../App";
import BookDiaryList from "../components/BookDiary/BookDiaryList";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import Edit from "./Edit";
import Loading from "./Loading";
import ModalTest from "./ModalTest";
import useModal from "./useModal";

const BookDiary = () => {
  const [bname, setBname] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { onRemove } = useContext(BookDispatchContext);
  const initData = useContext(BookStateContext);

  const [modalOption, showModal] = useModal();
  const [loading, setLoading] = useState(true);

  const onClick = useCallback(() => {
    showModal(
      true,
      "책이름 수정하기",
      () => console.log("모달 on"),
      null,
      <Edit />
    );
  }, [modalOption]);

  useEffect(() => {
    console.log("id>>>", id);
    const targetName = initData.data.find((it) => it.id === id);
    console.log("targetname", targetName);
    if (targetName) {
      setBname(targetName);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [id, initData.data]);

  return (
    <div className="Bookdiary">
      {loading ? <Loading /> : null}
      <div>
        <MyHeader
          leftChild={
            <MyButton
              onClick={() => {
                navigate("/", { replace: true });
              }}
              text={
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              }
            />
          }
          headText={loading ? "" : `${bname.bookname}`}
        />
      </div>

      <div className="BookDiary_wrap">
        {/* <div className="BookDiary_img">사진페이지</div> */}
        <div className="BookDiary_btn">
          <button
            onClick={() => {
              if (window.confirm(`${id}번째 일기를 삭제할끼니?`)) {
                onRemove(id);
                console.log(id);
                navigate("/");
              }
            }}
          >
            책장 삭제하기
          </button>
          <button
            onClick={() => {
              if (id) {
                onClick(id);
              }
            }}
          >
            책장 수정하기
          </button>
        </div>
        <ModalTest modalOption={modalOption} />

        <div className="BookDiary_new_btn">
          <button
            onClick={() => {
              navigate(`/diary/${id}/new`);
            }}
          >
            기록하기
          </button>
        </div>
        <div className="BookDiary_list">
          <div>
            <BookDiaryList testid={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDiary;
