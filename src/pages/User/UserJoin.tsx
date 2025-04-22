import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

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
  usePageTitle("Join");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { setUser } = useUserStore((state) => state);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // clearErrors,
    // setValue,
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

  // 새로운 회원가입 로직
  // const [char, setChar] = useState<string>("");
  // const selectedChar = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   // console.log((e.target as HTMLDivElement).getAttribute("dataType"));
  //   const charNum = (e.target as HTMLDivElement).getAttribute("dataType");
  //   if (charNum) {
  //     setChar(charNum);
  //   }
  //   clearErrors("profileId");
  // };

  const onSubmit = async (formData: Data) => {
    console.log(formData);
    formData.socialType = loginParams.socialType;
    formData.loginId = loginParams.loginId;
    const form = new FormData();
    form.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            socialType: loginParams.socialType,
            loginId: loginParams.loginId,
            nickname: formData.nickname,
            profileId: +formData?.profileId,
          }),
        ],
        { type: "application/json" },
      ),
    );
    try {
      const response = await fetch(`${SERVER_API}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const data = await response.json();
      console.log(response);

      if (response?.status === 200) {
        setUser({
          socialType: loginParams.socialType,
          loginId: loginParams.loginId,
          nickname: formData?.nickname,
          profileId: +formData?.profileId,
          accessToken: "",
          refreshToken: "",
        });
        window.location.href = response.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 회원가입 폼 양식 전달 로직
  // const onSubmit = async (formData: Data) => {
  //   console.log(formData);
  //   const form = new FormData();
  //   form.append(
  //     "data",
  //     new Blob(
  //       [
  //         JSON.stringify({
  //           socialType: loginParams.socialType,
  //           loginId: loginParams.loginId,
  //           nickname: formData.nickname,
  //         }),
  //       ],
  //       { type: "application/json" },
  //     ),
  //   );
  //   if (!defaultImage && formData?.profileUrl.length > 0) {
  //     form.append("profileImageFile", imagePreview);
  //   } else {
  //     form.append("profileImageFile", "");
  //   }
  //   try {
  //     const response = await fetch(`${SERVER_API}/join`, {
  //       method: "POST",
  //       body: form,
  //     });
  //     if (response?.status === 200) {
  //       setUser({
  //         socialType: loginParams.socialType,
  //         loginId: loginParams.loginId,
  //         nickname: formData.nickname,
  //         profileUrl:
  //           formData.profileUrl.length > 0 ? formData?.profileUrl[0]?.name : "",
  //         accessToken: "",
  //         refreshToken: "",
  //       });
  //       window.location.href = response.url;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // 기본 이미지 설정 및 이미지 미리보기 구현
  // const [defaultImage, setDefaultImage] = useState<boolean>(false); // 기본 이미지 여부
  // const [imagePreview, setImagePreview] = useState<string>(
  //   "/images/LightDefaultImage.png",
  // );
  // useEffect(() => {
  //   if (defaultImage) {
  //     setImagePreview("/images/LightDefaultImage.png");
  //   }
  // }, [defaultImage]);

  // const handleDefaultImage = () => {
  //   clearErrors("profileUrl"); //useForm의 clearErrors 메서드를 통해 특정 input 값의 에러만 삭제
  //   setDefaultImage(true);
  //   setValue("profileUrl", new DataTransfer().files);
  // };
  // const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.files?.[0]);
  //   const selectedFile = e.target.files ? e.target.files[0] : null;
  //   if (selectedFile) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(selectedFile);
  //     setDefaultImage(false);
  //   }
  // };

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
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <fieldset className={style.form_fieldset}>
            <legend className={style.form_legend}>프로필 이미지 선택</legend>
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
            <p className={style.form_header_error}>
              {errors.profileId?.message}
            </p>
          </fieldset>
          {/* <header className={style.form_header} onClick={selectedChar}>
            <label className={style.form_header_label} htmlFor="profile">
              <p className={style.form_header_title}>프로필을 선택하세요.</p>
              <div className={style.form_header_wrapper}>
                <img
                  onClick={() => setValue("profileId", char)}
                  datatype="1"
                  src="/images/Bear.svg"
                  alt="Bear"
                />
                <img
                  onClick={() => setValue("profileId", char)}
                  datatype="2"
                  src="/images/Cow.svg"
                  alt="Cow"
                />
                <img
                  onClick={() => setValue("profileId", char)}
                  datatype="3"
                  src="/images/Giraffe.svg"
                  alt="Giraffe"
                />
              </div>
            </label>
            <input
              type="text"
              id="profile"
              className={style.form_header_img}
              {...register("profileId", {
                required: "프로필 이미지를 선택해주세요.",
              })}
            />
            <p className={style.form_header_error}>
              {errors ? errors?.profileId?.message : ""}
            </p> */}
          {/* <label className={style.main_header_label} htmlFor="profile">
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
            <div onClick={handleDefaultImage}>기본 이미지로 하기</div> */}
          {/* </header> */}
          <section className={style.form_section}>
            <article className={style.form_section_article}>
              <h1 className={style.form_section_article_title}>닉네임</h1>
              <section className={style.form_section_article_contents}>
                <input
                  type="text"
                  placeholder={"닉네임을 입력하세요"}
                  {...register("nickname", { required: "닉네임을 입력하세요" })}
                />
                <Button text={"Enter"} width="4rem" onClick={() => {}}></Button>
              </section>
              <p className={style.form_section_article_error}>
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
