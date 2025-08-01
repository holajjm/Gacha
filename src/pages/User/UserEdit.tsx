import React from "react";
import { useForm } from "react-hook-form";

import Button from "@components/Button";
import { useEditMutate } from "@features/user/useEditMutate";
import { useDeleteMutate } from "@features/user/useDeleteMutate";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import { useUserStore } from "@store/store";
import style from "@styles/User/UserEdit.module.css";

import { SlArrowLeft } from "react-icons/sl";
import type { UserData } from "types/user";

function UserEdit() {
  usePageTitle("회원 정보 수정");
  usePageUpper();
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    defaultValues: {
      nickname: user?.nickname,
      profileId: user?.profileId,
    },
  });

  // 회원 정보 수정
  const { mutate: editUserInfo } = useEditMutate();
  const onSubmit = async (formData: UserData) => {
    if (confirm("수정하시겠습니까?")) {
      try {
        editUserInfo(formData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 회원 탈퇴 기능
  const { mutate: deleteUser } = useDeleteMutate();
  const onDelete = () => {
    if (confirm("탈퇴할까요?")) {
      deleteUser();
    }
  };

  return (
    <main className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <Button
            text={<SlArrowLeft />}
            width={"2.5rem"}
            onClick={() => window.history.back()}
            aria-label="뒤로가기"
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
          <fieldset className={style.form_fieldset_1}>
            <article className={style.form_fieldset_1_article}>
              <legend className={style.form_fieldset_1_article_title}>
                닉네임
              </legend>
              <div className={style.form_fieldset_1_article_contents}>
                <label htmlFor="nickname" className="sr-only">
                  닉네임 입력
                </label>
                <input
                  id="nickname"
                  type="text"
                  placeholder={"닉네임을 입력하세요"}
                  {...register("nickname", { required: "닉네임을 입력하세요" })}
                />
                <Button text={"수정"} width="4rem" onClick={() => {}}></Button>
              </div>
              <p className={style.form_fieldset_1_article_error}>
                {errors.nickname?.message}
              </p>
            </article>
          </fieldset>
        </form>
        <footer className={style.footer}>
          <button
            type="button"
            className={style.footer_button}
            onClick={onDelete}
          >
            회원 탈퇴
          </button>
        </footer>
      </section>
    </main>
  );
}

export default UserEdit;
