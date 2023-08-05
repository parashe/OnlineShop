

export type userRole = "admin" | "user";
export type Login={
    id:string;
    email:string;
    password:string;
    roles:string;
    accessToken:string;
    refreshToken:string;
    error:string;
}
export type User={
    _id:string;
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
}


export type Categories = {
    id: string; // Change the type to string if it's of type string in your data
    _id: number;
    categoryName: string;
    categories: Categories[]; // Change the type to Categories[] for nesting
    categoryImage: string;
    parentCategory: string;
    parentId?: string; // Change the type to string if it's of type string in your data
  };