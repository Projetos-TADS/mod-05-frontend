import { useContext, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Alert } from "antd";
import { UserContext } from "../../providers/UserContext";
import { signupFormSchema, TSignupFormValues } from "./signupFormSchema";

export const SignupForm = () => {
	const { userSignup } = useContext(UserContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const { control, handleSubmit } = useForm<TSignupFormValues>({
		resolver: zodResolver(signupFormSchema),
	});

	const onSubmit: SubmitHandler<TSignupFormValues> = async formData => {
		try {
			setLoading(true);
			setError(null);
			await userSignup(formData, setLoading);
		} catch (err) {
			setError("Erro ao cadastrar. Por favor, tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ maxWidth: "100%" }}>
			{error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24 }} />}

			<Controller
				name="name"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="Nome completo"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
						<Input
							{...field}
							placeholder="Seu nome"
							disabled={loading}
							status={fieldState.error ? "error" : ""}
						/>
					</Form.Item>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="E-mail"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
						<Input
							{...field}
							placeholder="seu@email.com"
							disabled={loading}
							status={fieldState.error ? "error" : ""}
						/>
					</Form.Item>
				)}
			/>

			<Controller
				name="cpf"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="CPF"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
						<Input
							{...field}
							placeholder="000.000.000-00"
							disabled={loading}
							status={fieldState.error ? "error" : ""}
						/>
					</Form.Item>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="Senha"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
						<Input
							type="password"
							{...field}
							placeholder="Sua senha"
							disabled={loading}
							status={fieldState.error ? "error" : ""}
						/>
					</Form.Item>
				)}
			/>

			<Controller
				name="confirmPassword"
				control={control}
				render={({ field, fieldState }) => (
					<Form.Item
						label="Confirme sua senha"
						validateStatus={fieldState.error ? "error" : ""}
						help={fieldState.error?.message}>
						<Input
							type="password"
							{...field}
							placeholder="Confirme sua senha"
							disabled={loading}
							status={fieldState.error ? "error" : ""}
						/>
					</Form.Item>
				)}
			/>

			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading} block size="large">
					{loading ? "Cadastrando..." : "Cadastrar"}
				</Button>
			</Form.Item>
		</Form>
	);
};
