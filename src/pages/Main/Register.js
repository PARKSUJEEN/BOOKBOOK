import React, { useEffect, useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../assets/fbase";
import MyHeader from "../../components/MyHeader";
import MyButton from "../../components/MyButton";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

  const onEmailhandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordhandler = (e) => {
    setPassword(e.currentTarget.value);
    handleCheck(e.currentTarget.value);
  };

  const onNamehandler = (e) => {
    setName(e.currentTarget.value);
    handleCheck(e.currentTarget.value);
  };

  const email_check = (email) => {
    let reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return reg.test(email);
  };

  const emailCheck = async () => {
    if (!email_check(email)) {
      setInputemail("이메일 형식에 맞게 입력해주세요");
      return false;
    }

    const docRef = doc(db, "user", `${email}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setInputemail("중복되는 이메일이 존재합니다");
    } else {
      setInputemail("사용가능한 이메일입니다.");
      setIsEmail(true);
    }
  };

  const inputFocus = useRef(null);
  useEffect(() => {
    if (inputFocus.current !== null) inputFocus.current.focus();
  }, []);

  const navigate = useNavigate();

  const handleCheck = async () => {
    if (name.length <= 3 || name.length > 11) {
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
    if (isEmail && isPassword && isName) {
      console.log(isEmail, isPassword, isName);
      try {
        const registerUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
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

        alert(`${name}님 회원가입되었습니다.`);
        e.preventDefault();

        navigate("/", { replace: true });
      } catch (error) {
        console.log(error.message);
        alert(error.message);
        navigate("/login");
      }
    } else {
      alert("다시 입력 해주세요");
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
        <div className="">
          {/* <label>이름</label> */}
          <input
            placeholder="닉네임(3-10자)"
            type="name"
            value={name}
            onChange={onNamehandler}
            ref={inputFocus}
          />
        </div>
        <div className="Register inputInfo">{inputname}</div>
        <div className="Register inputemail">
          {/* <label>이메일</label> */}
          <input
            placeholder="이메일"
            type="email"
            value={email}
            onChange={onEmailhandler}
          />
        </div>
        <div className="Register emailtest">
          <button onClick={emailCheck}>중복검사하기</button>
        </div>
        <div className="Register inputInfo">{inputemail}</div>
        <div className="Register inputpassword">
          {/* <label>비밀번호</label> */}
          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onPasswordhandler}
          />
        </div>
        <div className="Register inputInfo">{inputpass}</div>
        <div className="Register info">
          <p>
            계정 생성 시 개인정보수집방침 및 이용약관(마케팅 정보 수신 동의
            포함)에 동의하게 됩니다.
          </p>
        </div>
        <div className="Register_btn">
          <button onClick={register}>완료</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
