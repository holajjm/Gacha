import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
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
  const defaultImage = "/images/Camera.svg";
  const { setUser } = useUserStore((state) => state);

  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const [loginParams, setLoginParams] = useState<QueryParams>({
    socialType: "",
    loginId: "",
  });
  console.log(loginParams);

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

  const onSubmit = async (formData: Data) => {
    console.log(formData);
    
    try {
      const response = await fetch("https://61.79.183.245:80/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          socialType: loginParams.socialType,
          loginId: loginParams.loginId,
          nickname: formData.nickname,
          profileUrl: formData.profileUrl.length !== 0 ? formData.profileUrl[0].name : "Camera.svg",
        }),
      });
      console.log(response);
      
      if (response) {
        setUser({
          socialType: loginParams.socialType,
          loginId: loginParams.loginId,
          nickname: formData.nickname,
          profileUrl: formData.profileUrl.length !== 0 ? formData?.profileUrl[0]?.name : "Camera.svg",
          accessToken: "",
          refreshToken: ""
        })
        alert("회원가입 완료");
        window.location.href = response.url;
      }
    } catch (error) {
      console.log(error);
      
    }
    // if (data) {
    //   setUser({
    //     ...user,
    //     accessToken: data.accessToken,
    //     refreshToken: data.refreshToken,
    //   });
    //   localStorage.setItem("AccessToken", JSON.stringify(data.accessToken));
    //   localStorage.setItem("RefreshToken", JSON.stringify(data.refreshToken));
    //   alert("회원가입 완료");
    //   navigate("/main");
    // }
  };
  const handleDefaultImage = () => {
    console.log(defaultImage);
    
  }
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
                src={defaultImage}
                alt="profile"
              />
              <img
                className={style.main_img2}
                src={defaultImage}
                alt="Camera"
              />
            </label>
            <input
              id="profile"
              type="file"
              className={style.main_header_img}
              {...register("profileUrl",{required: "프로필 이미지를 선택해주세요."})}
            />
            <p className={style.main_main_error}>
                {errors.profileUrl?.message}
            </p>
            <button onClick={handleDefaultImage}>기본 이미지로 설정</button>
          </header>
          <section className={style.main_main}>
            <div className={style.main_wrapper}>
              <div className={style.main_main_title}>닉네임</div>
              <div className={style.main_main_contents}>
                <input
                  type="text"
                  placeholder={"닉네임을 입력하세요"}
                  {...register("nickname",{required: "닉네임을 입력하세요"})}
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
