import type { WebGLRenderer } from 'three';

// const strDownloadMime = 'image/octet-stream';
const strMime = 'image/png';

const saveAsImage = (renderer: WebGLRenderer): string | undefined => {
	try {
		const imgData = renderer.domElement.toDataURL(strMime);
		// saveFile(imgData.replace(strMime, strDownloadMime), 'test.jpg');
		// imgData.replace(strMime, strDownloadMime);

		return imgData;
	} catch (e) {
		return undefined;
	}
};

const saveFile = (strData: string, filename: string) => {
	const link = document.createElement('a');
	if (typeof link.download === 'string') {
		document.body.appendChild(link); //Firefox requires the link to be in the body
		link.download = filename;
		link.href = strData;
		link.click();
		document.body.removeChild(link); //remove the link when done
	}
};

export { saveFile, saveAsImage };
