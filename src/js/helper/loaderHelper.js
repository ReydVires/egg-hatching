import { AssetType } from "../const/assetType";
import { CONFIG } from "../const/gameInfo";

/**
 * @typedef BaseAssetInfoType
 * @property {string} key
 * @property {string} url
*/

/**
 * @param {Phaser.Scene} scene
 * @param {object} assets
 */
export function loadAssets (scene, assets) {
	let assetInfo = null;

	for (const key in assets) {
		assetInfo = Reflect.get(assets, key);
		if (assetInfo.type === AssetType.STATIC) {
			scene.load.image(assetInfo.key, CONFIG.BASE_ASSET_URL + assetInfo.url);
		}
		else if (assetInfo.type === AssetType.SPRITESHEET) {
			scene.load.spritesheet(assetInfo.key, CONFIG.BASE_ASSET_URL + assetInfo.url, {
				frameWidth: assetInfo.width,
				frameHeight: assetInfo.height
			});
		}
		else if (assetInfo.type === AssetType.AUDIO) {
			if (Array.isArray(assetInfo.url)) {
				const audioPath = assetInfo.url.map((/** @type {string} */ path) => CONFIG.BASE_ASSET_URL + path);
				scene.load.audio(assetInfo.key, audioPath);
				continue;
			}
			scene.load.audio(assetInfo.key, CONFIG.BASE_ASSET_URL + assetInfo.url);
		}
		else {
			console.warn("Asset type is undefined::", assetInfo);
		}
	}
}

/**
 * @param {BaseAssetInfoType[]} fonts
 */
export function loadFonts (fonts) {
	return Promise.all(fonts.map((v) => loadFont(v.key, v.url)));
}

/**
 * @param {string} key
 * @param {string} url
 */
function loadFont (key, url) {
	return new Promise((resolve, reject) => {
		if (!url) return resolve();

		const path = CONFIG.BASE_ASSET_URL + url;
		const styles = `@font-face {font-family: "${key}"; src: url("${path}")}`;
		const element = document.createElement("style");
		element.innerHTML = styles;
		document.head.appendChild(element);

		document.fonts.load('10pt "' + key + '"')
			.then(() => resolve())
			.catch(() => reject(Error("load font error :" + path)));
	});
}