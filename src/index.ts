import GameManager from "managers/GameManager"

window.onload = () => {
  GameManager.start({
    glWidth: 600,
    glHeight: 400,
    option: {
      backgroundColor: 0x1099bb,
    }
  });
};
