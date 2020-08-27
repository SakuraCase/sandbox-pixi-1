import GameManager from "managers/GameManager";
import Scene from "scenes/Scene";

/**
 * リソースの URL や命名規則のマスタ
 */
const Resource = Object.freeze({
  /**
   * マスターデータ API 情報を有するオブジェクト
   */
  Api: {
    SceneUiGraph: (scene: Scene): string => {
      console.log(scene.constructor.name);
      //const snake_case = scene.constructor.name;
      //  .replace(/([A-Z])/g, (s) => {
      //    return `_${s.charAt(0).toLowerCase()}`;
      //  })
      //  .replace(/^_/, "");

      // return `ui_graph/${snake_case}.json`;
      return `ui_graph/second_scene.json`;
    },
  },

  /**
   * 渡されたパラメータによって動的に変わる url を有するオブジェクト
   */
  // Dynamic: {
  // },
  /**
   * 静的なリソースを有するオブジェクト
   */
  Static: {},

  /**
   * スプライトシートの最大フレーム数を返す関数
   */
  MaxFrameIndex: (resourceKey: string): number => {
    const json = GameManager.instance.game.loader.resources[resourceKey];
    if (!json || !json.data || !json.data.frames) {
      return -1;
    }
    return Object.keys(json.data.frames).length;
  },
});

export default Resource;
