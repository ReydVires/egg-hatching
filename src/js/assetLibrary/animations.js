import { AssetType } from "../const/assetType";
import { Assets } from "./assetGameplay";

export const Animations = {

	char_idle: {
		key: "char_idle",
		type: AssetType.ANIMATION,
		spritesheetRef: Assets.char_idle.key,
		start: 0,
		end: 23,
		frameSpeed: 18,
		loop: true
	},

};