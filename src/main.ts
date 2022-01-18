// Created based on these tutorials:
// https://github.com/WebDevSimplified/chrome-dino-game-clone
// https://github.com/WebDevSimplified/js-pong

import Road from "./road.js";
import CarPlayer from "./carPlayer.js";
import { resetCarObstacles, updateCarObstacles, getCarObstaclesRects } from "./carObstacle.js";

const GAME_WIDTH = 100
const GAME_HEIGHT = 35
const SPEED_SCALE_INCREASE = 0.00008;
const MAX_SPEED_SCALE = 5;

const gameWrapperElem: HTMLElement = document.getElementById("game-wrapper");
const scoreElem: HTMLElement = document.getElementById("score");
const startGameElem: HTMLElement = document.getElementById("start-game");

const road = new Road([...document.querySelectorAll<HTMLElement>(".road")]);
const carPlayer = new CarPlayer(gameWrapperElem, document.getElementById("car-player"));

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
    updateCarObstacles(deltaTime, speedScale);
    if ( checkCollision(carPlayer.rect(), getCarObstaclesRects()) ) {
        console.log("a");
    }
    updateSpeedScale(deltaTime);  // TODO fix bug fast road
    updateScore(deltaTime);

    lastTime = time;
    window.requestAnimationFrame(update);
}

function handleStart(): void {
    lastTime = null;
    speedScale = 1;
    score = 0;
    carPlayer.reset();
    resetCarObstacles();
    startGameElem.classList.add("hidden");
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

function checkCollision(playerRect: DOMRect, obstaclesRects: DOMRect[]): boolean {
    return obstaclesRects.some((rect): boolean => {
        return (
            playerRect.top < rect.bottom &&
            playerRect.bottom > rect.top &&
            playerRect.left < rect.right &&
            playerRect.right > rect.left
        );
    });
}

function setPixelToGameScale(): void {
    let gameToPixelScale;
    if (window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
        gameToPixelScale = window.innerWidth / GAME_WIDTH;
    } else {
        gameToPixelScale = window.innerHeight / GAME_HEIGHT;
    }
    gameWrapperElem.style.width = `${GAME_WIDTH * gameToPixelScale}px`;
    gameWrapperElem.style.height = `${GAME_HEIGHT * gameToPixelScale}px`;
}

setPixelToGameScale();
window.addEventListener("resize", setPixelToGameScale);
document.addEventListener("keydown", handleStart, { once: true });
document.addEventListener("contextmenu", (e: Event): void => e.preventDefault());
