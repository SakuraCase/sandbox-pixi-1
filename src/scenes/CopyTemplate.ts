// import * as PIXI from "pixi.js";
import GameManager from "../managers/GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";

/**
 * タイトルシーン
 */
export default class CopyTemplate extends Scene {
  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.uiName = "second";
    this.transitionIn = new Fade(1.0, 0.0, -0.05);
    this.transitionOut = new Fade(0.0, 1.0, 0.05);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }

  /**
   * 前のシーンへの遷移
   */
  public backScene(): void {
    GameManager.loadScene(new FirstScene());
  }
}
