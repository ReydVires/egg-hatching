import { Animations } from "../../../assetLibrary/animations";
import { Assets } from "../../../assetLibrary/assetGameplay";
import { Sprite } from "../../../modules/gameobjects/sprite";
import { addAnimation } from "../../../helper/animationHelper";

export class ElectricityView {

	/** @private @type {Phaser.Scene} */
	_scene;

	/** @private @type {Sprite} */
	_electricityBig;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	constructor (scene, initPosition, ratio) {
		this._scene = scene;
		this.create(initPosition, ratio);
	}

	/**
	 * @private
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	create (initPosition, ratio) {
		this._electricityBig = new Sprite(this._scene, initPosition.x, initPosition.y, Assets.electricity.key, 0);
		this._electricityBig.gameObject.setOrigin(0.5, 1).setVisible(false);
		this._electricityBig.transform.setToScaleDisplaySize(ratio * 0.45);

		addAnimation(this._scene, Animations.electricity);
	}

	playAnim () {
		this._electricityBig.gameObject.setVisible(true).play(Animations.electricity.key);
	}

	/**
	 * @param {Function} events
	 */
	onAnimElectricityComplete (events) {
		this._electricityBig.gameObject.on("animationcomplete-" + Animations.electricity.key, () => {
			this._electricityBig.gameObject.setVisible(false);
			(events) && events();
		});
	}

}