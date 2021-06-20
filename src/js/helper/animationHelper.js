import { AssetType } from "../const/assetType";

/**
 * @typedef AnimationInfoType
 * @property {string} key
 * @property {string} type
 * @property {string} spritesheetRef
 * @property {number} start
 * @property {number} end
 * @property {number} frameSpeed
 * @property {boolean} [loop]
 */

/**
 * @param {Phaser.Scene} scene
 * @param {AnimationInfoType} animationObject
 */
export function addAnimation (scene, animationObject) {
	const frames = scene.anims.generateFrameNumbers(animationObject.spritesheetRef, {
		start: animationObject.start,
		end: animationObject.end
	});
	return scene.anims.create({
		key: animationObject.key,
		frames: frames,
		frameRate: animationObject.frameSpeed,
		repeat: animationObject.loop ? -1 : 0
	});
}

/**
 * @param {Phaser.Scene} scene
 * @param {object} animationObjectList
 */
export function addAnimationList (scene, animationObjectList) {
	for (const animKey in animationObjectList) {
			const animationObject = Reflect.get(animationObjectList, animKey);
			addAnimation(scene, animationObject);
	}
}