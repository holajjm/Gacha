import React from "react";
import style from "@styles/User/UserJoin.module.css";
import { useForm } from "react-hook-form";
import { useUserStore } from "@store/store";
import { useNavigate } from "react-router-dom";

interface Data {
  image: string;
  nickname: string;
}
function UserJoin() {
  const {user,setUser} = useUserStore((state) => state);
  const navigate = useNavigate();
  console.log(user);
  
  const defaultImage = "/images/Camera.svg";

  const {register, handleSubmit, formState: {errors}} = useForm<Data>();

  const onSubmit = async () => {
    const response = await fetch("http://61.79.183.245:80/join",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "nickname": user.nickname,
        "loginType": user.loginType,
        "loginId": user.loginId,
        "profileUrl": user.profileUrl
      }),
    });
    const data = await response.json();
    console.log(data);

    if(data){
      setUser({
        ...user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
      localStorage.setItem("AccessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("RefreshToken", JSON.stringify(data.refreshToken));
      alert("회원가입 완료");
      navigate("/main");
    }
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
                src={user?.profileUrl ? user?.profileUrl : defaultImage}
                alt="profile"
              />
              <img
                className={style.main_img2}
                src="/images/Camera.svg"
                alt="Camera"
              />
            </label>
            <input id="profile" type="file" className={style.main_header_img} {...register("image")}/>
            <button>기본 이미지로 설정</button>
          </header>
          <section className={style.main_main}>
            <div className={style.main_wrapper}>
              <div className={style.main_main_title}>닉네임</div>
              <div className={style.main_main_contents}>
                <input type="text" value={user?.nickname} placeholder={user?.nickname ? user?.nickname : "닉네임"} {...register("nickname")}/>
                <button>Enter</button>
              </div>
              <p className={style.main_main_error}>
                {/* 이미 사용중인 닉네임입니다. */}
                {errors.nickname?.message}
              </p>
            </div>
          </section>
        </form>
      </section>
    </div>
  )
}

export default UserJoin;