"use client";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { UserInfoType } from "@/app/interface";
import MessageModal from "./MessageModal";

export default function AccountFindForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const [isNicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [isPwdModalOpen, setPwdModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { id } = e.currentTarget;
    // 아이디 찾기 버튼을 눌렀을 때
    if (id === "findId") {
      setNicknameModalOpen(!isNicknameModalOpen);
    }
    // 비밀번호 찾기 버튼을 눌렀을 때
    if (id === "findPwd") {
      setPwdModalOpen(!isPwdModalOpen);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (body, event) => {
    const target = event?.target;
    const submitButton = target.querySelector('input[type="submit"]:focus');
    const buttonValue = submitButton?.getAttribute("value");

    try {
      const { data } = await axios.post("/api/accountFind/route", body);
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }

    if (buttonValue === "아이디 찾기") {
      setNicknameModalOpen(true);
    }

    if (buttonValue === "비밀번호 변경 메일 전송하기") {
      try {
        const message =
          "이 주소로 접속하여 비밀번호를 변경해주십시오. \n" +
          process.env.NEXT_PUBLIC_URL +
          "/accountFind/" +
          userInfo?._id;

        const emailValue = {
          from_name: "gongganstudy",
          to_name: userInfo?.nickname,
          message,
          to_email: body.email,
        };

        emailjs.send(
          "service_zbn0dtf",
          "template_vyx0c4j",
          emailValue,
          "n8eqKpaiXtd_CFvVK"
        );
        setPwdModalOpen(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="m-auto p-11">
        <h1 className="text-3xl font-bold text-center">
          아이디 및 비밀번호 찾기
        </h1>
        <div className="form_block">
          <p className="my-16">
            비밀번호를 초기화 하는 방법을 이메일 주소로 전송했습니다. <br />
            가입한 적이 없는 이메일 주소나 올바르지 않은 이메일 주소를 입력하신
            경우에는 메일을 받을 수 없습니다
          </p>
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="email">
            가입하신 이메일
          </label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일형식으로 기입해주세요.",
              },
              validate: {
                duplication: async (val: string) => {
                  try {
                    const res = await axios.post("/api/duplicate/route", {
                      email: val,
                    });
                    if (res.data != "duplication") {
                      return "존재하지 않는 이메일입니다";
                    }
                  } catch (error) {
                    console.log(error);
                  }
                },
              },
            })}
            className="in"
          />
          {errors.email && (
            <p className="text-sm text-red-500 pt-4 px-2">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="form__block flex gap-5">
          <input
            type="submit"
            value="아이디 찾기"
            className="form__btn--submit text-center"
          />
          <input
            type="submit"
            value="비밀번호 변경 메일 전송하기"
            className="form__btn--submit"
          />
        </div>
      </form>

      {isNicknameModalOpen && (
        <MessageModal type="findId" userInfo={userInfo} onClick={onClick} />
      )}
      {isPwdModalOpen && (
        <MessageModal type="findPwd" onClick={onClick} />
      )}
    </div>
  );
}
