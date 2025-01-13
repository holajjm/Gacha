import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useUserStore } from "@store/store"

interface QueryParams {
  [key: string]: string
}
function OAuth() {
  const { setUser } = useUserStore((state) => state)
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const handleData = () => {
    try {
      // 카카오 로그인 유저 정보 쿼리 스트링으로 가져옴
      const data = window.location.search
      // 쿼리 스트링 값 객체로 변환하는 함수
      const parseQueryString = (data: string): QueryParams => {
        const trimmedQueryString = data.replace(/^\?/, "")
        const queryObject: QueryParams = {}
        trimmedQueryString.replace(/([^&=]+)=([^&]*)/g, (match, key, value) => {
          queryObject[key] = decodeURIComponent(value)
          return match
        })
        return queryObject
      }
      // 변환한 유저 정보 객체 변수 초기화
      const queryParams = parseQueryString(data)
      console.log(queryParams)

      /**
       * 1. 유저 정보 전역 상태 값으로 저장
       * 2. isnNewUser 값에 따라 페이지 이동 선택
       *  2-1. isNewUser === "true" => "/join" 페이지로 이동
       *    2-1-1. "/join" 페이지에서 유저 상태 값 받아와서 placeholder에 넣어주기
       *   2-1-2. "/join" 페이지로 넘어갈 때 location.state로 유저 정보 전달
       *  2-2. isNewUser === "false" => 토큰 값 받아서 쿠키에 저장 후 "/minihome" 페이지로 이동
       */
      if (queryParams?.isNewUser === "true") {
        setUser({
          isNewUser: queryParams.isNewUser,
          loginId: queryParams.loginId,
          loginType: queryParams.loginType,
          nickname: queryParams.nickname,
          profileUrl: queryParams.profileUrl,
          accessToken: queryParams.accessToken,
          refreshToken: queryParams.refreshToken,
        })
        alert("첫 방문이시네요! 회원가입을 진행해주세요.")
        navigate("/join")
      } else if (queryParams?.isNewUser === "false") {
        setUser({
          isNewUser: queryParams.isNewUser,
          loginId: queryParams.loginId,
          loginType: queryParams.loginType,
          nickname: queryParams.nickname,
          profileUrl: queryParams.profileUrl,
          accessToken: queryParams.accessToken,
          refreshToken: queryParams.refreshToken,
        })
        localStorage.setItem("AccessToken", JSON.stringify(queryParams.accessToken))
        localStorage.setItem("RefreshToken", JSON.stringify(queryParams.refreshToken))
        alert("돌아오신 것을 환영합니다!")
        navigate("/main")
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  return <div>카카오 로그인 진행중...</div>
}

export default OAuth
