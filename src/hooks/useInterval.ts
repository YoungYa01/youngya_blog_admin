// 定义
import { useEffect, useRef } from 'react';

export function useInterval(callback: any, timeout = 1000) {
  const latestCallback = useRef(() => {
  });

  useEffect(() => {
    latestCallback.current = callback;
  });

  useEffect(() => {
    const timer = setInterval(() => latestCallback.current(), timeout);
    return () => clearInterval(timer);
  }, []);
}
