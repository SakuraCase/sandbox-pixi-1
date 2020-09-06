import Scene from "./Scene";
/**
 * タイトルシーン
 */
export default class CopyTemplate extends Scene {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 毎フレームの更新処理
     */
    update(dt: number): void;
    /**
     * 前のシーンへの遷移
     */
    backScene(): void;
}
