import { writable } from 'svelte/store';
import { type BoxControlType, BOX_TYPE } from './type';

const defaultBoxControl: BoxControlType = {
	boxType: BOX_TYPE.LIGHT,
	color: '#ffffff',
	useTexture: false,
	useTransparent: true,
	roughness: 0.5,
	transmission: 0.5,
	metalness: 0.5,
	size: {
		height: 20,
		width: 20,
		depth: 20
	}
};

const boxControl = writable<BoxControlType>(defaultBoxControl);

export default boxControl;
