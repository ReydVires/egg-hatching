import { loadAssets, loadFonts } from "../../helper/loaderHelper";

import { Assets as GameplayAssets } from "../../assetLibrary/assetGameplay";
import { Assets as HatchAssets } from "../../assetLibrary/assetHatch";
import { LoadingSceneView } from "./loading_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { fontList } from "../../assetLibrary/assetFont";

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
		Promise.all([
			loadFonts(fontList()),
		])
		.then(() => {
			this.load.start(); // Execute: onCompleteLoadBoot
		})
		.catch((error) => Error(`${SceneKeyInfo.LOADING}::\n` + error));
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
		loadAssets(this, HatchAssets);

		this.load.start(); // Execute: onCompleteLoad
	}

	onCompleteLoad () {
		this.load.removeAllListeners();
		this.scene.start(SceneKeyInfo.GAMEPLAY);
	}
	
}