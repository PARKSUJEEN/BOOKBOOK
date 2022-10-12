import React, { useCallback, useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../assets/fbase";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import styled from "styled-components";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputname, setInputname] = useState("");
  const [inputemail, setInputemail] = useState("");
  const [inputpass, setInputpass] = useState("");

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");

  const [lastButton, setLastBtutton] = useState(true);

  const onEmailhandler = useCallback(async (e, email) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    setEmailMessage("");
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
      console.log(isEmail);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      const docRef = doc(db, "user", `${emailCurrent}`);
      console.log(emailCurrent);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setInputemail("중복되는 email이 존재합니다");
        console.log(isEmail);
      } else {
        console.log("No such document!");
        setInputemail("사용가능");
        console.log(isEmail);
        setIsEmail(true);
      }
    }
  }, []);

  const onPasswordhandler = (e) => {
    setPassword(e.currentTarget.value);
    handleCheck(e.currentTarget.value);
  };

  const onNamehandler = (e) => {
    setName(e.currentTarget.value);
    handleCheck(e.currentTarget.value);
  };

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current !== null) inputFocus.current.focus();
  }, []);

  const navigate = useNavigate();

  const handleCheck = async () => {
    if (name.length < 3 || name.length >= 10) {
      setInputname("3-10자로 입력해주세요");
    } else {
      setInputname("사용할 수 있는 닉네임입니다");
      setIsName(true);
    }

    if (password.length < 8) {
      setInputpass("8자 이상 입력해주세요");
    } else {
      setInputpass("사용가능한 비밀번호입니다.");
      setIsPassword(true);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (isEmail && isPassword && isName) {
      console.log(isEmail, isPassword, isName);
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            const docRef = setDoc(doc(db, "user", `${email}`), {
              email: email,
              password: password,
              name: name,
              uid: user.uid,
            });
            console.log("회원가입완료 - > 여기서 user가 auth로 넘어가는건가?");
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log(error.code);

            const errorMessage = error.message;
            console.log(error.message);
          });

        alert(`${name}님 회원가입 성공`);
        navigate("/login");
      } catch (error) {
        console.log(error.message);
        alert(error.message);
        // navigate("/login");
      }
    } else {
      alert("다시입력해주세요");
    }
  };

  return (
    <div className="Register">
      <div>
        <MyHeader
          headText={"회원가입"}
          leftChild={
            <MyButton
              text={
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              }
              onClick={() => {
                window.location.href = "/.";
              }}
            />
          }
        />
      </div>
      <div className="Register_wrap">
        <div className="Register inputname">
          {/* <label>이름</label> */}
          <input
            placeholder="닉네임(3-10자)"
            type="name"
            value={name}
            onChange={onNamehandler}
            ref={inputFocus}
          />
        </div>
        <div>{inputname}</div>
        <div className="Register inputemail">
          {/* <label>이메일</label> */}
          <input
            placeholder="이메일"
            type="email"
            value={email}
            onChange={onEmailhandler}
          />
        </div>
        {/* <button className="emailtest" onClick={checkEmail}>
          중복검사하기
        </button> */}
        <div>{isEmail ? inputemail : emailMessage}</div>
        <div className="Register inputpassword">
          {/* <label>비밀번호</label> */}
          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onPasswordhandler}
          />
        </div>
        <div>{inputpass}</div>
        <div>
          <p>
            계정 생성 시 개인정보수집방침 및 이용약관(마케팅 정보 수신 동의
            포함)에 동의하게 됩니다.
          </p>
        </div>

        <div className="register_btn">
          {lastButton ? (
            <button onClick={register}>완료</button>
          ) : (
            <button onClick={register}>삐빅..</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
