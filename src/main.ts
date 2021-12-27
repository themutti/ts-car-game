// Created based on:
// https://github.com/WebDevSimplified/chrome-dino-game-clone

import { Road } from "./road.js";

const GAME_WIDTH = 100
const GAME_HEIGHT = 35

const gameElem: HTMLElement = document.querySelector(".game-wrapper");
const scoreElem: HTMLElement = document.querySelector(".score");
const startGameElem: HTMLElement = document.querySelector(".start-game");

const road = new Road();

setPixelToGameScale();
window.addEventListener("resize", setPixelToGameScale);

let lastTime: number;
let speedScale: number;
let score: number;
function update(time: number) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const deltaTime = time - lastTime;

    road.update(deltaTime, 2);

    lastTime = time;
    window.requestAnimationFrame(update);
}

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

window.requestAnimationFrame(update);
