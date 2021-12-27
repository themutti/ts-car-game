const GAME_WIDTH = 100
const GAME_HEIGHT = 35

const gameElem: HTMLElement = document.querySelector(".game-wrapper");

setPixelToGameScale();
window.addEventListener("resize", setPixelToGameScale);

function setPixelToGameScale() {
    let gameToPixelScale;
    if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
        gameToPixelScale = window.innerWidth / GAME_WIDTH;
    } else {
        gameToPixelScale = window.innerHeight / GAME_HEIGHT;
    }
    gameElem.style.width = `${GAME_WIDTH * gameToPixelScale}px`;
    gameElem.style.height = `${GAME_HEIGHT * gameToPixelScale}px`;
}
