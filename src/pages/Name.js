import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { db } from "../assets/fbase";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Name = () => {
  const { udata } = useContext(userContext);
  const [name, setName] = useState(udata.name);

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const nameSubmit = async () => {
    if (name.length < 3 || name.length >= 10) {
      alert("이름 규칙을 지켜주세요(´•᎑•`)♡ ");
      return;
    }
    const newUsernameRef = doc(db, "user", udata.email);
    await updateDoc(newUsernameRef, {
      uid: udata.uid,
      name: name,
    });

    navigate("/home", { replace: true });
  };

  return (
    <div>
      <MyHeader
        leftChild={
          <MyButton
            text={
              <span className="material-symbols-outlined">arrow_back_ios</span>
            }
            onClick={() => {
              window.location.href = "/";
            }}
          />
        }
      />
      <div className="Name">
        <div className="Name_name">
          <label>이름</label>
        </div>
        <div className="Name_input">
          <input type="text" value={name} onChange={onChangeName} />
        </div>
        <div className="Name_info">바뀐 이름은 모든 기록에 적용됩니다!</div>
        <div className="Name_btn">
          <button onClick={nameSubmit}>수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default Name;
