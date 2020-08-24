import GameManager from "managers/GameManager";
import FirstScene from "scenes/FirstScene";

window.onload = () => {
  GameManager.start({
    glWidth: 600,
    glHeight: 400,
    option: {
      backgroundColor: 0x1099bb,
    },
  });
  GameManager.loadScene(new FirstScene());
};
