// event-source-polyfill.d.ts
interface Notis {
  id: number;
  data: string;
  notificationType: string; //lotto_issued trade_completed
}
declare module 'event-source-polyfill' {
  export class EventSourcePolyfill {
    constructor(url: string, eventSourceInitDict?: EventSourceInit & { headers?: Record<string, string> });
    close(): void;
    onopen: ((ev: Notis) => void) | null;
    onmessage: ((ev: MessageEvent) => void) | null;
    onerror: ((error:Error) => void) | null;
    addEventListener(type: string, listener: ((ev: MessageEvent) => void)): void;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
    url: string;
    withCredentials: boolean;
    readyState: number;
  }
}
