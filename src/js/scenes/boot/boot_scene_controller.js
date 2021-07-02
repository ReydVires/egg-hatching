import { AudioController } from "../../modules/audio/audio_controller";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";
import { fontList } from "../../assetLibrary/assetFont";
import { loadFonts } from "../../helper/loaderHelper";

export class BootSceneController extends Phaser.Scene {

	constructor () {
		super({ key: SceneKeyInfo.BOOT });
	}

	init () {
		Promise.all([
			ScreenUtility.getInstance().init(this),
			AudioController.getInstance().init(this),
			loadFonts(fontList()),
		]).then(() => {
			this.scene.launch(SceneKeyInfo.LOADING);
		}).catch((err) => Error("Boot Scene:\n" + err));
	}

}