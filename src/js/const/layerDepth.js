import { DepthCounterHelper, uiDepthHelper } from "../helper/depthHelper";

const depthInstances = {
	gameplay: new DepthCounterHelper(),
	hatch: new DepthCounterHelper(),
};

export const LayerDepth = {

	gameplay: {
		CHAR: depthInstances.gameplay.next(),
		LEAF: depthInstances.gameplay.next(),
		BUTTON: depthInstances.gameplay.next(),
		OVERLAY: depthInstances.gameplay.next(),
	},
	hatch: {
		EGG: depthInstances.hatch.next(),
		OVERLAY_DIM: depthInstances.hatch.next(),
		PANEL_POPUP: depthInstances.hatch.next(),
		COIN: depthInstances.hatch.next(),
		BUTTON: depthInstances.hatch.next(),
		DIALOG: uiDepthHelper(depthInstances.hatch.next()),
		OVERLAY_LIGHT_DIM: uiDepthHelper(depthInstances.hatch.next()),
	},

};