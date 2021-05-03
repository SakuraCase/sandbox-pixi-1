// import * as PIXI from "pixi.js";
import GameManager from "../managers/GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";
import { Loader, Sprite } from "pixi.js";

/*
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

    const loader = Loader.shared;
    loader
      .add("assets/static/svgTest1.svg")
      .add("assets/static/svgTestMini.svg")
      .load(() => {
        const s1 = new Sprite(
          Loader.shared.resources["assets/static/svgTest1.svg"].texture
        );
        this.addChild(s1);

        const sMini = new Sprite(
          Loader.shared.resources["assets/static/svgTestMini.svg"].texture
        );
        sMini.width = 5200;
        sMini.height = 5940;
        sMini.position.x = -2500;
        sMini.position.y = -1500;

        this.addChild(sMini);
      });

    // const sheet = Loader.shared.resources["static/svgTest1.svg"].spritesheet;
    // console.log(sheet);
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
