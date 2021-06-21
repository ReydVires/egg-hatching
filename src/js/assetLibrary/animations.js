import { AssetType } from "../const/assetType";
import { Assets } from "./assetGameplay";
import { Assets as AssetsHatch } from "./assetHatch";

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
	char_excited: {
		key: "char_excited",
		type: AssetType.ANIMATION,
		spritesheetRef: Assets.char_excited.key,
		start: 0,
		end: 33,
		frameSpeed: 24,
		loop: false
	},
	electricity: {
		key: "electricity",
		type: AssetType.ANIMATION,
		spritesheetRef: Assets.electricity.key,
		start: 0,
		end: 7,
		frameSpeed: 12,
		loop: false
	},
	egg_crack: {
		key: "egg_crack",
		type: AssetType.ANIMATION,
		spritesheetRef: AssetsHatch.egg_crack.key,
		start: 0,
		end: 89,
		frameSpeed: 24,
		loop: false
	},
	egg_hatch: {
		key: "egg_hatch",
		type: AssetType.ANIMATION,
		spritesheetRef: AssetsHatch.egg_hatch.key,
		start: 0,
		end: 29,
		frameSpeed: 24,
		loop: false
	},

};