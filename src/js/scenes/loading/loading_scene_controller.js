import { Assets as GameplayAssets } from "../../assetLibrary/assetGameplay";
import { LoadingSceneView } from "./loading_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { loadAssets } from "../../helper/loaderHelper";

export class LoadingSceneController extends Phaser.Scene {

	/** @type {LoadingSceneView} */
	view;

	constructor () {
		super({ key: SceneKeyInfo.LOADING });
		this.onCompleteLoadBoot = this.onCompleteLoadBoot.bind(this);
		this.onCompleteLoad = this.onCompleteLoad.bind(this);
	}

	init () {
		this.view = new LoadingSceneView(this);
	}

	preload () {
		this.loadBootResources();
	}

	loadBootResources () {
		this.load.once("complete", this.onCompleteLoadBoot);

		// LOAD LOADING ASSETS HERE!

		this.load.start(); // Execute: onCompleteLoadBoot
	}

	onCompleteLoadBoot () {
		this.view.create();
		this.load.on("progress", (/** @type {number} */ value) => {
			this.view.updateLoading(value);
		});

		this.loadResources();
	}

	loadResources () {
		this.load.once("complete", this.onCompleteLoad);

		// LOAD ALL GAME FILE HERE!
		loadAssets(this, GameplayAssets);

		this.load.start(); // Execute: onCompleteLoad
	}

	onCompleteLoad () {
		this.load.removeAllListeners();
		this.scene.start(SceneKeyInfo.GAMEPLAY);
	}
	
}