import { Author } from './author.model';
import { Book, Book_tag, Tag } from './book.model';
import { Category } from './category.model';
import { Comment } from './comment.model';
import { User } from './user.model';

// ===== Author <-> Book =====
Author.hasMany(Book, {
  foreignKey: 'author_id',
  as: 'books',
  onDelete: 'CASCADE',
});

Book.belongsTo(Author, {
  foreignKey: 'author_id',
  as: 'author',
  onDelete: 'CASCADE',
});

// ===== Category <-> Book =====
Category.hasMany(Book, {
  foreignKey: 'category_id',
  as: 'books',
  onDelete: 'CASCADE',
});

Book.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
  onDelete: 'CASCADE',
});

// ===== Book <-> Tag =====
Book.belongsToMany(Tag, {
  through: Book_tag,
  foreignKey: 'book_id',
  otherKey: 'tag_id',
});

Tag.belongsToMany(Book, {
  through: Book_tag,
  foreignKey: 'tag_id',
  otherKey: 'book_id',
});

// ===== Book <-> Comment =====
Book.hasMany(Comment, {
  foreignKey: 'book_id',
  as: 'comments',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Book, {
  foreignKey: 'book_id',
  as: 'book',
  onDelete: 'CASCADE',
});

// ===== User <-> Comment =====
User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE',
});

// ===== Book_tag =====
Book.hasMany(Book_tag, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
});

Tag.hasMany(Book_tag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
});

Book_tag.belongsTo(Book, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE',
});

Book_tag.belongsTo(Tag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
});

export { Author, Book, Book_tag, Tag, Category, Comment, User };
