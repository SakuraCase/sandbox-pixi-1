// import * as PIXI from "pixi.js";
import GameManager from "../managers/GameManager";
import LoaderAddParam from "../interfaces/LoaderAddParam";
import Scene from "./Scene";
import FirstScene from "./FirstScene";
import Fade from "./transition/Fade";
import Test from "../display/Test";
import Resource from "./Resource";

/**
 * タイトルシーン
 */
export default class SecondScene extends Scene {
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

  protected createInitialResourceList(): (LoaderAddParam | string)[] {
    const assets = super.createInitialResourceList();
    return assets.concat(Test.resourceList, Resource.Static.Color);
  }

  protected onResourceLoaded(): void {
    super.onResourceLoaded();

    // const resources = GameManager.instance.game.loader.resources;

    // json形式
    // const color: PIXI.ITextureDictionary | undefined =
    //   resources[Resource.Static.Color].textures;
    // if (color) {
    //   const image = new PIXI.Sprite(color["red.png"]);
    //   this.addChild(image);
    // }
    // 単体
    // PIXI.utils.TextureCache["ui/button.png"]);

    const renderer = GameManager.instance.game.renderer;
    const test = new Test();
    test.position.set(renderer.width * 0.5, renderer.height * 0.5);

    this.addChild(test);
    this.registerUpdatingObject(test);
  }

  /**
   * 前のシーンへの遷移
   */
  public backScene(): void {
    GameManager.loadScene(new FirstScene());
  }
}
