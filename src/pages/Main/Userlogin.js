import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/MyButton";
import MyHeader from "../../components/MyHeader";

const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email.length < 1) {
      emailInput.current.focus();

      return alert("이메일을 입력해주세요");
    }

    if (password.length < 1) {
      passwordInput.current.focus();

      return alert("비밀번호를 입력해주세요");
    }

    login();
  };

  const login = async () => {
    try {
      const auth = getAuth();

      const { user } = await signInWithEmailAndPassword(auth, email, password);

      navigate("/", { replace: true });
    } catch (error) {
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        alert("비밀번호를 재확인해주세요");
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        alert("email을 찾을 수 없습니다.");
        setPassword("");
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        alert("잘못된 형식의 이메일입니다. 재입력 해주세요.");
      } else {
        alert(error);
      }
    }
  };

  const onEmailhandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordhandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div className="Userlogin">
      <div>
        <MyHeader
          headText={"로그인"}
          leftChild={
            <MyButton
              text={
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              }
              onClick={() => {
                window.location.href = "/";
              }}
            />
          }
        />
      </div>
      <div className="Userlogin_wrap">
        <div className="login_email">
          <input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={onEmailhandler}
            ref={emailInput}
          />
        </div>
        <div className="login_password">
          <input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={onPasswordhandler}
            ref={passwordInput}
          />
        </div>
        <div className="login_btn">
          <button onClick={handleSubmit}>로그인</button>
          <button
            className="login_btn"
            onClick={() => {
              window.location.href = "./register";
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Userlogin);
