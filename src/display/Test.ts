import * as PIXI from "pixi.js";
import Resource from "../scenes/Resource";
import UpdateObject from "interfaces/UpdateObject";

/**
 * アニメーションテスト
 */
export default class Test extends PIXI.Container implements UpdateObject {
  /**
   * スプライトアニメーションを更新する頻度
   */
  public static readonly TextureFrameUpdateFrequency: number = 60;

  /**
   * 経過フレーム数
   */
  private elapsedFrameCount = 0;
  /**
   * 表示する PIXI.Sprite インスタンス
   */
  private sprite!: PIXI.Sprite;

  /**
   * このエフェクトで使用するリソースリスト
   */
  public static get resourceList(): string[] {
    return [Resource.Static.Anime];
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super();

    this.sprite = new PIXI.Sprite(Resource.TextureFrame.Anime(1));
    this.addChild(this.sprite);
  }

  /**
   * UpdateObject インターフェース実装
   * 削除フラグが立っているか返す
   */
  public isDestroyed(): boolean {
    return this._destroyed;
  }

  /**
   * UpdateObject インターフェース実装
   * requestAnimationFrame 毎のアップデート処理
   */
  public update(_delta: number): void {
    if (this.isDestroyed()) {
      return;
    }

    this.elapsedFrameCount++;
    const frequency = Test.TextureFrameUpdateFrequency;
    // テクスチャ更新周期になったら次のテクスチャに切り替える
    if (this.elapsedFrameCount % frequency === 0) {
      const count = this.elapsedFrameCount / frequency;
      const index = Math.floor(count) + 1;
      // すべてのテクスチャが再生されたら自然消滅させる
      if (index > Resource.MaxFrameIndex(Resource.Static.Anime)) {
        this.sprite.destroy();
        this.destroy();
        return;
      }

      this.sprite.texture = Resource.TextureFrame.Anime(index);
    }
  }
}
