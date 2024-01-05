"use client";
import { useRef, useState } from "react";
import { FaToggleOn } from "react-icons/fa";
import Image from "next/image";
import { useInputImg } from "../hooks/useInputImg";
import { useRouter } from "next/navigation";
import { uploadImg } from "@/util/uploadImg";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export default function ProfileForm({ session }: any) {
  const [picture, setPicture] = useState(session.user.image);
  const [nickname, setNickname] = useState(session.user.nickname);
  const [newNickname, setNewNickname] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [checkVisable, setCheckVisable] = useState(false);
  const [infoVisable, setInfoVisable] = useState(false);
  const router = useRouter();

  console.log(session.user.mehtod);

  const handleCheck = async () => {
    if (nickname == "") return;
    setCheckVisable(true);
    try {
      const isExistNickname = await fetch("/api/auth/nicknameCheck", {
        method: "POST",
        body: JSON.stringify({ nickname: nickname }),
      }).then((r) => r.json());
      if (isExistNickname == "N") {
        setNewNickname(nickname);
      } else {
        setNewNickname(null);
      }
      setInfoVisable(true);
    } catch (error) {
      throw new Error(error?.toString());
    }
  };

  const handleClick = () => {
    imageRef.current?.click();
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setCheckVisable(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    useInputImg(e, setImage, setPicture);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      loginId: session.user.id,
      nickname: session.user.nickname as string,
      email: session.user.email as string,
      current_password: "",
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    console.log("submit!!!!", image);
    let url = "";
    let result = "";
    // 이미지가 변경되었다면
    if (image != null) {
      url = await uploadImg(image);
      result = await fetch(
        `/api/upload/image?_id=${session.user.id}&url=${url}`,
        { method: "POST" }
      ).then((r) => r.json());
    }
    if (result.toString().includes("success")) {
      router.push("/mypage/profile/complete");
    }

    console.log("result", result);

    console.log("submit done !!!");

    try {
      const { data } = await axios.put("/api/user/updateUser", {
        ...body,
        userId: session.user.id
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-5">
      <h1 className="text-3xl font-bold text-center mb-[40px]">프로필 수정</h1>
      <div className="flex justify-center mb-5">
        {/* <div className="bg-black w-[100px] h-[100px] rounded-full"></div> */}
        <Image
          className="rounded-full w-[100px] h-[100px] overflow-hidden"
          src={session.user.image ? picture : "/logo2.png"}
          width={640}
          height={640}
          alt="아이콘"
        />
      </div>
      <div className="flex justify-center">
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          multiple={false}
          onChange={handleChange}
          className="hidden"
        />
        <button
          className="border-2 border-[#998373] rounded-sm bg-inherit text-[#998373] text-xs w-[100px] h-[30px] hover:shadow-lg"
          onClick={handleClick}
        >
          이미지 업로드
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="m-auto p-11"
      >
        <div className="form__block">
          <div className="flex justify-between mr-2">
            <p className="font-bold text-xl">알림 받기</p>
            <FaToggleOn size="30" color="#998373" />
          </div>
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="id">
            아이디
          </label>
          <input
            {...register("loginId")}
            className="in bg-sygnature-beige"
            type="text"
            disabled
          />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="nickname">
            닉네임
          </label>
          <input
            {...register("nickname", {
              required: "닉네임을 입력해주세요.",
              minLength: {
                value: 5,
                message: "다섯 글자 이상 입력해주세요.",
              },
              validate: async (val: string) => {
                if (val === session.user.nickname) {
                  return;
                }
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

        {session.user.method != "oauth" ? (
          <>
            <div className="form__block">
              <label className="lab" htmlFor="currentpw">
                비밀 번호 변경 시 현재 비밀번호 입력
              </label>
              <input
                {...register("current_password", {
                  required: "현재 비밀번호를 입력해주세요.",
                  minLength: {
                    value: 5,
                    message: "다섯 글자 이상 입력해주세요.",
                  },
                  validate: async (val: string) => {
                    try {
                      const res = await axios.post("/api/user/passwordCheck", {
                        id: session.user.id,
                        current_password: val,
                      });
                      if (res.data == "check") {
                        return;
                      } else {
                        return "비밀번호가 맞지 않습니다.";
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  },
                })}
                className="in"
                type="password"
              />
              {errors.current_password && (
                <p className="text-sm text-red-500 p-2">
                  {errors?.current_password?.message}
                </p>
              )}
            </div>
            <div className="form__block">
              <label className="lab" htmlFor="newpw">
                새로운 비밀번호
              </label>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "여덟 글자 이상 입력해주세요.",
                  },
                })}
                className="in"
                type="password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 p-2">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div className="form__block">
              <label className="lab" htmlFor="newpw_confirm">
                새로운 비밀번호 확인
              </label>
              <input
                {...register("password_confirm", {
                  required: "비밀번호 확인을 입력해주세요.",
                  validate: (val: string) => {
                    if (watch("password") != val) {
                      return "입력하신 비밀번호와 일치하지 않습니다.";
                    }
                  },
                })}
                className="in"
                type="password"
              />
              {errors.password_confirm && (
                <p className="text-sm text-red-500 p-2">
                  {errors?.password_confirm?.message}
                </p>
              )}
            </div>
          </>
        ) : (
          ""
        )}

        <div className="form__block">
          <label className="lab" htmlFor="email">
            이메일
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
                if (val === session.user.email) {
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
          <input type="submit" value="수정하기" className="form__btn--submit" />
        </div>
      </form>
      <div className="m-auto p-8">
        <p className="w-full max-w-[680px] text-center">회원 탈퇴</p>
      </div>
    </div>
  );
}
