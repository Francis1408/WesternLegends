import * as THREE from 'three';

export class NPC {
    name = null;
    animations = {};
    animationLoopList = [];
    currentAnimation = null;
    mixer = null;
    model = null;

    #fadeTime = 0.3;
    #isPlayingOnce = false; // guard to avoid interrupting another playOnce

    constructor(name, mixer, model, animations, currentAnimation, animationLoopList = []) {
        this.name = name;
        this.animations = animations;
        this.currentAnimation = currentAnimation;
        this.mixer = mixer;
        this.model = model;
        this.animationLoopList = animationLoopList

        if (this.animationLoopList.length > 0) {
            this.playAnimationLoop(); 
        } else if (this.currentAnimation) {
            this.currentAnimation.play(); 
        }
    }

    // Animation loop
    playAnimationLoop() {

        if (!this.animationLoopList || this.animationLoopList.length === 0) return;

        const playNext = () => {

            if (this.#isPlayingOnce) return; // don't interrupt the one shot animation

            // Pick a random animation from the list
            const randomName = this.animationLoopList[Math.floor(Math.random() * this.animationLoopList.length)];
            const next = this.animations[randomName];
            if (!next) return;

            next.loop = THREE.LoopOnce;
            next.clampWhenFinished = true; // Holds the last frame from the last animation
            next.reset().play();

            if (this.currentAnimation) {
                next.crossFadeFrom(this.currentAnimation, this.#fadeTime, true);
            }

            this.currentAnimation = next;

            // When this animation finishes, play another one
            this.mixer.addEventListener('finished', onFinished);
        }

        const onFinished = (e) => {
            // Remove listener so it doesn't stack up
            this.mixer.removeEventListener('finished', onFinished);
            playNext();
        }

        playNext();
    }

    // Plays once and resume to the loop
    playOnce(name) {

        const next = this.animations[name];
        if (!next || this.#isPlayingOnce) return;

        this.#isPlayingOnce = true;

        if (this.currentAnimation) {
            this.currentAnimation.fadeOut(this.#fadeTime);
        }

        next.loop = THREE.LoopOnce;
        next.clampWhenFinished = true;
        next.reset().fadeIn(this.#fadeTime).play();
        this.currentAnimation = next;

        const onFinished = () => {
            this.mixer.removeEventListener('finished', onFinished);
            this.#isPlayingOnce = false;
            this.playAnimationLoop(); // resume the loop
        }

        this.mixer.addEventListener('finished', onFinished);

    }

    update(delta) {
        this.mixer.update(delta);
    }

}