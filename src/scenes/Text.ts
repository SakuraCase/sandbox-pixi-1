import * as PIXI from "pixi.js";
import GameManager from "../managers/GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";

/**
 * テキストエリア
 */
export default class Text extends Scene {
  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.uiName = "second";
    this.transitionIn = new Fade(1.0, 0.0, -0.05);
    this.transitionOut = new Fade(0.0, 1.0, 0.05);

    // 折り返しのテキスト
    const text = new PIXI.Text("", {
      fontSize: 20,
      fill: 0xffffff,
      wordWrapWidth: 300,
      wordWrap: true,
      breakWords: true,
    });
    text.text =
      "長い文字列をあたえてもwordWrapWidthとwardWrapとbreakWordsがあれば自動で改行してくれる";
    text.position.set(20, 20);
    // width指定+wordWrapWidth等なしにすると文字がつぶれて描画される(文字が枠を飛び越えるわけではない)
    // text.width = 80;
    this.addChild(text);
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
