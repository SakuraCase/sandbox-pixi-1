import * as PIXI from "pixi.js";

export default class DebugGraphicsFactory {
  private cached: {
    [key: string]: PIXI.Graphics;
  } = {};
  private text!: PIXI.Text;

  constructor() {
    this.text = new PIXI.Text("", {
      fontSize: 15,
      fill: 0xffffff,
    });
  }

  /**
   * Rect取得。なければ作る
   */
  public getRect(name: string, color: number): PIXI.Graphics {
    if (!this.cached[name]) {
      const rect = this.createRect(name, color);
      this.cached[name] = rect;
    }
    return this.cached[name];
  }

  public getTextContainer(): PIXI.Text {
    return this.text;
  }

  public update(): void {
    this.text.text = "";
    Object.entries(this.cached).forEach(([key, obj]) => {
      const x = Math.floor(obj.position.x);
      const y = Math.floor(obj.position.y);
      const gX = Math.floor(obj.getGlobalPosition().x);
      const gY = Math.floor(obj.getGlobalPosition().y);
      this.text.text =
        this.text.text + `Name:${key}/x:${x}/y:${y}/gX:${gX}/gY:${gY} \n`;
    });
  }

  public createRect(name: string, color: number): PIXI.Graphics {
    const rect = new PIXI.Graphics()
      .beginFill(color)
      .drawRect(0, 0, 200, 200)
      .endFill();
    rect.interactive = true;
    rect.buttonMode = true;
    rect.pivot.set(100, 100);
    rect.name = name;
    return rect;
  }
}
