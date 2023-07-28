"use client";
import React, { useRef, useState } from "react";
import PrimaryTextInput from "./inputs/PrimaryTextInput";
import SecondaryTextInput from "./inputs/SecondaryTextInput";
import SecondaryButton from "./buttons/SecondaryButton";
import styles from "../styles/Auth.module.scss";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

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
  setIsLogged,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const siteKeyCaptchaV3 = "6Lcy8FgnAAAAABnrDDm0_edlQdstVn69uXtzalIJ";

  const onCaptcha = () => {
    setIsVerified(true);
  };

  const handleAuth = async () => {
    if (isVerified) {
      if (email && password) {
        const isUserExist = await axios.post(
          "http://localhost:3333/users/check",
          null,
          {
            params: {
              email: email,
              hash: password,
            },
          }
        );

        if (!isUserExist.data) {
          await axios
            .post("http://localhost:3333/users/create", null, {
              params: {
                email: email,
                hash: password,
              },
            })
            .then((user) => {
              localStorage.setItem("user", JSON.stringify(user));
              window.location.href = "/generate";
            });
        } else {
          try {
            await axios
              .post("http://localhost:3333/users/get", null, {
                params: {
                  email: email,
                  hash: password,
                },
              })
              .then((user) => {
                console.log(user);
                localStorage.setItem("user", JSON.stringify(user));
                onClose();
                setIsLogged(true);
                window.location.href = "/generate";
              });
          } catch (error) {
            setIsIncorrect(true);
            setTimeout(() => {
              setIsIncorrect(false);
            }, 1000);
          }
        }
      }
    }
  };

  return (
    <div className="auth">
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
        type={"password"}
      ></SecondaryTextInput>
      <ReCAPTCHA style={{borderRadius: 20}} sitekey={`${siteKeyCaptchaV3}`} onChange={onCaptcha} />
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
      {isIncorrect && (
        <p style={{ margin: "0 auto", marginTop: 30 }}>Неверный пароль!</p>
      )}
    </div>
  );
};

export default Auth;
