import { writable } from 'svelte/store';
import { type BoxControlType, BOX_TYPE } from './type';

const defaultBoxControl: BoxControlType = {
	boxType: BOX_TYPE.LIGHT,
	useTransparent: true,
	roughness: 0.5,
	transmission: 0.5,
	metalness: 0.5
};

const boxControl = writable<BoxControlType>(defaultBoxControl);

export default boxControl;
