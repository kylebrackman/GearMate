import { User } from "../Models/UserModel";
// const API_URL = import.env.meta.VITE_APP_API_URL;

/**
 * Retrieves the current user from the server. If no user is logged in, returns null.
 * @returns The current user or null if no user is logged in.
 */
export async function getUserApi(): Promise<User | null> {
  try {
    const response = await fetch("/api/me", {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function loginUserApi(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // Assuming the backend sets a specific status code for validation errors
      if (response.status === 400) {
        // Example status code for bad request
        throw new Error(`Validation Error: ${errorData.error}`);
      } else if (response.status === 401) {
        throw new Error(`Unauthorized: ${errorData.error}`);
      }
    } else {
      const user = await response.json();
      return user;
    }
  } catch (error) {
    throw error;
  }
  // Review neccessity of below line with KT to go over typescript error upon removal
  return null;
}

export async function signUpUserApi(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordConfirmation: string
): Promise<User | null> {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors ? errorData.errors : "Failed to sign up"
      );
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error; // You can rethrow or handle it differently depending on your needs
  }
}

export async function logoutUserApi(): Promise<void> {
  try {
    const response = await fetch("/api/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }

    return;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}
