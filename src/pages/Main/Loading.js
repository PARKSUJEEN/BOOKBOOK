import React from "react";
import Spinner from "../../assets/Spinner.gif";
import { Background } from "./Styled.js";

export default () => {
  return (
    <Background>
       <img src={Spinner} alt="로딩중" width="5%" />
          
    </Background>
  );
};
