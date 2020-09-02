import GameManager from "managers/GameManager";
import FirstScene from "scenes/FirstScene";

window.onload = () => {
  GameManager.start({
    glWidth: 1200,
    glHeight: 800,
    option: {
      backgroundColor: 0x1099bb,
    },
  });
  GameManager.loadScene(new FirstScene());
};
