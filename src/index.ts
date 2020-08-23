import * as PIXI from "pixi.js";

window.onload = () => {
  const app = new PIXI.Application({
    width: 600,
    height: 400,
    backgroundColor: 0x1099bb,
  });

  const element = document.getElementById("app");
  element?.appendChild(app.view);
};
