import * as PIXI from "pixi.js";
export default class DebugGraphicsFactory {
    private cached;
    private text;
    constructor();
    /**
     * Rect取得。なければ作る
     */
    getRect(name: string, color: number): PIXI.Graphics;
    getTextContainer(): PIXI.Text;
    update(): void;
    createRect(name: string, color: number): PIXI.Graphics;
}
