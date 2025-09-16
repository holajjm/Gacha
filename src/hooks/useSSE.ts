import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

import { ENV } from "@constants/env";
import { useUserStore } from "@store/store";

interface Notis {
  id: number;
  data: string;
  notificationType: string; //lotto_issued trade_completed
}
interface Options {
  headers: {
    Authorization: string;
  };
  heartbeatTimeout: number;
  withCredentials: boolean;
}
function useSSE() {
  // 유저 전역 상태값
  const user = useUserStore((state) => state.user);
  // SSE 관련 클라이언트 상태들
  const [SSECompleted, setSSECompleted] = useState<string>("");
  const [SSELottoData, setSSELottoData] = useState<Notis>({
    id: 0,
    data: "",
    notificationType: "",
  });
  const [SSETradeData, setSSETradeData] = useState<Notis>({
    id: 0,
    data: "",
    notificationType: "",
  });
  // 구형 브라우저 지원을 위한 Polyfill 객체 사용
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  // 자동 재연결을 위한 타이머 데이터(리렌더링 방지를 위한 Ref 사용)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // SSE 내부 로직
  const initSSE = () => {
    if (!user?.accessToken) {
      console.log("No access token found, skipping SSE connection.");
      return;
    }
    const eventSource = new EventSourcePolyfill(
      `${ENV.SERVER_API}/sse/connect`,
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
        heartbeatTimeout: 300000,
        withCredentials: true,
      } as Options,
    );

    // 최초 SSE 연결
    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    };

    eventSource.onmessage = (event: MessageEvent) => {
      console.log("새로운 이벤트:", event);
      console.log("새로운 데이터:", event.data);
      const data = JSON.parse(event.data);
      console.log(data);
    };

    // 연결 성공 여부 로직
    eventSource.addEventListener("connect", (event: MessageEvent) => {
      try {
        console.log(event.data);
        setSSECompleted(event.data);
      } catch (error) {
        console.warn("JSON 파싱 실패:", error);
      }
    });

    // 로또 발급 여부 알림
    eventSource.addEventListener("lotto_issued", (event: MessageEvent) => {
      try {
        console.log(event.data);
        setSSELottoData(JSON.parse(event.data));
      } catch (error) {
        console.warn("JSON 파싱 실패:", error);
      }
    });

    // 마켓 상품 판매 알림
    eventSource.addEventListener("trade_completed", (event: MessageEvent) => {
      try {
        console.log(event.data);
        setSSETradeData(JSON.parse(event.data));
      } catch (error) {
        console.warn("JSON 파싱 실패:", error);
      }
    });

    // Error 처리 로직
    eventSource.onerror = (error) => {
      console.log("SSE 오류 발생:", error);
      eventSource.close();
      eventSourceRef.current = null;

      // 일정 시간 후 재연결 시도
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("SSE 재연결 시도 중...");
          initSSE();
          reconnectTimeoutRef.current = null;
        }, 5000); // 5초 후 재연결
      }
    };
  };

  // 마운트 & 엑세스 토큰 존재 시 SSE 연결 로직 실행
  useEffect(() => {
    if (user?.accessToken) {
      initSSE();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("SSE 연결이 종료되었습니다.");
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [user?.accessToken]);

  return { SSECompleted, SSELottoData, SSETradeData };
}
export default useSSE;
