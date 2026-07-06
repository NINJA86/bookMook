export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${'http://localhost:3000'}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',

    ...options,
  });

  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.message) as any;
    err.fieldErrors = data.fieldErrors; // ← جدا نگه دار
    throw err;
  }
  return data;
}
