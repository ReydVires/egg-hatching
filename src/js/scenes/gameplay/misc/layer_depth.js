const uiCoef = (/** @type {number} */ depth) => {
	return depth * 50;
};

export const layerDepth = {
	CHAR: 1,
	LEAF: 2,
	UI_BUTTON: uiCoef(1),
	OVERLAY_LIGHT: uiCoef(2),
};