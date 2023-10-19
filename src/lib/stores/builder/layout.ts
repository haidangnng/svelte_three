import { writable } from 'svelte/store';
import type { SettingType } from './type';

const defaultSettingControl: SettingType = {
	isSettingOpen: true,
	isCameraOpen: true
};

const settingControl = writable<SettingType>(defaultSettingControl);

export default settingControl;
