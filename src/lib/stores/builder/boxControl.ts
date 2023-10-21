import { writable } from 'svelte/store';
import { type BoxControlType, BOX_TYPE } from './type';

const defaultBoxControl: BoxControlType = {
	boxType: BOX_TYPE.LIGHT,
	color: '#ffffff',
	useTransparent: true,
	roughness: 0.5,
	transmission: 0.5,
	metalness: 0.5,
	size: [20, 20, 20]
};

const boxControl = writable<BoxControlType>(defaultBoxControl);

export default boxControl;
