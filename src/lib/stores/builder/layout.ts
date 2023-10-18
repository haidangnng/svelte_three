import { writable } from 'svelte/store';
import type { SettingType } from './type';

const defaultSettingControl: SettingType = {
	isSettingOpen: false,
	isCameraOpen: false
};

const settingControl = writable<SettingType>(defaultSettingControl);

export default settingControl;
