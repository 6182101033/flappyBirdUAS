import { _decorator, Component, Node, input, Input, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdController')
export class BirdController extends Component {
    @property(Node)
    downflap: Node = null;

    @property(Node)
    midflap: Node = null;

    @property(Node)
    upflap: Node = null;

    @property
    gravity: number = -300;

    @property
    velocity: number = 100;

    @property
    jumpForce: number = 180;

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouch, this);
        this.setSprite(this.midflap); // Set awal ke midflap
    }

    update(dt: number) {
        this.velocity += this.gravity * dt;
        const pos = this.node.position;
        this.node.setPosition(new Vec3(pos.x, pos.y + this.velocity * dt, pos.z));

        // Saat jatuh, ubah ke downflap
        if (this.velocity < 0) {
            this.setSprite(this.downflap);
        }
    }

    onTouch() {
        this.velocity = this.jumpForce;

        // Saat loncat, tampilkan upflap lalu balik ke midflap
        this.setSprite(this.upflap);
        this.scheduleOnce(() => {
            this.setSprite(this.midflap);
        }, 0.1);
    }

    private setSprite(target: Node) {
        if (!this.downflap || !this.midflap || !this.upflap) {
            console.warn("Pastikan semua sprite Node sudah di-assign di Inspector!");
            return;
        }

        this.downflap.active = false;
        this.midflap.active = false;
        this.upflap.active = false;

        if (target) {
            target.active = true;
        }
    }
}
