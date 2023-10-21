import { writable } from 'svelte/store';
import type { WebGLRenderer } from 'three';

const snapshot = writable<WebGLRenderer>();

export default snapshot;
