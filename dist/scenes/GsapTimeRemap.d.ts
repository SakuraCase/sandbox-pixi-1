import * as PIXI from "pixi.js";
import Scene from "./Scene";
/**
 * GASPテスト
 */
export default class GaspTimeRemap extends Scene {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 毎フレームの更新処理
     */
    update(dt: number): void;
    /**
     * 前のシーンへの遷移
     */
    backScene(): void;
    createAndAddRect(x: number, y: number): PIXI.Graphics;
}
