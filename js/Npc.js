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

    update(delta) {
        this.mixer.update(delta);
    }


}