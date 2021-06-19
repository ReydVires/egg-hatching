import { AssetType } from "../const/assetType";
import { _CONFIG as CONFIG } from "../const/gameInfo";

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