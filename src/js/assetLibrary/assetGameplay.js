import { AssetType } from "../const/assetType";

export const Assets = {

	background: {
		key: "background",
		url: "/img/img_background.jpg",
		type: AssetType.STATIC
	},
	board: {
		key: "board",
		url: "/img/img_board.png",
		type: AssetType.STATIC
	},
	window: {
		key: "window",
		url: "/img/img_window.png",
		type: AssetType.STATIC
	},
	nest: {
		key: "nest",
		url: "/img/img_nest.png",
		type: AssetType.STATIC
	},
	blue_egg: {
		key: "blue_egg",
		url: "/img/img_blue_egg.png",
		type: AssetType.STATIC
	},
	leaf: {
		key: "leaf_left",
		url: "/img/img_leaf_left.png",
		type: AssetType.STATIC
	},
	lamp: {
		key: "lamp",
		url: "/img/img_lamp.png",
		type: AssetType.STATIC
	},
	clock: {
		key: "clock",
		url: "/img/ui/img_clock.png",
		type: AssetType.STATIC
	},
	energy: {
		key: "energy",
		url: "/img/ui/img_energy.png",
		type: AssetType.STATIC
	},
	// SPRITESHEET
	char_idle: {
		key: "char_idle",
		url: "/img/spr_char_idle.png",
		width: 7200/24,
		height: 300,
		type: AssetType.SPRITESHEET
	},

};