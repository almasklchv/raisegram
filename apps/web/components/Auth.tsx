"use client";
import React, { useRef, useState } from "react";
import PrimaryTextInput from "./inputs/PrimaryTextInput";
import SecondaryTextInput from "./inputs/SecondaryTextInput";
import SecondaryButton from "./buttons/SecondaryButton";
import styles from "../styles/Auth.module.scss";
import axios from "axios";

const Auth = ({
  title,
  input1,
  input2,
  button,
  inputWidth,
  inputHeight,
  buttonWidth,
  buttonHeight,
  fontSize,
  paddingleft,
  onClose,
  setIsLogged
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    const isUserExist = await axios.post("http://localhost:3333/users/check", null, {
      params: {
        email: email,
        hash: password,
      },
    });

    if (!isUserExist.data) {
      await axios.post("http://localhost:3333/users/create", null, {
        params: {
          email: email,
          hash: password,
        },
      }).then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      });
    } else {
      await axios.post("http://localhost:3333/users/get", null, {
        params: {
          email: email,
          hash: password,
        },
      }).then((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        onClose()
        setIsLogged(true)
      });
    }
    
  };

  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <PrimaryTextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        paddingleft={paddingleft}
        fontSize={fontSize}
        width={inputWidth}
        height={inputHeight}
        placeholder={input1}
      ></PrimaryTextInput>
      <SecondaryTextInput
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        paddingleft={paddingleft}
        fontSize={fontSize}
        width={inputWidth}
        height={inputHeight}
        placeholder={input2}
        type={'password'}
      ></SecondaryTextInput>
      <SecondaryButton
        onClick={handleAuth}
        margin={"0 auto"}
        margintop={35}
        fontSize={22}
        width={buttonWidth}
        height={buttonHeight}
      >
        {button}
      </SecondaryButton>
    </div>
  );
};

export default Auth;
