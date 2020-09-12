import * as PIXI from "pixi.js";
import { OldFilmFilter } from "pixi-filters";
import GameManager from "../managers/GameManager";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";
import DebugGraphicsFactory from "../display/DebugGraphicsFactory";
import { gsap } from "gsap";

/**
 * ドラッグドロップ
 */
export default class Filter extends Scene {
  private text!: PIXI.Text;
  private gf?: DebugGraphicsFactory;
  private filter!: OldFilmFilter;
  private lock!: PIXI.Graphics;

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.uiName = "second";
    this.transitionIn = new Fade(1.0, 0.0, -0.05);
    this.transitionOut = new Fade(0.0, 1.0, 0.05);

    this.filter = new OldFilmFilter();
    this.filter.vignetting = 0;
    this.filter.enabled = false;
    GameManager.instance.game.stage.filters = [this.filter];

    const background = new PIXI.Graphics()
      .beginFill(0x1099bb)
      .drawRect(0, 0, 1200, 800)
      .endFill();
    this.addChild(background);

    // アニメーション中操作出来ないようにするためのもの
    this.lock = new PIXI.Graphics()
      .beginFill(0x1099bb)
      .drawRect(0, 0, 1200, 800)
      .endFill();
    this.lock.alpha = 0;
    this.lock.interactive = true;
    this.lock.zIndex = 100;

    // デバッグ用
    this.gf = new DebugGraphicsFactory();
    this.addChild(this.gf.getTextContainer());

    // ドラッグアンドドロップの結果表示
    this.text = new PIXI.Text("", {
      fontSize: 20,
      fill: 0xffffff,
    });
    this.text.position.set(0, 400);
    this.addChild(this.text);

    // ドロップターゲット作成 & カード作成/イベント登録
    const dropArea1 = this.gf.getRect("dropArea1", 0xf5be5d);
    const card1 = this.gf.getRect("card1", 0x2a7beb);
    dropArea1.position.set(600, 200);
    card1.position.set(600, 500);
    this.addChild(dropArea1);
    this.addEvent(card1);
    this.addChild(card1);
  }

  /**
   * 毎フレームの更新処理
   */
  public update(dt: number): void {
    super.update(dt);
    if (this.gf) {
      this.gf.update();
    }
    // seedを更新しないとフィルタが変化しない
    this.filter.seed = Math.random();
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
    const position = e.data.getLocalPosition(this.parent);
    e.currentTarget.position.set(position.x, position.y);
  }

  // ドロップ判定
  public onDragEnd(e: PIXI.InteractionEvent): void {
    e.currentTarget.off("pointermove");
    e.currentTarget.alpha = 1;
    e.currentTarget.interactive = false;
    const hitObj = GameManager.instance.game.renderer.plugins.interaction.hitTest(
      e.currentTarget.getGlobalPosition(),
      GameManager.instance.game.stage
    );
    e.currentTarget.interactive = true;
    if (hitObj && hitObj.name.includes("dropArea")) {
      this.animation();
    }
  }

  public animation(): void {
    const rectTop = new PIXI.Graphics()
      .beginFill(0x080f07)
      .drawRect(0, 0, this.parent.width, 200)
      .endFill();
    rectTop.interactive = true;

    const rectBottom = new PIXI.Graphics()
      .beginFill(0x080f07)
      .drawRect(0, 0, this.parent.width, 200)
      .endFill();
    rectBottom.interactive = true;

    rectTop.pivot.set(this.parent.width / 2, 100);
    rectTop.position.set(this.parent.width / 2, -200);
    rectBottom.pivot.set(this.parent.width / 2, 100);
    rectBottom.position.set(this.parent.width / 2, 1000);
    this.addChild(rectTop);
    this.addChild(rectBottom);
    this.addChild(this.lock);

    this.text.text = "locked";
    this.filter.enabled = true;
    const tl = gsap.timeline({ repeat: 0 });
    tl.to(rectTop, 2, { y: 20 })
      .to(rectBottom, 2, { y: 780 }, "<")
      .to(rectTop, 2, { y: -200, delay: 1 })
      .to(rectBottom, 2, { y: 1000 }, "<")
      .then(() => {
        this.filter.enabled = false;
        this.text.text = "";
        this.removeChild(rectTop);
        this.removeChild(rectBottom);
        this.removeChild(this.lock);
      });
  }
}
