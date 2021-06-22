import { Animations } from "../../../assetLibrary/animations";
import { Assets } from "../../../assetLibrary/assetGameplay";
import { ScreenUtility } from "../../../helper/screenUtility";
import { Sprite } from "../../../modules/gameobjects/sprite";
import { addAnimation } from "../../../helper/animationHelper";
import { layerDepth } from "../info/layer_depth";

export class CharView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @private @type {number} */
	_baseRatio;

	/** @private @type {Sprite} */
	_char;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {ScreenUtility} screenUtil
	 * @param {number} baseRatio
	 */
	constructor (scene, screenUtil, baseRatio) {
		this._scene = scene;
		this._screenUtil = screenUtil;
		this._baseRatio = baseRatio
		this.create();
	}

	/**
	 * @private
	 */
	create () {
		const { centerX, centerY } = this._screenUtil;
		this._char = new Sprite(this._scene, centerX * 0.5, centerY * 1.15, Assets.char_idle.key, 0);
		this._char.transform.setToScaleDisplaySize(this._baseRatio * 1.5);
		this._char.gameObject.setDepth(layerDepth.CHAR);

		addAnimation(this._scene, Animations.char_idle);
		addAnimation(this._scene, Animations.char_excited);

		this._char.gameObject.play(Animations.char_idle.key);
	}

	playAnimExcited () {
		this._char.gameObject.play(Animations.char_excited.key);
	}

	/**
	 * @param {Function} events
	 */
	onAnimExcitedComplete (events) {
		this._char.gameObject.on("animationcomplete-" + Animations.char_excited.key, () => {
			this._char.gameObject.play(Animations.char_excited.key);
			(events) && events();
		});
	}

}