import { Animations } from "../../../assetLibrary/animations";
import { Assets } from "../../../assetLibrary/assetHatch";
import { Sprite } from "../../../modules/gameobjects/sprite";
import { addAnimation } from "../../../helper/animationHelper";
import { layerDepth } from "../info/layer_depth";

export class EggHatchView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {Sprite} */
	_eggHatch;

	/** @private @type {number} */
	_baseRatio;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	constructor (scene, initPosition, ratio) {
		this._scene = scene;
		this.create(initPosition, ratio);
	}

	get baseRatio () {
		return this._baseRatio;
	}

	/**
	 * @private
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	create (initPosition, ratio) {
		this._eggHatch = new Sprite(this._scene, initPosition.x, initPosition.y, Assets.egg_crack.key, 0);
		this._eggHatch.transform.setToScaleDisplaySize(ratio * 0.325);
		this._eggHatch.gameObject.setOrigin(0.5, 1).setDepth(layerDepth.EGG);

		this._baseRatio = this._eggHatch.transform.displayToOriginalHeightRatio;

		addAnimation(this._scene, Animations.egg_crack);
		addAnimation(this._scene, Animations.egg_hatch);

		this._eggHatch.gameObject.on("animationcomplete-" + Animations.egg_crack.key, () => {
			this._eggHatch.gameObject.play(Animations.egg_hatch.key);
		});
	}

	playAnimCrack () {
		this._scene.time.delayedCall(500, () =>  this._eggHatch.gameObject.play(Animations.egg_crack.key));
	}

	/**
	 * @param {number} x
	 * @param {number} [y]
	 */
	getDisplayPositionFromCoordinate (x, y = x) {
		return this._eggHatch.transform.getDisplayPositionFromCoordinate(x, y);
	}

	/**
	 * @param {Function} events 
	 */
	onAnimationUpdateEggHatch (events) {
		/**
		 * @param {Phaser.Animations.Animation} anim 
		 * @param {Phaser.Animations.AnimationFrame} frame 
		 */
		 const onAnimationUpdateEggHatch = (anim, frame) => {
			if (anim.key !== Animations.egg_hatch.key) return;
			if (frame.textureFrame !== 16) return;

			events();
		 }
		this._eggHatch.gameObject.on("animationupdate", onAnimationUpdateEggHatch);
	}

}