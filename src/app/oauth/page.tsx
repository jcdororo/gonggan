"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function SignUpForm() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/session/getSession");
        const data = await response.json();

        if (response.ok) {
          setSession(data.session);
        } else {
          console.error("Failed to fetch session: ", data.error);
        }
      } catch (error) {
        console.error("Error fetching session: ", error);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      loginId: "",
      nickname: "",
      email: "",
      alarm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      console.log(body);
      const { data } = await axios.post("/api/auth/oauth", {
        ...body,
        session,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="m-auto p-11"
      >
        <h1 className="text-3xl font-bold text-center">회원가입</h1>

        <div className="form__block">
          <label className="lab" htmlFor="id">
            이메일<span className="text-red-900 font-bold">*</span>
          </label>
          <input
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일형식으로 기입해주세요.",
              },
              validate: async (val: string) => {
                if (val === (session as any).user.email) {
                  return;
                }
                try {
                  const res = await axios.post("/api/duplicate/route", {
                    email: val,
                  });
                  if (res.data == "duplication") {
                    return "중복된 이메일입니다.";
                  }
                } catch (error) {
                  console.log(error);
                }
              },
            })}
            className="in"
          />
          {errors.email && (
            <p className="text-sm text-red-500 p-2">{errors?.email?.message}</p>
          )}
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="nickname">
            닉네임<span className="text-red-900 font-bold">*</span>
          </label>
          <input
            {...register("nickname", {
              required: "닉네임을 입력해주세요.",
              minLength: {
                value: 5,
                message: "다섯 글자 이상 입력해주세요.",
              },
              validate: async (val: string) => {
                try {
                  const res = await axios.post("/api/duplicate/route", {
                    nickname: val,
                  });
                  if (res.data == "duplication") {
                    return "중복된 닉네임입니다.";
                  }
                } catch (error) {
                  console.log(error);
                }
              },
            })}
            className="in"
          />
          {errors.nickname && (
            <p className="text-sm text-red-500 p-2">
              {errors?.nickname?.message}
            </p>
          )}
        </div>
        <div className="form_block"></div>
        <div className="form_block flex">
          <input
            {...register("alarm")}
            type="checkbox"
            name="alarm"
            id="alarm"
            className="w-5 h-5 mt-5 mr-2 accent-yellow-900"
          />
          <p className="mt-5">댓글 및 공(工)간의 정보 알림 받기</p>
        </div>
        <div className="form__block">
          <input type="submit" value="가입완료" className="form__btn--submit" />
        </div>
      </form>
    </div>
  );
}
