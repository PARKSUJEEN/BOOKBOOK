import React from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../components/MyHeader";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="Main">
      <div className="main_wrap">
        <MyHeader />
        <div className="maininfo_wrap">
          <div className="clova">
            <p>🍀🍀🍀</p>
          </div>
          <div className="clova_bookbook">
            <div className="text" id="text">
              BOOK BOOK
            </div>
          </div>

          <div
            className="clova_login"
            onClick={() => {
              navigate("/login");
            }}
          >
            <button>로그인</button>
          </div>
          <span> 데이터는 모두 firebase DB에 저장됩니다. </span>
        </div>
      </div>
    </div>
  );
};

export default Main;
