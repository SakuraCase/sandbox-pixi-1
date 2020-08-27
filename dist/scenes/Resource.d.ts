import Scene from "scenes/Scene";
/**
 * リソースの URL や命名規則のマスタ
 */
declare const Resource: Readonly<{
    /**
     * マスターデータ API 情報を有するオブジェクト
     */
    Api: {
        SceneUiGraph: (scene: Scene) => string;
    };
    /**
     * 渡されたパラメータによって動的に変わる url を有するオブジェクト
     */
    /**
     * 静的なリソースを有するオブジェクト
     */
    Static: {};
    /**
     * スプライトシートの最大フレーム数を返す関数
     */
    MaxFrameIndex: (resourceKey: string) => number;
}>;
export default Resource;
