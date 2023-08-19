import axios, { AxiosResponse } from "axios";
import {
  Address,
  Brand,
  Carousel,
  Categories,
  Color,
  Contact,
  Login,
  Order,
  Product,
  Size,
  User,
  userRole,
} from "Lib/types";
import { Base_Url } from "../utils/config";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

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
      roles: ["admin"],
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

export const createCategory = async (
  formData: FormData
): Promise<Categories> => {
  try {
    const response: AxiosResponse<Categories> = await axios.post(
      `${Base_Url}/categories`,
      formData
    );

    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateCategory = async (
  categoryId: number,
  formData: FormData
) => {
  try {
    const response = await axios.put(
      `${Base_Url}/categories/${categoryId}`,
      formData
    );
    return response.data; // Return the updated category data
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

// Function to delete a category
export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await axios.delete(`${Base_Url}/categories/${categoryId}`);
    return response.data; // Return the deleted category data
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseProduct = () => {
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
export const createBrand = async (formData: FormData): Promise<Brand> => {
  try {
    const response: AxiosResponse<Brand> = await axios.post(
      `${Base_Url}/brands`,
      formData
    );

    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateBrand = async (
  formData: FormData,
  id: string
): Promise<Brand> => {
  try {
    const response: AxiosResponse<Brand> = await axios.put(
      `${Base_Url}/brands/${id}`,
      formData
    );

    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const useCarousel = () => {
  return useQuery<Carousel>(["carousels"], async () => {
    try {
      const response: AxiosResponse<Carousel> = await axios.get(
        `${Base_Url}/carousels`
      );
      return response.data; // Return the data directly
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  });
};
export const createCarousel = async (formData: FormData): Promise<Carousel> => {
  try {
    const response: AxiosResponse<Carousel> = await axios.post(
      `${Base_Url}/carousels`,
      formData
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateCarousel = async (
  formData: FormData,
  id: string
): Promise<Carousel> => {
  try {
    const response: AxiosResponse<Carousel> = await axios.put(
      `${Base_Url}/carousels/${id}`,
      formData
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCarousel = async (id: string): Promise<Carousel> => {
  try {
    const response: AxiosResponse<Carousel> = await axios.delete(
      `${Base_Url}/carousels/${id}`
    );
    return response.data; // Return the data directly
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

export const createSize = async (size: string): Promise<Size> => {
  try {
    const body = {
      sizeName: size,
    };
    const response: AxiosResponse<Size> = await axios.post(
      `${Base_Url}/sizes`,
      body
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateSize = async (size: string, id: string): Promise<Size> => {
  try {
    const body = {
      sizeName: size,
    };

    const response: AxiosResponse<Size> = await axios.put(
      `${Base_Url}/sizes/${id}`,
      body
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const deleteSize = async (id: string): Promise<Size> => {
  try {
    const response: AxiosResponse<Size> = await axios.delete(
      `${Base_Url}/sizes/${id}`
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

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

export const createColor = async (color: string): Promise<Color> => {
  try {
    const body = {
      colorName: color,
    };
    const response: AxiosResponse<Color> = await axios.post(
      `${Base_Url}/colors`,
      body
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const updateColor = async (
  color: string,
  id: string
): Promise<Color> => {
  try {
    const body = {
      colorName: color,
    };

    const response: AxiosResponse<Color> = await axios.put(
      `${Base_Url}/colors/${id}`,
      body
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
export const deleteColor = async (id: string): Promise<Color> => {
  try {
    const response: AxiosResponse<Color> = await axios.delete(
      `${Base_Url}/colors/${id}`
    );
    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseOrder = () => {
  try {
    return useQuery<Order, Error>(["order"], async () => {
      const response: AxiosResponse<Order> = await axios.get(
        `${Base_Url}/orders`
      );
      return response.data;
    });
  } catch (error: any) {
    throw new Error("Error fetching user orders");
  }
};

export const UseAddress = () => {
  try {
    return useQuery<Address, Error>(["address"], async () => {
      const response: AxiosResponse<Address> = await axios.get(
        `${Base_Url}/addresses`
      );
      return response.data;
    });
  } catch (error: any) {
    throw new Error("Error fetching user address");
  }
};

export const UseMessage = () => {
  try {
    return useQuery<Contact, Error>(["order"], async () => {
      const response: AxiosResponse<Contact> = await axios.get(
        `${Base_Url}/contacts`
      );
      return response.data;
    });
  } catch (error: any) {
    throw new Error("Error fetching user orders");
  }
};
