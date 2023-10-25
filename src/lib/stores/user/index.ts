import type { UserType } from '$lib/types/user';
import { writable } from 'svelte/store';

const userStore = writable<UserType>({
	user_id: '',
	name: '',
	bio: '',
	avatar: ''
});

export default userStore;
