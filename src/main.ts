// Created based on these tutorials:
// https://github.com/WebDevSimplified/chrome-dino-game-clone
// https://github.com/WebDevSimplified/js-pong

import Road from "./road.js";
import CarPlayer from "./car.js";

const GAME_WIDTH = 100
const GAME_HEIGHT = 35
const SPEED_SCALE_INCREASE = 0.0002;
const MAX_SPEED_SCALE = 5;

const gameElem: HTMLElement = document.getElementById("game-wrapper");
const scoreElem: HTMLElement = document.getElementById("score");
const startGameElem: HTMLElement = document.getElementById("start-game");

const road = new Road([...document.querySelectorAll<HTMLElement>(".road")]);
const carPlayer = new CarPlayer(document.getElementById("car-player"));

let lastTime: number;
let speedScale: number;
let score: number;
function update(time: number): void {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const deltaTime = time - lastTime;

    road.update(deltaTime, speedScale);
    carPlayer.update(deltaTime, speedScale);
    updateSpeedScale(deltaTime);  // TODO fix bug fast road
    updateScore(deltaTime);

    lastTime = time;
    window.requestAnimationFrame(update);
}

function updateSpeedScale(deltaTime: number): void {
    if (speedScale <= MAX_SPEED_SCALE) {
        speedScale += SPEED_SCALE_INCREASE * deltaTime;
    }
}

function updateScore(deltaTime: number): void {
    score += deltaTime * 0.01;
    scoreElem.innerText = Math.floor(score).toString();
}

function handleStart(): void {
    lastTime = null;
    speedScale = 1;
    score = 0;
    startGameElem.classList.add("hidden");
    window.requestAnimationFrame(update);
}

function setPixelToGameScale(): void {
    let gameToPixelScale;
    if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
        gameToPixelScale = window.innerWidth / GAME_WIDTH;
    } else {
        gameToPixelScale = window.innerHeight / GAME_HEIGHT;
    }
    gameElem.style.width = `${GAME_WIDTH * gameToPixelScale}px`;
    gameElem.style.height = `${GAME_HEIGHT * gameToPixelScale}px`;
}

setPixelToGameScale();
window.addEventListener("resize", setPixelToGameScale);
document.addEventListener("keydown", handleStart, { once: true });
