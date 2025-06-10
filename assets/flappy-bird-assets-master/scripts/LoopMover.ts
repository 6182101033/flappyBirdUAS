import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoopMover')
export class LoopMover extends Component {
    @property([Node])
    parts: Node[] = []; // background1 dan background2

    @property
    speed: number = 100;

    private widths: number[] = [];

    start() {
        this.widths = this.parts.map(part => part.getComponent(UITransform).width);
    }

    update(dt: number) {
        for (let i = 0; i < this.parts.length; i++) {
            const part = this.parts[i];
            const pos = part.position;
            part.setPosition(new Vec3(pos.x - this.speed * dt, pos.y));
        }

        for (let i = 0; i < this.parts.length; i++) {
            const part = this.parts[i];
            if (part.position.x <= -this.widths[i]) {
                // cari yang paling kanan
                let maxX = Math.max(...this.parts.map(p => p.position.x));
                part.setPosition(new Vec3(maxX + this.widths[i], part.position.y));
            }
        }
    }
}
