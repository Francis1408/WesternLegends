export class NPC {
    name = null;
    animations = {};
    currentAnimation = null;
    mixer = null;
    model = null;

    constructor(name, animations, currentAnimation, mixer, model) {
        this.name = name;
        this.animations = animations;
        this.currentAnimation = currentAnimation;
        this.mixer = mixer;
        this.model = model;

        console.log(this.currentAnimation)

        if (this.currentAnimation) {
            this.currentAnimation.play();
        }
    }

    playAnimation(name, crossFadeDuration = 0.3) {
        const next = this.animations[name];
        if (!next || next === this.currentAnimation) return;

        if (this.currentAnimation) {
            this.currentAnimation.fadeOut(crossFadeDuration);
        }

        next.reset().fadeIn(crossFadeDuration).play();
        this.currentAction = next;
    }

    update(delta) {
        this.mixer.update(delta);
    }


}