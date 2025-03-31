import "antd";

declare module "antd" {
	export interface FormProps {
		children?: React.ReactNode;
		layout?: "horizontal" | "vertical";
		onFinish?: (values: any) => void;
		style?: React.CSSProperties;
	}

	export interface FormItemProps {
		children?: React.ReactNode;
		label?: React.ReactNode;
		validateStatus?: "" | "success" | "warning" | "error" | "validating";
		help?: React.ReactNode;
	}

	export interface AlertProps {
		message?: React.ReactNode;
		type?: "success" | "info" | "warning" | "error";
		showIcon?: boolean;
		style?: React.CSSProperties;
	}

	export interface ButtonProps {
		children?: React.ReactNode;
		type?: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
		htmlType?: "button" | "submit" | "reset";
		loading?: boolean;
		block?: boolean;
		size?: "large" | "middle" | "small";
	}

	export interface InputProps {
		id?: string; // Tornando id opcional
		status?: "" | "warning" | "error";
		placeholder?: string;
		disabled?: boolean;
		onChange?: React.ChangeEventHandler<HTMLInputElement>;
		onBlur?: React.FocusEventHandler<HTMLInputElement>;
		value?: string;
		name?: string;
		ref?: React.Ref<HTMLInputElement>;
	}

	export interface InputPasswordProps extends InputProps {
		visibilityToggle?: boolean;
	}

	const Input: React.FC<InputProps> & {
		Password: React.FC<PasswordProps>;
		Group: React.FC<any>;
		Search: React.FC<any>;
		TextArea: React.FC<any>;
	};

	export default Input;
}
