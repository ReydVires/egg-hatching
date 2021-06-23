import { Audios } from "../../assetLibrary/assetAudio";
import { BackgroundView } from "./background/background_view";
import { CONFIG } from "../../const/gameInfo";
import { CharView } from "./char/char_view";
import { ElectricityView } from "./effect/electricity_view";
import { FontAsset } from "../../assetLibrary/assetFont";
import { HUDUIView } from "./ui/hud_view";
import { OverlayFlashUIView } from "./ui/overlay_flash_view";
import { PlayButtonUIView } from "./ui/play_button_view";
import { ScreenUtility } from "../../helper/screenUtility";
import { Text } from "../../modules/gameobjects/text";

export class GameplaySceneView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @type {Phaser.Events.EventEmitter} */
	event;
	/** @readonly */
	evenNames = {
		FILL_PROGRESS_BAR: "FILL_PROGRESS_BAR",
		GOTO_HATCH: "GOTO_HATCH",
		LOCK_INPUT: "LOCK_INPUT",
		TAP_POINT_BUTTON: "TAP_POINT_BUTTON",
	};

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
		this._screenUtil = ScreenUtility.getInstance();
		this.event = new Phaser.Events.EventEmitter();
	}

	create () {
		const { height: screenHeight } = this._screenUtil;

		const backgroundView = new BackgroundView(this._scene, this._screenUtil);
		const charView = new CharView(this._scene, this._screenUtil, backgroundView.baseRatio);
		const overlayUIView = new OverlayFlashUIView(this._scene, this._screenUtil);
		const hudView = new HUDUIView(this._scene, this._screenUtil);
		const playBtnView = new PlayButtonUIView(this._scene, this._screenUtil, backgroundView.baseRatio);
		const electricityEffectView = new ElectricityView(this._scene, playBtnView.getDisplayPositionFromCoordinate(0.7, 0), backgroundView.hatchNestRatio);

		charView.onAnimExcitedComplete(() => {
			overlayUIView.showFlashlight(() => this.event.emit(this.evenNames.GOTO_HATCH));
		});

		playBtnView.onClick(() => {
			this.event.emit(this.evenNames.TAP_POINT_BUTTON, Audios.sfx_zap.key);
			this.event.emit(this.evenNames.LOCK_INPUT);
			electricityEffectView.playAnim();
		});

		electricityEffectView.onAnimElectricityComplete(() => {
			this.event.emit(this.evenNames.FILL_PROGRESS_BAR, Audios.sfx_fill_up.key);
			hudView.fillProgressBar(() => {
				charView.playAnimExcited();
			});
		});

		if (CONFIG.MODE === "PRODUCTION") return;
		const versionDebug = new Text(this._scene, 0, screenHeight, CONFIG.VERSION, {
			fontFamily: FontAsset.arial.key,
			fontSize: `${18 * backgroundView.baseRatio}px`
		});
		versionDebug.gameObject.setOrigin(0, 1);
	}

}