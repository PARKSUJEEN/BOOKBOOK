import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import MyHeader from "../../components/MyHeader";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="Main">
      <div className="main_wrap">
        <MyHeader leftChild={<MyButton />} />
        <div className="maininfo_wrap">
          <div className="clova">
            <p>πππ</p>
          </div>
          <div className="clova_bookbook">
            <div className="text" id="text">
              BOOK BOOK
            </div>
          </div>

          <div className="clova_login">
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              λ‘κ·ΈμΈ
            </button>
          </div>
          <span> λ°μ΄ν°λ λͺ¨λ firebase DBμ μ μ₯λ©λλ€. </span>
        </div>
      </div>
    </div>
  );
};

export default Main;
