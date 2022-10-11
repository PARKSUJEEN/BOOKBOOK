import React, { useCallback, useContext } from "react";

import BookList from "../components/BookList";

import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

import { BookStateContext, userContext } from "../App";
import useModal from "./useModal";

import ModalTest from "./ModalTest";

import New from "./New";
import Setting from "./Setting";

const Home = () => {
  const { data } = useContext(BookStateContext);

  const [modalOption, showModal] = useModal();

  const onModal = useCallback(() => {
    showModal(
      true,
      "테스트",
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
      "setting",
      () => console.log("모달 on"),
      null,
      <Setting
        onClose={() => {
          modalOption.onClose();
        }}
      />
    );
  }, [modalOption]);

  const udata = useContext(userContext);
  const userData = useContext(userContext);

  console.log("udata", udata.udata.name);
  console.log("userdata", userData);

  return (
    <div>
      <MyHeader
        leftChild={
          <MyButton
            text={<span class="material-symbols-outlined">settings</span>}
            onClick={onMenu}
          />
        }
        headText={`${udata.udata.name}의 책장`}
        rightChild={
          <MyButton
            text={<span class="material-symbols-outlined">add_box</span>}
            onClick={onModal}
          />
        }
      />

      <ModalTest modalOption={modalOption} />

      <BookList bookdata={data} />
    </div>
  );
};

export default React.memo(Home);
