

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
    roles: string[];
    paymentMethods: string[];
    wishlist: string[];
    isNewsletterSubscribed: boolean;
    name?: string;
    email?: string;
    fullName?: string;
    phone?: string;
    createdAt: string;

}