

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