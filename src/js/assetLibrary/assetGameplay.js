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
	hud: {
		key: "ui_hud",
		url: "/img/ui/img_ui_hud.png",
		type: AssetType.STATIC
	},
	progress_bar: {
		key: "ui_progress_bar",
		url: "/img/ui/img_ui_progress_bar.png",
		type: AssetType.STATIC
	},
	btn: {
		key: "ui_btn",
		url: "/img/ui/img_ui_btn.png",
		type: AssetType.STATIC
	},
	btn_gray: {
		key: "ui_btn_gray",
		url: "/img/ui/img_ui_btn_gray.png",
		type: AssetType.STATIC
	},
	nest_svg: {
		key: "nest_svg",
		url: "/svg/nest.svg",
		type: AssetType.SVG
	},
	lamp_svg: {
		key: "lamp_svg",
		url: "/svg/lamp.svg",
		type: AssetType.SVG
	},
	// SPRITESHEET
	char_idle: {
		key: "char_idle",
		url: "/img/spr_char_idle.png",
		width: 7200/24,
		height: 300,
		type: AssetType.SPRITESHEET
	},
	char_excited: {
		key: "char_excited",
		url: "/img/spr_char_excited.png",
		width: 10200/34,
		height: 300,
		type: AssetType.SPRITESHEET
	},
	electricity: {
		key: "electricity",
		url: "/img/effect/spr_electricity.png",
		width: 2800/8,
		height: 540,
		type: AssetType.SPRITESHEET
	},

};