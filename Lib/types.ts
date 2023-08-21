export type userRole = "admin" | "user";
export type Login = {
  id: string;
  email: string;
  password: string;
  roles: string;
  accessToken: string;
  refreshToken: string;
  error: string;
};
export type User = {
  _id: string;
  roles?: userRole;
  paymentMethods?: string[];
  wishlist?: string[];
  isNewsletterSubscribed?: boolean;
  email: string;
  fullName: string;
  phone: number;
  createdAt: string;
  success?: boolean;
  password: string;
  message?: string;
};

export type Categories = {
  id: string; // Change the type to string if it's of type string in your data
  _id: number;
  categoryName: string;
  categories: Categories[]; // Change the type to Categories[] for nesting
  categoryImage: string;
  parentCategory: string;
  parentId?: string; // Change the type to string if it's of type string in your data
};

export type Color = {
  _id: string;
  colorName: string;
  colors: Color[];
};

export type Size = {
  _id: string;
  sizeName: string;
  sizes: Size[];
};

export type Brand = {
  _id: string;
  brandName: string;
  brands: Brand[];
  brandImage: string;
};

export type Product = {
  _id: string;
  productName: string;
  productImages: [];
  brand: string;
  category: string;
  stockQuantity: string;
  sizes: Size;
  colors: Color;
  products: Product[];
  rating: number;
  description: string;
  price: string;
  discountPrice: string;
};

export type Carousel = {
  _id: string;
  carouselImage: string;
  carouselName: string;
  carousels: Carousel[];
};

export type Order = {
  _id: string;
  quantity: number;
  size: string;
  color: string;
  price: string;
  user_id: string;
  success: boolean;
  user: string;
  orderItems: Order[];
  productName: string;
  productImage: string;
  orders: Order[];
  orderStatus: OrderStatus[];
  items: any[];
  address: Address;
  totalAmount: string;
};
export type OrderStatus = {
  type: string;
  isCompleted: boolean;
  _id: string;
};

export type Address = {
  _id: string;
  addresses: Address[];
  city: string;
  postCode: string;
  user_id: string;
  success: boolean;
  user: string;
  userAddress: string;
};

export type Contact = {
  _id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
  contacts: Contact[];
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
};
