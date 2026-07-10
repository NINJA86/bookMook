import { redirect } from 'next/navigation';

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${'http://localhost:3000'}${endpoint}`, {
    ...options,

    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    console.log(res.status);
    if (res.status === 401) {
      const refreshRes = await fetch(
        `${'http://localhost:3000/api/auth/refresh'}`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      if (refreshRes.ok) {
        return apiFetch(endpoint, options);
      }

      if (typeof window === 'undefined') {
        redirect('/auth/login');
      } else {
        window.location.href = '/auth/login';
        return new Promise(() => {});
      }
    }
    const err = new Error(data.message) as any;
    err.status = res.status;
    err.fieldErrors = data.fieldErrors;
    throw err;
  }
  return data;
}
