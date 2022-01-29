// Created based on these tutorials:
// https://github.com/WebDevSimplified/chrome-dino-game-clone
// https://github.com/WebDevSimplified/js-pong

import Road from "./road.js";
import CarPlayer from "./carPlayer.js";
import { resetCarObstacles, updateCarObstacles, getCarObstaclesRects } from "./carObstacle.js";

const SPEED_SCALE_INCREASE = 0.0008;
const MAX_SPEED_SCALE = 5;
const MAX_LIVES = 3;

const gameWrapperElem: HTMLElement = document.getElementById("game-wrapper");
const scoreElem: HTMLElement = document.getElementById("score");
const startGameElem: HTMLElement = document.getElementById("start-game");
const lifeElems: HTMLElement[] = [...document.querySelectorAll<HTMLElement>(".life")];

const road = new Road([...document.querySelectorAll<HTMLElement>(".road")]);
const carPlayer = new CarPlayer(gameWrapperElem, document.getElementById("car-player"));

let lastTime: number;
let speedScale: number;
let score: number;
let lives: number;

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

    if (!carPlayer.isBlinking && checkCollision(carPlayer.rect(), getCarObstaclesRects())) {
        speedScale = 0;
        lives--;
        lifeElems[lives].classList.add("hidden");
        if (lives > 0) {
            carPlayer.blink(1500);
        } else {
            handleLose();
            return;
        }
    }

    updateSpeedScale(deltaTime);  // TODO fix bug fast road
    updateScore(deltaTime);
    lastTime = time;
    window.requestAnimationFrame(update);
}

function handleStart(): void {
    lastTime = null;
    speedScale = 0;
    score = 0;
    lives = MAX_LIVES;
    for (const life of lifeElems) {
        life.classList.remove("hidden");
    }
    carPlayer.reset();
    resetCarObstacles();
    startGameElem.classList.add("hidden");
    window.requestAnimationFrame(update);
}

function handleLose(): void {
    startGameElem.classList.remove("hidden");
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true });
    }, 500);
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

document.addEventListener("keydown", handleStart, { once: true });
document.addEventListener("contextmenu", (e: Event): void => e.preventDefault());
