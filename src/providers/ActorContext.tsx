import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
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
	actorCreate: (formData: TActorCreateFormValues) => Promise<void>;
	actorDelete: (actorId: string) => Promise<void>;
	actorUpdate: (newActorData: TActorUpdateFormValues, actorId: string) => Promise<void>;
}

export const ActorContext = createContext({} as IActorContext);

export const ActorProvider = ({ children }: IActorProviderProps) => {
	const [actorsList, setActorsList] = useState<IActor[]>([]);

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
			} catch (error: any) {
				toast.error(error.response?.data?.message);
			}
		};

		actorsLoad();
	}, []);

	const actorCreate = async (formData: TActorCreateFormValues) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");

		try {
			const { data } = await api.post<IActor>("/actors", formData, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			setActorsList([...actorsList, data]);
			toast.success("Cadastro de ator feito");
		} catch (error: any) {
			toast.error(error.response?.data?.message);
		}
	};

	const actorUpdate = async (newActorData: TActorUpdateFormValues, actorId: string) => {
		const userToken: string | null = localStorage.getItem("@USERTOKEN");

		try {
			const { data } = await api.patch<IActor>(`/actors/${actorId}`, newActorData, {
				headers: { Authorization: `Bearer ${userToken}` },
			});

			const updatedActor = actorsList.filter(currentActor => currentActor.actorId !== actorId);

			setActorsList([...updatedActor, data]);

			toast.success("Ator Atualizado");
		} catch (error: any) {
			toast.error(error.response?.data?.message);
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

			const updatedActorList = actorsList.filter(currentActor => currentActor.actorId !== actorId);
			setActorsList(updatedActorList);
			toast.success("Ator deletado");
		} catch (error: any) {
			toast.error(error.response?.data?.message);
		}
	};

	return (
		<ActorContext.Provider
			value={{
				actorsList,
				actorCreate,
				actorDelete,
				actorUpdate,
			}}>
			{children}
		</ActorContext.Provider>
	);
};
