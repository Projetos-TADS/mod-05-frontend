import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { TSignupFormValues } from "../components/SignupForm/signupFormSchema";
import { TLoginFormValues } from "../components/SigninForm/loginFormSchema";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUser {
  userId: string;
  name: string;
  email: string;
  admin: boolean;
}

interface IUserContext {
  user: IUser | null;
  userSignin: (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userSignup: (
    formData: TSignupFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userLogout: () => void;
  userEdit: (
    newUserData: unknown,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  // isEditUserProfileModalOpen: boolean;
  // setIsEditUserProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // editUserProfile: (newUserData: IRegisterUserFormData) => Promise<void>;
  // setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

interface IUserSigninResponse {
  user: IUser;
  token: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");
    const userId: string | null = localStorage.getItem("@USERID");

    const userAutoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUser(data);
        navigate("/movies");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("@USERTOKEN");
        localStorage.removeItem("@USERID");
      }
    };

    if (userToken && userId) userAutoLogin();
  }, [navigate]);

  const userSignin = async (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      const { data } = await api.post<IUserSigninResponse>("/login", formData);
      localStorage.setItem("@USERTOKEN", data.token);
      localStorage.setItem("@USERID", data.user.userId);
      setUser(data.user);
      navigate("/movies");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userSignup = async (
    formData: TSignupFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await api.post<IUser>("/users", formData);
      console.log("Cadastro feito");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = async () => {
    localStorage.removeItem("@USERTOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  };

  const userEdit = async (
    newUserData: unknown,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");
    const userId: string | null = localStorage.getItem("@USERID");

    try {
      setLoading(true);

      const { data } = await api.patch<IUser>(`/users/${userId}`, newUserData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ userSignin, userSignup, userLogout, userEdit, user }}>
      {children}
    </UserContext.Provider>
  );
};
