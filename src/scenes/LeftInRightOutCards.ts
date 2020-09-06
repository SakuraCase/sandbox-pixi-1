import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import GameManager from "../managers/GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";

/**
 * 左から入ってきてクリックされたら右に出ていく動き
 */
export default class LeftInRightOutCards extends Scene {
  private text!: PIXI.Text;
  private cards!: PIXI.Container;
  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.uiName = "second";
    this.transitionIn = new Fade(1.0, 0.0, -0.05);
    this.transitionOut = new Fade(0.0, 1.0, 0.05);

    // クリックしたカードの表示
    this.text = new PIXI.Text("", {
      fontSize: 20,
      fill: 0xffffff,
    });
    this.addChild(this.text);

    // コンテナ作成
    this.cards = new PIXI.Container();
    this.cards.width = 800;
    this.cards.height = 300;
    this.cards.pivot.set(400, 150);
    this.cards.addChild(this.createRect(100, 150, 1));
    this.cards.addChild(this.createRect(400, 150, 2));
    this.cards.addChild(this.createRect(700, 150, 3));
    this.addChild(this.cards);

    // 本当はFeadが終わったら動くように制御したいけど、callbackで上手く設定できなかった？
    gsap.fromTo(
      this.cards,
      { x: -800, y: 300 },
      { delay: 2, x: 600, duration: 2, ease: "back.inOut(1)" }
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

  public createRect(x: number, y: number, i: number): PIXI.Graphics {
    const rect = new PIXI.Graphics()
      .beginFill(0x2a7beb)
      .drawRect(0, 0, 200, 300)
      .endFill();
    rect.x = x;
    rect.y = y;
    rect.interactive = true;
    rect.buttonMode = true;
    rect.pivot.set(100, 150);

    rect.on("pointertap", () => {
      this.text.text = "click card" + i;
      gsap.to(this.cards, { x: 1800, duration: 2, ease: "back.inOut(1)" });
    });

    return rect;
  }
}
