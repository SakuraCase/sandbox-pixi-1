import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import GameManager from "../managers/GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";

/**
 * タイトルシーン
 */
export default class GaspTimeRemap extends Scene {
  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.uiName = "second";
    this.transitionIn = new Fade(1.0, 0.0, -0.05);
    this.transitionOut = new Fade(0.0, 1.0, 0.05);

    // タイムラインを作成する
    const tl = gsap.timeline({ repeat: -1 });

    const rect1 = this.createAndAddRect(100, 100);
    const rect2 = this.createAndAddRect(100, 300);
    const rect3 = this.createAndAddRect(100, 500);

    // 移動するモーションを指定する
    tl.to(rect1, 2.0, { x: 800, rotation: 10 })
      .to(rect1, 1, { y: 300 })
      .to(rect2, 1, { x: 800 }, "<") // 直前のtoと同じタイミングから動き出す
      .to(rect3, 3.0, { x: 800, y: 300 }, 0);
    // 本来のタイムラインの0.25秒の地点まで到達したら
    tl.call(
      () => {
        // 0.1倍速再生にする(スローモーションとなる)
        tl.timeScale(0.1);
      },
      undefined,
      0.25
    );
    // 本来のタイムラインの0.50秒の地点まで到達したら
    tl.call(
      () => {
        // 1.0倍速再生にする(通常再生速度となる)
        tl.timeScale(1.0);
      },
      undefined,
      0.5
    );
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

  public createAndAddRect(x: number, y: number): PIXI.Graphics {
    const rect = new PIXI.Graphics()
      .beginFill(0x2a7beb)
      .drawRect(0, 0, 50, 50)
      .endFill();
    // drawRectで位置指定するとrotationが上手く設定できなかった
    rect.x = x;
    rect.y = y;
    rect.pivot.x = 25;
    rect.pivot.y = 25;
    this.addChild(rect);
    return rect;
  }
}
