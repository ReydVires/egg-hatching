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
			this._sfxCache = new Map();
			resolve();
		});
	}

	/**
	 * @private
	 * @param {string} key
	 */
	getSFXCache (key) {
		if (this._sfxCache.has(key)) {
			return this._sfxCache.get(key);
		}
		const sfx = this._scene.sound.add(key);
		this._sfxCache.set(key, sfx);
		return sfx;
	}

	/**
	 * @param {string} key
	 * @param {Phaser.Types.Sound.SoundConfig} [config]
	 */
	playSFX (key, config) {
		const sfxCache = this.getSFXCache(key);
		sfxCache.play(config);
	}

	/**
	 * @param {string} key
	 * @param {Phaser.Types.Sound.SoundConfig} [config]
	 */
	playSFXAfterFinish (key, config) {
		const sfxCache = this.getSFXCache(key);
		(!sfxCache.isPlaying) && sfxCache.play(config);
	}

	/**
	 * @param {string} key
	 * @param {Phaser.Types.Sound.SoundConfig} [config]
	 */
	playSFXRepeatedly (key, config) {
		const sfxCache = this.getSFXCache(key);
		if (sfxCache.isPlaying) {
			(this._scene.sound.add(key, config)).play();
			return;
		}
		sfxCache.play(config);
	}

	clearSFXCache () {
		for (let [_, sfx] of this._sfxCache) {
			sfx.destroy();
		}
		this._sfxCache.clear();
	}

}