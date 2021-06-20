import { AssetType } from "../const/assetType";

export const FontAsset = {

	arial: {
		key: "arial",
		path: "",
		type: AssetType.FONT
	},
	cabin: {
		key: "cabin",
		path: "/fonts/Cabin-Medium.ttf",
		type: AssetType.FONT
	},

};

export function fontList() {
	return Object.values(FontAsset).map((asset) => ({
		key: asset.key,
		url: asset.path
	}));
}