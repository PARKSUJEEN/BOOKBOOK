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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [inputname, setInputname] = useState(
    "한글, 영어, 숫자로만 입력해주세요"
  );
  const [inputpass, setInputpass] = useState("8자리 이상 입력해주세요");
  const [inputemail, setInputemail] = useState("이메일입력");
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailCheck2, setEmailCheck2] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [lastButton, setLastBtutton] = useState(true);

  const onEmailhandler = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  }, []);

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current !== null) inputFocus.current.focus();
  }, []);

  const navigate = useNavigate();

  const handleCheck = async () => {
    if (name.length < 3 && name.length <= 10) {
      setInputname("한글, 영어, 숫자로만 입력해주세요");
    } else {
      setInputname("사용할 수 있는 닉네임입니다");
    }

    if (password.length < 8) {
      setInputpass("8자 이상 입력해주세요");
    } else {
      setInputpass("비밀번호 ㅇㅋ");
    }

    onSubmit();
  };

  const register = async (e) => {
    // e.preventDefault();
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
  };

  const checkEmail = async () => {
    const docRef = doc(db, "user", `${email}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setInputemail("중복되는 email이 존재합니다");
      setEmailCheck(true);
      console.log(emailCheck);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setInputemail("사용가능");
      setEmailCheck(false);
    }
  };

  const onPasswordhandler = (e) => {
    setPassword(e.currentTarget.value);
    handleCheck(e.currentTarget.value);
  };

  const onNamehandler = (e) => {
    setName(e.currentTarget.value);
    handleCheck(e.currentTarget.value);
  };

  const onSubmit = () => {
    if (email && password && name) {
      setLastBtutton(true);
    } else {
      setLastBtutton(false);
    }
  };

  return (
    <div className="Register">
      <div>
        <MyHeader
          headText={"회원가입"}
          leftChild={
            <MyButton
              text="<"
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
          {inputname}
        </div>
        <div className="Register inputemail">
          {/* <label>이메일</label> */}
          <input
            placeholder="이메일"
            type="email"
            value={email}
            onChange={onEmailhandler}
          />
          <button className="emailtest" onClick={checkEmail}>
            중복검사하기
          </button>
          {emailMessage}
        </div>
        <div className="Register inputpassword">
          {/* <label>비밀번호</label> */}
          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onPasswordhandler}
          />
          {inputpass}
        </div>
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
