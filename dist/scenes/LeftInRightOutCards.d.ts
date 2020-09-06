import * as PIXI from "pixi.js";
import Scene from "./Scene";
/**
 * 左から入ってきてクリックされたら右に出ていく動き
 */
export default class LeftInRightOutCards extends Scene {
    private text;
    private cards;
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
    createRect(x: number, y: number, i: number): PIXI.Graphics;
}
