import { RequestHeaders } from 'next/dist/client/components/router-reducer/fetch-server-response';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const requestOptions: globalThis.RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };
  const res = await fetch(`http://localhost:3000${endpoint}`, requestOptions);
  if (!res.ok) {
    throw new Error('request failed');
  }
  return res.json();
}
