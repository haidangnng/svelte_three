import type { OrbitControls } from '@threlte/extras';
import { writable } from 'svelte/store';
import type { PerspectiveCamera } from 'three';

const sceneCamera = writable<PerspectiveCamera>();

const sceneControl = writable<OrbitControls>();

export { sceneCamera, sceneControl };
