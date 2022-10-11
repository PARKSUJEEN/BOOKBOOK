import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [user, setUser] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleInput = (e) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = () => {
  //   if(user.email.length<)
  // }

  const navigate = useNavigate();
  const inputFocus = useRef(null);

  useEffect(() => {
    if (inputFocus.current !== null) inputFocus.current.focus();
  }, []);

  const login = async () => {
    console.log("login함수 실행");

    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      navigate("/", { replace: true });
    } catch (error) {
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        alert("비밀번호가 잘못됨");
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        alert("email을 찾을 수 없습니다.");
        setPassword("");
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
              text={"🔨"}
              onClick={() => {
                window.location.href = "/";
              }}
            />
          }
        />
      </div>
      <div className="Userlogin_wrap">
        <div className="login_email">
          {/* <label>이메일</label> */}
          <input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={onEmailhandler}
            required
            ref={inputFocus}
          />
        </div>
        <div className="login_password">
          {/* <label>비밀번호</label> */}
          <input
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={onPasswordhandler}
            required
          />
        </div>
        <div className="login_btn">
          <button onClick={login}>로그인</button>
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
