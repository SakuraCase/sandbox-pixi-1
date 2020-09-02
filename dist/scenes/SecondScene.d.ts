import LoaderAddParam from "../interfaces/LoaderAddParam";
import Scene from "./Scene";
/**
 * タイトルシーン
 */
export default class SecondScene extends Scene {
    /**
     * コンストラクタ
     */
    constructor();
    /**
     * 毎フレームの更新処理
     */
    update(dt: number): void;
    protected createInitialResourceList(): (LoaderAddParam | string)[];
    protected onResourceLoaded(): void;
    /**
     * 前のシーンへの遷移
     */
    backScene(): void;
}
