import * as PIXI from "pixi.js";
import Scene from "./Scene";
/**
 * タイトルシーン
 */
export default class FirstScene extends Scene {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 毎フレームの更新処理
     */
    update(dt: number): void;
    /**
     * 実験用個別シーンへ遷移させるリンクの作成
     */
    createText(str: string, x: number, y: number, scene: Scene): PIXI.Text;
}
