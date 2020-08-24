import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";
import Scene from "./Scene";
import SecondScene from "./SecondScene";
import Fade from "./transition/Fade";

/**
 * タイトルシーン
 */
export default class FirstScene extends Scene {
  private text!: PIXI.Text;
  private count = 0;

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    const textStyle = new PIXI.TextStyle({
      fontSize: 64,
      fill: 0xffffff,
    });

    const renderer = GameManager.instance.game.renderer;

    this.transitionIn = new Fade(1.0, 0.0, -0.025);
    this.transitionOut = new Fade(0.0, 1.0, 0.025);

    this.text = new PIXI.Text("first scene", textStyle);
    this.text.interactive = true;
    this.text.anchor.set(0.5, 0.5);
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5);
    this.addChild(this.text);

    this.text.on("pointerdown", this.nextScene);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);

    this.text.text = `first scene \n${this.count++}`;
  }

  /**
   * 次のシーンへの遷移
   */
  public nextScene(): void {
    GameManager.loadScene(new SecondScene());
  }
}
