'use server';
import { ILoginUser } from '@/lib/type';
import { bookService } from '@/services/book.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/navigation';
const RESET_TOKEN_EXPIRY = 10 * 60 * 1000;
const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000;
const register = async (prevState: any, formData: FormData) => {
  const email = formData.get('email') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  const userData = { email, phoneNumber, password, name };
  console.log(userData);
  let res: any;
  try {
    res = await bookService.register(userData);
  } catch (error: any) {
    console.log({ fieldErrors: error.fieldErrors, error: error.message });
    return { fieldErrors: error.fieldErrors, error: error.message };
  }
  const cookieStore = await cookies();
  cookieStore.set('accessToken', res.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: ACCESS_TOKEN_EXPIRY,
  });
  redirect('/');
};
const login = async (prevState: any, formData: FormData) => {
  const numberORemail = formData.get('numberORemail') as string;
  const password = formData.get('password') as string;
  const phoneNumberRegex = /^0[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailRegex.test(numberORemail) &&
    !phoneNumberRegex.test(numberORemail)
  ) {
    return {
      fieldErrors: { numberORemail: 'invalid phone number or email' },
    };
  }

  const userData: ILoginUser = {
    password,
    ...(emailRegex.test(numberORemail)
      ? { email: numberORemail }
      : { phoneNumber: numberORemail }),
  };
  let res: any;
  try {
    res = await bookService.login(userData);
  } catch (error: any) {
    return { fieldErrors: error.fieldErrors, error: error.message };
  }
  console.log(res);
  const cookieStore = await cookies();

  cookieStore.set('accessToken', res.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: ACCESS_TOKEN_EXPIRY,
  });

  redirect('/');
};

const forgotPassword = async (prevstate: any, formData: FormData) => {
  redirect('/auth/reset-password');
};
const sendCodeAction = async (prevstate: any, formData: FormData) => {
  const email = formData.get('email') as string;

  const cookieStore = await cookies();

  cookieStore.set('resetEmail', email, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 10,
  });

  console.log(email);

  let res: any;
  try {
    res = await bookService.forgotPassword(email);
  } catch (error: any) {
    return { fieldErrors: error.fieldErrors, error: error.message };
  }
  cookieStore.set('resetToken', res.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: RESET_TOKEN_EXPIRY,
  });

  console.log(res);
  return { step: 'code', email };
};

const verifyCodeAction = async (prevState: any, formData: FormData) => {
  const code = Array.from({ length: 6 }, (_, i) =>
    formData.get(`code-${i}`),
  ).join('');

  const cookieStore = await cookies();

  const email = cookieStore.get('resetEmail')?.value;
  console.log(code, email);

  const userData = { email, code };
  let res: any;
  try {
    res = await bookService.verifyCode(userData);
  } catch (error: any) {
    return { fieldErrors: error.fieldErrors, error: error.message };
  }

  return {
    step: 'reset',
    code,
  };
};

const resetPasswordAction = async (prevState: any, formData: FormData) => {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const email = formData.get('email') as string;

  if (password !== confirmPassword) {
    return { error: 'passwords do not match' };
  }

  try {
    await bookService.resetPassword({ email, password });
  } catch (error: any) {
    return { error: error.message };
  }

  redirect('/auth/login');
};

export {
  register,
  login,
  forgotPassword,
  sendCodeAction,
  resetPasswordAction,
  verifyCodeAction,
};
