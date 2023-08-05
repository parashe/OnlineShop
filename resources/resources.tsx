import axios, { AxiosResponse } from "axios";
import { Categories, Login, User, userRole } from "Lib/types";
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

export const UseCategory = () => {
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

export const UseCategoryWithParentID = async () => {
  try {
    return useQuery<Categories>(["categories"], async () => {
      const response: AxiosResponse<Categories> = await axios.get(
        `${Base_Url}/categories-without-parentId`
      );
      return response.data; // Return the data directly
    });
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
