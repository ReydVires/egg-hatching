import { Transform } from "../components/transform";

export class Text {

	/** @private @type {Phaser.GameObjects.Text} */
	_gameObject;
	/** @private @type {Transform} */
	_transform;

	/**
	 * @param {Phaser.Scene} _scene
	 * @param {number} x
	 * @param {number} y
	 * @param {string} text
	 * @param {Phaser.Types.GameObjects.Text.TextStyle} [style]
	 */
	constructor (_scene, x, y, text, style) {
		this._gameObject = _scene.add.text(x, y, text, style);
		this._transform = new Transform(_scene, this._gameObject);
	}

	get gameObject () {
		return this._gameObject;
	}

	get transform () {
		return this._transform;
	}

}