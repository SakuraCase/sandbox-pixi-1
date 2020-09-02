import * as PIXI from "pixi.js";
/**
 * リソースの URL や命名規則のマスタ
 */
declare const Resource: Readonly<{
    /**
     * マスターデータ API 情報を有するオブジェクト
     */
    Api: {
        SceneUiGraph: (name: string) => string;
    };
    /**
     * 渡されたパラメータによって動的に変わる url を有するオブジェクト
     */
    /**
     * 静的なリソースを有するオブジェクト
     */
    Static: {
        Color: string;
        Anime: string;
        Button: string;
    };
    TextureFrame: {
        Anime: (index?: number) => PIXI.Texture;
        Color: (name?: string) => PIXI.Texture;
    };
    /**
     * スプライトシートの最大フレーム数を返す関数
     */
    MaxFrameIndex: (resourceKey: string) => number;
}>;
export default Resource;
