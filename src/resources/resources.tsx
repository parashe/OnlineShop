import axios, { AxiosResponse } from "axios";
import {
  Brand,
  Carousel,
  Cart,
  Categories,
  Color,
  Login,
  Product,
  Size,
  User,
  userRole,
} from "../Lib/types";
import { Base_Url } from "../utils/config";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<Login> => {
  try {
    const body: LoginRequestBody = {
      email,
      password,
    };

    const response: AxiosResponse<Login | ErrorResponse> = await axios.post(
      `${Base_Url}/auth/signin`,
      body
    );

    if ("error" in response.data) {
      // Login failed, throw an error with the error message from the backend
      throw new Error(response.data.error);
    }

    // Login success, return the response data
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid username or password!");
  }
};

export const UserData = (): UseQueryResult<User[] | null, unknown> => {
  return useQuery<User[] | null>(["allUser"], async () => {
    try {
      const response = await axios.get<User[]>(`${Base_Url}/alluser`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching user data");
    }
  });
};

interface createUserProps {
  email: string;
  password: string;
  fullName: string;
  phone: number;
  roles: string[];
}

export const createUser = async (
  email: string,
  password: string,
  fullName: string,
  phone: number
): Promise<User> => {
  try {
    const body: createUserProps = {
      email,
      password,
      fullName,
      phone,
      roles: ["user"],
    };

    const response: AxiosResponse<User> = await axios.post(
      `${Base_Url}/auth/signup`,
      body
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error:", error.message);
    throw new Error(error.response.data.message);
  }
};
interface UpdateUserProps {
  formData: FormData;
  _id: string;
  succes: string;
}

export const updateUser = async (
  formData: FormData,
  _id: string
): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.put(
      `${Base_Url}/users/${_id}`, // Modify the endpoint to match your API endpoint for updating users
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error:", error.message);
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async (_id: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.delete(
      `${Base_Url}/users/${_id}` // Modify the endpoint to match your API endpoint for updating users
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error:", error.message);
    throw new Error(error.response.data.message);
  }
};

export const UseCategory = (id?: string) => {
  try {
    return useQuery<Categories>(["categories"], async () => {
      const response: AxiosResponse<Categories> = await axios.get(
        `${Base_Url}/categories`
      );
      return response.data; // Return the data directly
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseCategoryWithParentID = () => {
  try {
    return useQuery<Categories>(["categorieswithID"], async () => {
      const response: AxiosResponse<Categories> = await axios.get(
        `${Base_Url}/categories-with-parentId`
      );
      return response.data; // Return the data directly
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Function to delete a category

export const UseColor = () => {
  try {
    return useQuery<Color>(["color"], async () => {
      const response: AxiosResponse<Color> = await axios.get(
        `${Base_Url}/colors`
      );
      console.log("response", response);
      return response.data; // Return the data directly
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseSize = () => {
  try {
    return useQuery<Size>(["sizes"], async () => {
      const response: AxiosResponse<Size> = await axios.get(
        `${Base_Url}/sizes`
      );
      return response.data; // Return the data directly
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseBrand = () => {
  try {
    return useQuery<Brand>(["brand"], async () => {
      const response: AxiosResponse<Brand> = await axios.get(
        `${Base_Url}/brands`
      );
      return response.data; // Return the data directly
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseProduct = (id?: string) => {
  try {
    return useQuery<Product>(["product"], async () => {
      const response: AxiosResponse<Product> = await axios.get(
        `${Base_Url}/products`
      );
      return response.data; // Return the data directly
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const useProductDetails = (id?: string) => {
  try {
    return useQuery<Product, Error>(["productdetails", id], async () => {
      if (!id) {
        throw new Error("No product id provided");
      }

      const response: AxiosResponse<Product> = await axios.get(
        `${Base_Url}/productsdetails/${id}`
      );
      return response.data;
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  console.log("formData", formData);
  try {
    const response: AxiosResponse<Product> = await axios.post(
      `${Base_Url}/products`,
      formData
    );

    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateProduct = async (
  id: string,
  formData: FormData
): Promise<Product> => {
  console.log("formData", formData);
  try {
    const response: AxiosResponse<Product> = await axios.put(
      `${Base_Url}/products/${id}`,
      formData
    );

    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseCarousel = () => {
  const fetchCarouselData = async () => {
    try {
      const carousel: Carousel[] = [
        {
          _id: "1",
          title: "Title 1",
          carouselImage: "/images/h.jpg",
        },
        {
          _id: "2",
          title: "Title 2",
          carouselImage: "/images/hh.jpg",
        },
        {
          _id: "3",
          title: "Title 3",
          carouselImage: "/images/home1.jpg",
        },
      ];

      return carousel;
    } catch (error) {
      throw new Error("Error fetching slider data");
    }
  };

  return useQuery<Carousel[]>(["carousel"], fetchCarouselData);
};

interface AddToCartProps {
  product: string;
  quantity: number;
  size: string;
  color: string;
  price: string;
}

export const AddToCart = async (cartItems: AddToCartProps[]): Promise<Cart> => {
  try {
    const user = Cookies.get("userID");
    const response: AxiosResponse<Cart> = await axios.post(
      `${Base_Url}/carts`,
      { cartItems, user }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error:", error.message);
    throw new Error(error.response.data.message);
  }
};

export const UseCart = () => {
  try {
    return useQuery<Cart, Error>(["cart"], async () => {
      const user = Cookies.get("userID");

      const response: AxiosResponse<Cart> = await axios.get(
        `${Base_Url}/carts/${user}`
      );
      return response.data;
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const RemoveFromCart = async (productId: string): Promise<Cart> => {
  try {
    const user_id = Cookies.get("userID");
    const response: AxiosResponse<Cart> = await axios.post(
      `${Base_Url}/removecarts`,
      { productId, user_id } // Send the product ID and user in the request body
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log("Error:", error.message);
    throw new Error(error.response.data.message);
  }
};
