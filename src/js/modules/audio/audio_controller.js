export class AudioController {

	/** @private @type {AudioController} */
	static instance;

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {Map<string, Phaser.Sound.BaseSound>} */
	_sfxCache;

	/** @private */
	constructor () {}

	static getInstance () {
		if (!AudioController.instance) {
			AudioController.instance = new AudioController();
		}
		return AudioController.instance;
	}

	/**
	 * @param {Phaser.Scene} scene
	 */
	init (scene) {
		return new Promise((resolve) => {
			this._scene = scene;
			(this._sfxCache) && this.clearSFXCache();
			this._sfxCache = new Map();
			resolve();
		});
	}

	/**
	 * @param {string} key
	 * @param {Phaser.Types.Sound.SoundConfig} [config]
	 * @param {boolean} [force]
	 */
	playSFX (key, config, force = true) {
		if (!this._sfxCache.has(key)) {
			const sfx = this._scene.sound.add(key, config);
			sfx.play();
			this._sfxCache.set(key, sfx);
		}
		else {
			if (!force && this._sfxCache.get(key)?.isPlaying) return;
			this._sfxCache.get(key)?.play(config);
		}
	}

	clearSFXCache () {
		for (let [_, sfx] of this._sfxCache) {
			sfx.destroy();
		}
		this._sfxCache.clear();
	}

}