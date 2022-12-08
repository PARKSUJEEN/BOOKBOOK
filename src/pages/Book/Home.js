import React, { useCallback, useContext, useEffect, useState } from "react";

import BookList from "../../components/BookList";

import MyButton from "../../components/MyButton";
import MyHeader from "../../components/MyHeader";

import { BookStateContext, userContext } from "../../App";
import useModal from "../Main/useModal";

import Modal from "../Main/Modal";

import New from "./New";
import Setting from "../Main/Setting";

const Home = () => {
  const { data } = useContext(BookStateContext);
  const [modalOption, showModal] = useModal();

  const onModal = useCallback(() => {
    showModal(
      true,
      "책 추가",
      () => console.log("모달 on"),
      null,
      <New
        onClose={() => {
          modalOption.onClose();
        }}
      />
    );
  }, [modalOption]);

  const onMenu = useCallback(() => {
    showModal(
      true,
      "설정",
      () => console.log("모달 on"),
      null,

      <Setting
        data={data}
        onClose={() => {
          modalOption.onClose();
        }}
      />
    );
  }, [modalOption]);

  const udata = useContext(userContext);
  const bdata = useContext(BookStateContext);

  return (
    <div>
      <MyHeader
        leftChild={
          <MyButton
            text={<span className="material-symbols-outlined">settings</span>}
            onClick={onMenu}
          />
        }
        headText={`${udata.udata.name}의 책장 [${bdata.data.length}]`}
        rightChild={
          <MyButton
            text={<span className="material-symbols-outlined">add_box</span>}
            onClick={onModal}
          />
        }
      />
      {/* <BookSearch /> */}
      <Modal modalOption={modalOption} />

      <BookList bookdata={data} />
    </div>
  );
};

export default React.memo(Home);
