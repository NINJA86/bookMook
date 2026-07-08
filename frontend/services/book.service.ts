import { apiFetch } from '@/lib/api';
import {
  IBookPopulated,
  ICommentInput,
  ICommentPopulated,
  ILoginUser,
  IRegisterUser,
} from '@/lib/type';

export const bookService = {
  getAllBooks(): Promise<IBookPopulated[]> {
    return apiFetch('/api/book/getAll');
  },
  getBookBySlug(slug: string): Promise<IBookPopulated> {
    return apiFetch(`/api/book/${slug}`);
  },
  getFeatruedComments(): Promise<ICommentPopulated[]> {
    return apiFetch('/api/comment/featured');
  },
  getCommentByBookId(id: string): Promise<ICommentPopulated[]> {
    return apiFetch(`/api/comment/${id}`);
  },

  addCommentWithBookId(bookId: string, data: ICommentInput) {
    return apiFetch(`/api/comment/${bookId}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    });
  },

  register(userData: IRegisterUser) {
    return apiFetch(`/api/auth/register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userData),
    });
  },
  login(userData: ILoginUser) {
    return apiFetch(`/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userData),
    });
  },
  forgotPassword(email: any) {
    return apiFetch(`/api/auth/reset-code`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email }),
    });
  },

  verifyCode(userData: any) {
    //TODO do not forget to add a specific type for userData

    return apiFetch(`/api/auth/verify-code`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userData),
    });
  },
  resetPassword(userData: any) {
    return apiFetch(`/api/auth/reset-password`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(userData),
    });
  },
};
