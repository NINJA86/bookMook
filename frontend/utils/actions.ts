'use server';
import { ILoginUser } from '@/lib/type';
import { bookService } from '@/services/book.service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/navigation';
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
export { register, login };
