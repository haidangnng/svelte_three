export enum ToastEnum {
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	WARNING = 'WARNING'
}

export type ToastType = {
	id: string;
	type: ToastEnum;
	title: string;
	description: string;
};
