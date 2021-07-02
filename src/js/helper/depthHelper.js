/**
 * @param {number} depth
 */
export function uiDepthHelper (depth) {
	return depth * 50;
}

export class DepthCounterHelper {

	/** @private */
	_depthIndex;

	/**
	 * @param {number} [startIndex]
	 */
	constructor (startIndex = 0) {
		this._depthIndex = startIndex;
	}

	next () {
		return this._depthIndex++;
	}

	reset () {
		this._depthIndex = 0;
	}

}