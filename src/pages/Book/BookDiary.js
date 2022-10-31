import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BookDispatchContext, BookStateContext } from "../../App";
import BookDiaryList from "../../components/BookDiary/BookDiaryList";
import MyButton from "../../components/MyButton";
import MyHeader from "../../components/MyHeader";
import Edit from "./Edit";
import Loading from "../Main/Loading";
import Modal from "../Main/Modal";
import NullPage from "../Main/NullPage";
import useModal from "../Main/useModal";

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
      "책 수정하기",
      () => console.log("모달 on"),
      null,
      <Edit />
    );
  }, [modalOption]);

  useEffect(() => {
    const targetName = initData.data.find((it) => it.id === id);
    if (targetName) {
      setBname(targetName);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [id, initData.data]);

  return (
    <div className="Bookdiary">
      {/* {loading ? <Loading /> : null} */}
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
          headText={loading ? "" : `${bname.bookname}`.slice(0, 19)}
        />
      </div>

      <div className="BookDiary_wrap">
        {initData.bddata.length > 1 ? null : <NullPage />}
        <div className="BookDiary_btn">
          <button
            onClick={() => {
              if (window.confirm(`책을 정말 삭제하실건가요?`)) {
                onRemove(id);
                navigate("/");
              }
            }}
          >
            Del
          </button>
          <button
            onClick={() => {
              if (id) {
                onClick(id);
              }
            }}
          >
            Edit
          </button>
        </div>
        <Modal modalOption={modalOption} />

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
          <div>{loading ? <Loading /> : <BookDiaryList bookid={id} />}</div>
        </div>
      </div>
    </div>
  );
};

export default BookDiary;
