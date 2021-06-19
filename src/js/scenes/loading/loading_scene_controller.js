import { SceneKeyInfo } from "../../const/gameInfo";

export class LoadingSceneController extends Phaser.Scene {

	constructor () {
		super({ key: SceneKeyInfo.LOADING });
	}

	init () {
		console.log("INIT LOADING!");
	}

	preload () {}
	
}