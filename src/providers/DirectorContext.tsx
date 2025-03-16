import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { TDirectorCreateFormValues } from "../components/DirectorCreateForm/directorCreateFormSchema";
import { TDirectorUpdateFormValues } from "../components/DirectorUpdateForm/directorUpdateFormSchema";

interface IDirectorProviderProps {
  children: React.ReactNode;
}

export interface IDirector {
  directorId: string;
  name: string;
  birthDate: string;
  nationality: string;
}

interface IDirectorResponse {
  directorId: string;
  name: string;
  birthDate: string;
  nationality: string;
}

interface IDirectorContext {
  directorsList: IDirector[] | null;
  directorCreate: (
    formData: TDirectorCreateFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  directorDelete: (directorId: string) => Promise<void>;
  directorUpdate: (newDirectorData: TDirectorUpdateFormValues, directorId: string) => Promise<void>;
  setModalDirectorEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalDirectorEdit: boolean;
}

export const DirectorContext = createContext({} as IDirectorContext);

export const DirectorProvider = ({ children }: IDirectorProviderProps) => {
  const [directorsList, setDirectorsList] = useState<IDirector[]>([]);
  const [modalDirectorEdit, setModalDirectorEdit] = useState<boolean>(false);

  useEffect(() => {
    const directorsLoad = async () => {
      const userToken: string | null = localStorage.getItem("@USERTOKEN");

      try {
        const { data } = await api.get<IDirectorResponse[]>("/directors", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setDirectorsList(data);
      } catch (error) {
        console.log(error);
      }
    };

    directorsLoad();
  }, []);

  const directorCreate = async (
    formData: TDirectorCreateFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      const { data } = await api.post<IDirector>("/directors", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setDirectorsList([...directorsList, data]);
      console.log("Cadastro de diretor feito");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const directorUpdate = async (newDirectorData: TDirectorUpdateFormValues, directorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      // setLoading(true);

      const { data } = await api.patch<IDirector>(`/directors/${directorId}`, newDirectorData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const updatedDirectors = directorsList.filter(
        (currentDirector) => currentDirector.directorId !== directorId
      );

      setDirectorsList([...updatedDirectors, data]);

      console.log("Diretor Atualizado");
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const directorDelete = async (directorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      await api.delete(`/directors/${directorId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const updatedDirectorsList = directorsList.filter(
        (currentDirector) => currentDirector.directorId !== directorId
      );
      setDirectorsList(updatedDirectorsList);
      console.log("Diretor deletado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DirectorContext.Provider
      value={{
        directorsList,
        directorCreate,
        directorDelete,
        directorUpdate,
        setModalDirectorEdit,
        modalDirectorEdit,
      }}
    >
      {children}
    </DirectorContext.Provider>
  );
};
