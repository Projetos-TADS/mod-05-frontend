import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { TActorCreateFormValues } from "../components/ActorCreateForm/actorCreateFormSchema";
import { TActorUpdateFormValues } from "../components/ActorUpdateForm/actorUpdateFormSchema";

interface IActorProviderProps {
  children: React.ReactNode;
}

export interface IActor {
  actorId: string;
  name: string;
  birthDate: string;
  nationality: string;
}

interface IActorResponse {
  actorId: string;
  name: string;
  birthDate: string;
  nationality: string;
}

interface IActorContext {
  actorsList: IActor[] | null;
  actorCreate: (
    formData: TActorCreateFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  actorDelete: (actorId: string) => Promise<void>;
  actorUpdate: (newActorData: TActorUpdateFormValues, actorId: string) => Promise<void>;
  setModalActorEdit: React.Dispatch<React.SetStateAction<boolean>>;
  modalActorEdit: boolean;
}

export const ActorContext = createContext({} as IActorContext);

export const ActorProvider = ({ children }: IActorProviderProps) => {
  const [actorsList, setActorsList] = useState<IActor[]>([]);
  const [modalActorEdit, setModalActorEdit] = useState<boolean>(false);

  useEffect(() => {
    const actorsLoad = async () => {
      const userToken: string | null = localStorage.getItem("@USERTOKEN");

      try {
        const { data } = await api.get<IActorResponse[]>("/actors", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setActorsList(data);
      } catch (error) {
        console.log(error);
      }
    };

    actorsLoad();
  }, []);

  const actorCreate = async (
    formData: TActorCreateFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      const { data } = await api.post<IActor>("/actors", formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setActorsList([...actorsList, data]);
      console.log("Cadastro de ator feito");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const actorUpdate = async (newActorData: TActorUpdateFormValues, actorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      // setLoading(true);

      const { data } = await api.patch<IActor>(`/actors/${actorId}`, newActorData, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const updatedActor = actorsList.filter((currentActor) => currentActor.actorId !== actorId);

      setActorsList([...updatedActor, data]);

      console.log(data);
      console.log("Ator Atualizado");
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const actorDelete = async (actorId: string) => {
    const userToken: string | null = localStorage.getItem("@USERTOKEN");

    try {
      await api.delete(`/actors/${actorId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const updatedActorList = actorsList.filter(
        (currentActor) => currentActor.actorId !== actorId
      );
      setActorsList(updatedActorList);
      console.log("Ator deletado");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActorContext.Provider
      value={{
        actorsList,
        actorCreate,
        actorDelete,
        actorUpdate,
        setModalActorEdit,
        modalActorEdit,
      }}
    >
      {children}
    </ActorContext.Provider>
  );
};
