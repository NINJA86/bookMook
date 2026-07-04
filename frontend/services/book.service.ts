import { apiFetch } from '@/lib/api';
import { IBookPopulated, ICommentInput, ICommentPopulated } from '@/lib/type';

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
      body: JSON.stringify(data),
    });
  },
};
