import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useUserStore } from "@store/store";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import style from "@styles/User/UserJoin.module.css";

interface Data {
  nickname: string;
  profileId: number;
  socialType: string;
  loginId: string;
}
interface QueryParams {
  [key: string]: string;
}

function UserJoin() {
  usePageTitle("회원가입");
  usePageUpper();
  const { setUser } = useUserStore((state) => state);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  // 파라미터로 전달받은 socialId,loginId 값 디코딩하여 객체로 사용
  const [loginParams, setLoginParams] = useState<QueryParams>({
    socialType: "",
    loginId: "",
  });
  const getUrlParams = () => {
    const trim = location.search.replace(/^\?/, "");
    const obj: QueryParams = {};
    trim.replace(/([^&=]+)=([^&]*)/g, (match, key, value) => {
      obj[key] = decodeURIComponent(value);
      return match;
    });
    setLoginParams(obj);
  };
  useEffect(() => {
    getUrlParams();
  }, []);

  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { mutate: getJoin } = useMutation({
    mutationFn: async (formData: Data) => {
      try {
        const response = await authAxios.post("/join", {
          socialType: loginParams.socialType,
          loginId: loginParams.loginId,
          nickname: formData.nickname,
          profileId: +formData?.profileId,
        });
        console.log(response);
        if (response?.status === 200) {
          setUser({
            socialType: loginParams?.socialType,
            loginId: loginParams?.loginId,
            nickname: formData?.nickname,
            profileId: +formData?.profileId,
            accessToken: "",
            refreshToken: "",
          });
          window.location.href = response?.request?.responseURL;
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data?.data?.error) {
        alert(data?.data?.error?.message);
        return;
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (formData: Data) => {
    getJoin(formData);
  };

  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.header_title}>
            Welcome to the
            <br />
            GACHAGACHA!
          </h1>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={style.form}
          aria-labelledby="join-form-title"
        >
          <fieldset className={style.form_fieldset}>
            <legend id="join-form-title" className={style.form_legend}>
              프로필 이미지 선택
            </legend>
            <div
              className={style.form_header_wrapper}
              role="radiogroup"
              aria-labelledby="profile-image-options"
            >
              {["1", "2", "3"].map((id) => (
                <figure key={id} className={style.form_fieldset_figure}>
                  <input
                    type="radio"
                    id={`image${id}`}
                    value={id}
                    className={style.form_fieldset_figure_input}
                    {...register("profileId", {
                      required: "프로필 이미지를 선택해주세요.",
                    })}
                  />
                  <label
                    htmlFor={`image${id}`}
                    className={style.form_fieldset_figure_label}
                  >
                    <img
                      src={`/images/Profile${id}.webp`}
                      alt={`Profile ${id}`}
                    />
                  </label>
                </figure>
              ))}
            </div>
            <p
              className={style.form_header_error}
              role="alert"
              aria-live="assertive"
            >
              {errors.profileId?.message}
            </p>
          </fieldset>

          <section className={style.form_section}>
            <article className={style.form_section_article}>
              <h1 className={style.form_section_article_title}>닉네임</h1>
              <section className={style.form_section_article_contents}>
                <label htmlFor="nickname" className="sr-only">
                  닉네임 입력
                </label>
                <input
                  id="nickname"
                  type="text"
                  placeholder={"닉네임을 입력하세요"}
                  aria-invalid={errors.nickname ? "true" : "false"}
                  aria-describedby="nickname-error"
                  {...register("nickname", { required: "닉네임을 입력하세요" })}
                />
                <Button text={"Enter"} width="4rem" onClick={() => {}}></Button>
              </section>
              <p
                className={style.form_section_article_error}
                role="alert"
                aria-live="assertive"
              >
                {errors.nickname?.message}
              </p>
            </article>
          </section>
        </form>
      </main>
    </div>
  );
}

export default UserJoin;
