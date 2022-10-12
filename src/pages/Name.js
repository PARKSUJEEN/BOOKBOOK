import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { userContext } from "../App";
import { db } from "../assets/fbase";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Name = () => {
  const { onNameEdit, udata } = useContext(userContext);
  const [name, setName] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const nameSubmit = async () => {
    console.log("onNameEdit 실행", name);

    const newUsernameRef = doc(db, "user", udata.email);
    console.log("namesubmit", newUsernameRef);
    await updateDoc(newUsernameRef, {
      uid: udata.uid,
      name: name,
    });
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
              window.location.href = "/.";
            }}
          />
        }
      />
      <div>
        이름
        <input type="text" value={name} onChange={onChangeName} />
        바뀐 이름은 모든 데이터에 적용됩니다.
        <div>
          <button onClick={nameSubmit}>수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default Name;
