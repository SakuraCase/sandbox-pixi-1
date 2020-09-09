import * as PIXI from "pixi.js";
import Scene from "./Scene";
/**
 * ドラッグドロップ
 */
export default class DragAndDrop1 extends Scene {
    private text;
    private cards;
    private gf?;
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
    addEvent(obj: PIXI.Graphics): void;
    onDragStart(e: PIXI.InteractionEvent): void;
    onDragMove(e: PIXI.InteractionEvent): void;
    onDragEnd(e: PIXI.InteractionEvent): void;
}
