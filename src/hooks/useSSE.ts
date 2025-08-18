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
    Authorization: string
  },
  heartbeatTimeout: number,
  withCredentials: boolean
}
function useSSE() {
  const user = useUserStore((state) => state.user);
  const [SSECompleted, setSSECompleted] = useState<string>("");
  const [SSETestData, setSSETestData] = useState<Notis>({
    id: 0,
    data: "",
    notificationType: "",
  });
  const [SSETest2Data, setSSETest2Data] = useState<Notis>({
    id: 0,
    data: "",
    notificationType: "",
  });
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initSSE = () => {
    if (!user?.accessToken) {
      console.log("No access token found, skipping SSE connection.");
      return;
    }
    const eventSource = new EventSourcePolyfill(`${ENV.SERVER_API}/sse/connect`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      heartbeatTimeout: 300000,
      withCredentials: true,
    } as Options);

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    };

    eventSource.onmessage = (event: MessageEvent) => {
      console.log("새로운 이벤트:", event);
      console.log("새로운 데이터:", event.data);
      const data = JSON.parse(event.data);
      console.log(data);
    };

    eventSource.addEventListener("connect", (event: MessageEvent) => {
      try {
        console.log(event.data);
        setSSECompleted(event.data);
      } catch (error) {
        console.warn("JSON 파싱 실패:", error);
      }
    });
    eventSource.addEventListener("lotto_issued", (event: MessageEvent) => {
      try {
        console.log(event.data);
        setSSETestData(JSON.parse(event.data));
      } catch (error) {
        console.warn("JSON 파싱 실패:", error);
      }
    });
    eventSource.addEventListener("trade_completed", (event: MessageEvent) => {
      try {
        console.log(event.data);
        setSSETest2Data(JSON.parse(event.data));
      } catch (error) {
        console.warn("JSON 파싱 실패:", error);
      }
    });

    // eventSource.onerror = (error) => {
    //   console.log("SSE 오류 발생:", error);
    //   eventSource.close();
    // };
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
  return { SSECompleted, SSETestData, SSETest2Data };
}
export default useSSE;
