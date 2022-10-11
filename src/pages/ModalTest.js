import React, { useState } from "react";
import Edit from "./Edit";
import "./ModalTest.css";

const ModalTest = ({ modalOption }) => {
  return (
    <>
      {modalOption?.show && (
        <div className="wrapper">
          <div
            className="background"
            onClick={() => modalOption.onClose()}
          ></div>
          <section>
            <header>
              <h2>{modalOption?.title}</h2>
              <button className="close" onClick={() => modalOption.onClose()}>
                &times;
              </button>
            </header>
            {modalOption?.element}

            {/* <div className="buttonbox">
              <button onClick={() => modalOption.onSubmit()}>확인</button>
              <button onClick={() => modalOption.onClose()}>닫기</button>
            </div> */}
          </section>
        </div>
      )}
    </>
  );
};

export default ModalTest;
