import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";
import Scene from "./Scene";
import SecondScene from "./SecondScene";
import Fade from "./transition/Fade";

/**
 * タイトルシーン
 */
export default class FirstScene extends Scene {
  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.transitionIn = new Fade(1.0, 0.0, -0.025);
    this.transitionOut = new Fade(0.0, 1.0, 0.025);

    this.addChild(this.createText("Sceneへ", 10, 20, new SecondScene()));
    this.addChild(this.createText("同じSceneへ", 10, 50, new SecondScene()));
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
  }

  /**
   * 実験用個別シーンへ遷移させるリンクの作成
   */
  public createText(
    str: string,
    x: number,
    y: number,
    scene: Scene
  ): PIXI.Text {
    const text = new PIXI.Text(str, {
      fontSize: 20,
      fill: 0xffffff,
    });

    text.interactive = true;
    text.buttonMode = true;
    text.anchor.set(0, 0.5);
    text.position.set(x, y);

    text.on("pointerdown", () => {
      GameManager.loadScene(scene);
    });

    return text;
  }
}
