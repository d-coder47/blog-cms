export interface Photo {
  url: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  photo: Photo;
}

export interface Category {
  slug: string;
  name: string;
}

export interface PostInterface {
  slug: string;
  title: string;
  excerpt: string;
  createdAt: string;
  author: Author;
  categories: Category[];
  featuredImage: Photo;
}
