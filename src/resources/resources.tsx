import axios, { AxiosResponse } from "axios";
import {
  Address,
  Brand,
  Carousel,
  Cart,
  Categories,
  Color,
  Contact,
  Login,
  Order,
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

interface AddressProps {
  postCode: string;

  city: string;
  user: string | undefined;
  userAddress: string;
}

// Use a more descriptive name for the function
export const createAddress = async (
  postCode: string,
  userAddress: string,
  city: string
): Promise<Address> => {
  const user = Cookies.get("userID");

  const body: AddressProps = {
    postCode,
    userAddress,
    city,
    user,
  };

  try {
    const response: AxiosResponse<Address> = await axios.post(
      `${Base_Url}/addresses`,
      body
    );

    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const UseAddressAccordingToUser = () => {
  try {
    return useQuery<Address, Error>(["address"], async () => {
      const user = Cookies.get("userID");

      const response: AxiosResponse<Address> = await axios.get(
        `${Base_Url}/addresses/user/${user}`
      );
      return response.data;
    });
  } catch (error: any) {
    throw new Error("Error fetching user address");
  }
};

interface OrderProps {
  address: string;
  items: any[]; // Change the type to match your data
  totalAmount: number;
  orderStatus: string;
  payment: string[];
  user: string;
}

export const createOrder = async (
  items: any[], // Change the type to match your data
  address: string,
  payment: string[],

  totalAmount: number
): Promise<Order> => {
  const user = Cookies.get("userID") || "";
  const orderStatus = "ordered";
  const body: OrderProps = {
    items,
    address,
    orderStatus,
    payment,
    user,
    totalAmount,
  };

  try {
    const response: AxiosResponse<Order> = await axios.post(
      `${Base_Url}/orders`,
      body
    );

    return response.data; // Return the data directly
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while making the request."
      );
    } else {
      throw new Error("An error occurred.");
    }
  }
};

export const UseOrder = () => {
  try {
    return useQuery<Order, Error>(["order"], async () => {
      const user = Cookies.get("userID");

      const response: AxiosResponse<Order> = await axios.get(
        `${Base_Url}/orders/${user}`
      );
      return response.data;
    });
  } catch (error: any) {
    throw new Error("Error fetching user orders");
  }
};

interface ContactProps {
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  email: string;
  message: string;
}

export const createContact = async (
  contact: ContactProps
): Promise<Contact> => {
  try {
    const response: AxiosResponse<Contact> = await axios.post(
      `${Base_Url}/contacts`,
      contact
    );
    console.log("contact", contact);

    return response.data; // Return the data directly
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while saving the contact."
    );
  }
};

export const UseCarousel = () => {
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
interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<ChangePasswordProps> => {
  try {
    // Define the request body with oldPassword and newPassword
    const requestBody = {
      currentPassword: oldPassword,
      newPassword: newPassword,
    };

    const id = Cookies.get("userID");

    // Make a POST request to change the password
    const response: AxiosResponse<ChangePasswordProps> = await axios.put(
      `${Base_Url}/users/changepassword/${id}`,
      requestBody
    );

    return response.data;

    // Password changed successfully
  } catch (error: any) {
    // Handle errors here
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while changing the password."
    );
  }
};

interface ResetPasswordProps {
  email: string;
}

export const ResetPassword = async (
  email: string
): Promise<ResetPasswordProps> => {
  try {
    // Define the request body with oldPassword and newPassword
    const requestBody = {
      email: email,
    };
    console.log("requestBody", requestBody);

    const id = Cookies.get("userID");

    // Make a POST request to change the password
    const response: AxiosResponse<ResetPasswordProps> = await axios.post(
      `${Base_Url}/request-password-reset`,
      requestBody
    );

    return response.data;

    // Password changed successfully
  } catch (error: any) {
    // Handle errors here
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while reseting  the password."
    );
  }
};
