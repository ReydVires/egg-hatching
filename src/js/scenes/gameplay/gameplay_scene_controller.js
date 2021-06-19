import { SceneKeyInfo } from "../../const/gameInfo";

export class GameplaySceneController extends Phaser.Scene {

	constructor () {
		super({ key: SceneKeyInfo.GAMEPLAY });
	}

	init () {
		console.log("INIT GAMEPLAY!");
	}

	preload () {}

}