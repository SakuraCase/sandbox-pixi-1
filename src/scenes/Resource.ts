import * as PIXI from "pixi.js";
import GameManager from "managers/GameManager";

/**
 * リソースの URL や命名規則のマスタ
 */
const Resource = Object.freeze({
  /**
   * マスターデータ API 情報を有するオブジェクト
   */
  Api: {
    SceneUiGraph: (name: string): string => {
      return `ui_graph/${name}.json`;
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
  Static: {
    Color: "static/c.json",
    Anime: "static/anime.json",
    Button: "ui/button.png",
  },

  TextureFrame: {
    Anime: (index = 1): PIXI.Texture => {
      return PIXI.utils.TextureCache[`a${index}.png`];
    },
    Color: (name = "blue"): PIXI.Texture => {
      return PIXI.utils.TextureCache[`${name}.png`];
    },
  },

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
