export enum BOX_TYPE {
	LIGHT = 'light_box',
	DISPLAY = 'display_box'
}

export const boxSelect = [
	{ value: BOX_TYPE.LIGHT, label: 'Light box' },
	{ value: BOX_TYPE.DISPLAY, label: 'display box' }
];

type BoxSizeType = {
	height: number;
	width: number;
	depth: number;
};

export type BoxControlType = {
	boxType: BOX_TYPE;
	color: string;
	useTransparent: boolean;
	useTexture?: boolean;
	roughness?: number;
	transmission?: number;
	metalness?: number;
	size: BoxSizeType;
};

export type LightingControlType = {
	color: string;
	intensity: number;
};

export type DirectionalLightControlType = LightingControlType & {
	position: [number, number, number];
	target: [number, number, number];
};

export type SpotLightControlType = LightingControlType & {
	distance: number;
	angle: number;
	penumbra: number;
	decay: number;
	power: number;
	position: [number, number, number];
};

export type ModelControlType = {
	scale: number;
	isRotating: boolean;
	rotationSpeed: number;
};

export type SettingType = {
	isSettingOpen: boolean;
	isCameraOpen: boolean;
};
