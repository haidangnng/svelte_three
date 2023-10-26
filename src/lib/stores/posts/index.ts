import { writable } from 'svelte/store';

type PostType = {
	id?: string | number;
	title?: string;
	description?: string;
};

const postControl = writable<PostType>({
	title: '',
	description: ''
});

export default postControl;
