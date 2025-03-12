import { createContext, useState } from "react";
import { api } from "../services/api";
import { ISignupFormData } from "../components/signupForm";
import { ILoginFormData } from "../components/signinForm";
import { useNavigate } from "react-router";

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
  userSignin: (formData: ILoginFormData) => Promise<void>;
  userSignup: (formData: ISignupFormData) => Promise<void>;
  userLogout: () => void;
  // isEditUserProfileModalOpen: boolean;
  // setIsEditUserProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // editUserProfile: (newUserProfileData: IRegisterUserFormData) => Promise<void>;
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

  const userSignin = async (formData: ILoginFormData) => {
    try {
      const { data } = await api.post<IUserSigninResponse>("/login", formData);
      localStorage.setItem("@USERTOKEN", data.token);
      setUser(data.user);
      navigate("/movies");
    } catch (error) {
      console.log(error);
    }
  };

  const userSignup = async (formData: ISignupFormData) => {
    try {
      await api.post<IUser>("/users", formData);
      console.log("Cadastro feito");
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    localStorage.removeItem("@USERTOKEN");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ userSignin, userSignup, userLogout, user }}>
      {children}
    </UserContext.Provider>
  );
};
