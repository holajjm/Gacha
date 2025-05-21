import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@store/store";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import Button from "@components/Button";

import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/User/UserEdit.module.css";

interface Data {
  nickname: string;
  profileId: number;
}

function UserEdit() {
  usePageTitle("프로필 수정");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user, setUser } = useUserStore((state) => state);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit = async (formData: Data) => {
    const form = new FormData();
    form.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            nickname: formData.nickname,
            profileId: formData?.profileId,
          }),
        ],
        { type: "application/json" },
      ),
    );
    try {
      if (confirm("수정하시겠습니까?")) {
        const response = await fetch(`${SERVER_API}/userInfo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        if (data?.result === "SUCCESS") {
          alert("수정되었습니다.");
          setUser({
            socialType: user.socialType,
            loginId: user.loginId,
            nickname: formData?.nickname,
            profileId: formData?.profileId,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          });
          setTimeout(() => {
            navigate(`/minihome/${formData?.nickname}`);
          }, 300);
        } else if (data?.result === "ERROR") {
          alert(data?.error?.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 임시 회원 탈퇴 기능
  const handleWithDraw = async () => {
    if (confirm("탈퇴할까요?")) {
      await fetch(`${SERVER_API}/withdraw`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.refreshToken}`,
        },
      });
      sessionStorage.removeItem("user");
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      alert("회원 탈퇴 완료");
      navigate("/main");
      window.location.reload();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header className={style.header}>
          <Button
            text={<SlArrowLeft />}
            width={"2.5rem"}
            onClick={() => window.history.back()}
          />
          <h1 className={style.header_title}>프로필 수정</h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <section>
            <fieldset className={style.form_fieldset}>
              <legend className={style.form_legend}>프로필 이미지 선택</legend>
              <div
                className={style.form_header_wrapper}
                role="radiogroup"
                aria-labelledby="profile-image-options"
              >
                {[1, 2, 3].map((id) => (
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
          </section>
          <section>
            <article className={style.form_section_article}>
              <h1 className={style.form_section_article_title}>닉네임</h1>
              <section className={style.form_section_article_contents}>
                <input
                  type="text"
                  placeholder={"닉네임을 입력하세요"}
                  {...register("nickname", { required: "닉네임을 입력하세요" })}
                />
                <Button text={"수정"} width="4rem" onClick={() => {}}></Button>
              </section>
              <p className={style.form_section_article_error}>
                {errors.nickname?.message}
              </p>
            </article>
          </section>
        </form>
        <footer className={style.footer}>
          <button
            className={style.footer_button}
            onClick={() => handleWithDraw()}
          >
            회원 탈퇴
          </button>
        </footer>
      </div>
    </div>
  );
}

export default UserEdit;
