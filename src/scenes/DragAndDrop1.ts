import * as PIXI from "pixi.js";
import GameManager from "../managers/GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";
import DebugGraphicsFactory from "../display/DebugGraphicsFactory";

/**
 * ドラッグドロップ
 */
export default class DragAndDrop1 extends Scene {
  private text!: PIXI.Text;
  private cards!: PIXI.Container;
  private gf?: DebugGraphicsFactory;

  // private defaultPosition = {  }

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.uiName = "second";
    this.transitionIn = new Fade(1.0, 0.0, -0.05);
    this.transitionOut = new Fade(0.0, 1.0, 0.05);

    // デバッグ用
    this.gf = new DebugGraphicsFactory();
    this.addChild(this.gf.getTextContainer());

    // ドラッグアンドドロップの結果表示
    this.text = new PIXI.Text("", {
      fontSize: 20,
      fill: 0xffffff,
    });
    this.text.position.set(0, 750);
    this.addChild(this.text);

    // ドロップターゲット作成
    const dropArea1 = this.gf.getRect("dropArea1", 0xf5be5d);
    const dropArea2 = this.gf.getRect("dropArea2", 0xf5be5d);
    dropArea1.position.set(400, 200);
    dropArea2.position.set(800, 200);
    this.addChild(dropArea1);
    this.addChild(dropArea2);

    // コンテナ作成
    this.cards = new PIXI.Container();
    this.cards.width = 800;
    this.cards.height = 200;
    this.cards.position.set(600, 500);
    this.cards.pivot.set(400, 100);

    // カード登録 & イベント登録
    const card1 = this.gf.getRect("card1", 0x2a7beb);
    const card2 = this.gf.getRect("card2", 0x2a7beb);
    const card3 = this.gf.getRect("card3", 0x2a7beb);
    card1.position.set(100, 100);
    card2.position.set(400, 100);
    card3.position.set(700, 100);
    this.addEvent(card1);
    this.addEvent(card2);
    this.addEvent(card3);
    this.cards.addChild(card1);
    this.cards.addChild(card2);
    this.cards.addChild(card3);
    this.addChild(this.cards);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
    if (this.gf) {
      this.gf.update();
    }
  }

  /**
   * 前のシーンへの遷移
   */
  public backScene(): void {
    GameManager.loadScene(new FirstScene());
  }

  // イベント設定
  public addEvent(obj: PIXI.Graphics): void {
    // bindがないとthisでtextを参照できなかった
    obj
      .on("pointerdown", this.onDragStart.bind(this))
      .on("mouseupoutside", this.onDragEnd.bind(this))
      .on("pointerup", this.onDragEnd.bind(this));
  }

  public onDragStart(e: PIXI.InteractionEvent): void {
    e.currentTarget.alpha = 0.5;
    e.currentTarget.on("pointermove", this.onDragMove.bind(this));
  }

  // ドラッグ
  public onDragMove(e: PIXI.InteractionEvent): void {
    const position = e.data.getLocalPosition(this.cards);
    e.currentTarget.position.set(position.x, position.y);
  }

  // ドロップ判定
  public onDragEnd(e: PIXI.InteractionEvent): void {
    e.currentTarget.off("pointermove");
    e.currentTarget.alpha = 1;
    // 自分自身をfalseにしないと自分自身をhitObjとして判定してしまった
    // getGlobaPositionしないと親コンテナの座標になってしまう
    e.currentTarget.interactive = false;
    const hitObj = GameManager.instance.game.renderer.plugins.interaction.hitTest(
      e.currentTarget.getGlobalPosition(),
      GameManager.instance.game.stage
    );
    e.currentTarget.interactive = true;
    if (hitObj && hitObj.name.includes("dropArea")) {
      // ドロップ個所のオブジェの名前とドロップしたオブジェの名前
      this.text.text = hitObj.name + "  " + e.currentTarget.name;
    }
  }
}
