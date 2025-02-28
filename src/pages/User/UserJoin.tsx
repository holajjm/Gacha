import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useUserStore } from "@store/store";
import style from "@styles/User/UserJoin.module.css";

interface Data {
  nickname: string;
  profileUrl: FileList;
}
interface QueryParams {
  [key: string]: string;
}

function UserJoin() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { setUser } = useUserStore((state) => state);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
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

  // 회원가입 폼 양식 전달 로직
  const onSubmit = async (formData: Data) => {
    console.log(formData);
    const form = new FormData();
    form.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            socialType: loginParams.socialType,
            loginId: loginParams.loginId,
            nickname: formData.nickname,
          }),
        ],
        { type: "application/json" },
      ),
    );
    if (!defaultImage && formData?.profileUrl.length > 0) {
      form.append("profileImageFile", imagePreview);
    } else {
      form.append("profileImageFile", "");
    }
    try {
      const response = await fetch(`${SERVER_API}/join`, {
        method: "POST",
        body: form,
      });
      if (response?.status === 200) {
        setUser({
          socialType: loginParams.socialType,
          loginId: loginParams.loginId,
          nickname: formData.nickname,
          profileUrl:
            formData.profileUrl.length > 0 ? formData?.profileUrl[0]?.name : "",
          accessToken: "",
          refreshToken: "",
        });
        alert("회원가입 완료");
        window.location.href = response.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // // 기본 이미지 설정 및 이미지 미리보기 구현
  const [defaultImage, setDefaultImage] = useState<boolean>(false); // 기본 이미지 여부
  const [imagePreview, setImagePreview] = useState<string>(
    "/images/LightDefaultImage.png",
  );
  useEffect(() => {
    if (defaultImage) {
      setImagePreview("/images/LightDefaultImage.png");
    }
  }, [defaultImage]);

  const handleDefaultImage = () => {
    clearErrors("profileUrl"); //useForm의 clearErrors 메서드를 통해 특정 input 값의 에러만 삭제
    setDefaultImage(true);
    setValue("profileUrl", new DataTransfer().files);
  };
  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0]);
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setDefaultImage(false);
    }
  };
  // console.log(imagePreview);
  
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.title}>
            Welcome to the
            <br />
            GACHAGACHA!
          </h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className={style.main}>
          <header className={style.main_header}>
            <label className={style.main_header_label} htmlFor="profile">
              <img
                className={style.main_img1}
                src={imagePreview}
                alt="profile"
              />
              <img
                className={style.main_img2}
                src="/images/Camera.svg"
                alt="Camera"
              />
            </label>
            <input
              id="profile"
              type="file"
              className={style.main_header_img}
              {...register("profileUrl", {
                required: "프로필 이미지를 선택해주세요.",
              })}
              onChange={handlePreview}
            />
            <p className={style.main_main_error}>
              {errors ? errors.profileUrl?.message : ""}
            </p>
            <div onClick={handleDefaultImage}>기본 이미지로 하기</div>
          </header>
          <section className={style.main_main}>
            <div className={style.main_wrapper}>
              <div className={style.main_main_title}>닉네임</div>
              <div className={style.main_main_contents}>
                <input
                  type="text"
                  placeholder={"닉네임을 입력하세요"}
                  {...register("nickname", { required: "닉네임을 입력하세요" })}
                />
                <button>Enter</button>
              </div>
              <p className={style.main_main_error}>
                {errors.nickname?.message}
              </p>
            </div>
          </section>
        </form>
      </section>
    </div>
  );
}

export default UserJoin;
