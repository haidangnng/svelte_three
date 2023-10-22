import { writable } from 'svelte/store';
import type { ToastType } from './type';

const toastStore = () => {
	const defaultToast: ToastType[] = [];

	const { subscribe, set, update } = writable<ToastType[]>(defaultToast);

	const methods = {
		timerToast() {
			update((state) => {
				if (state.length < 0) return state;
				state.pop();
				return state;
			});
		},
		removeToast(id: string) {
			update((state) => {
				const filteredToast = state.filter((i) => i.id !== id);
				return filteredToast;
			});
		},
		addToast(toast: ToastType) {
			update((state) => [...state, toast]);
		},
		clearToast() {
			set(defaultToast);
		}
	};

	return {
		subscribe,
		...methods
	};
};

export default toastStore();
