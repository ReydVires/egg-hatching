const uiCoef = (/** @type {number} */ depth) => {
	return depth * 50;
};

export const layerDepth = {
	EGG: 1,
	OVERLAY_DIM: 1.1,
	PANEL_POPUP: 1.5,
	COIN: 2,
	BUTTON: 3,
	DIALOG: uiCoef(1),
	OVERLAY_LIGHT_DIM: uiCoef(2),
};