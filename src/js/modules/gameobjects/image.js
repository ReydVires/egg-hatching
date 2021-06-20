import { Transform } from "../components/transform";

export class Image {

	/** @private @type {Phaser.GameObjects.Image} */
	_gameObject;
	/** @private @type {Transform} */
	_transform;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} x
	 * @param {number} y
	 * @param {string} texture
	 * @param {number} [frame]
	 */
	constructor (scene, x, y, texture, frame) {
		this._gameObject = scene.add.image(x, y, texture, frame || 0);
		this._transform = new Transform(scene, this._gameObject);
	}

	get gameObject () {
		return this._gameObject;
	}

	get transform () {
		return this._transform;
	}

}