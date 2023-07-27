import axios, { AxiosResponse } from "axios";
import { Login, User } from "Lib/types";
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
