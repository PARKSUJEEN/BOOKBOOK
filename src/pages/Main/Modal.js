import React from "react";
import "./Modal.css";

const Modal = ({ modalOption }) => {
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
            <div className="contents">{modalOption?.element}</div>
          </section>
        </div>
      )}
    </>
  );
};

export default Modal;
