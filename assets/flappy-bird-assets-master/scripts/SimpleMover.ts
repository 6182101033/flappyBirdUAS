import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SimpleMover')
export class SimpleMover extends Component {
    @property
    speed: number = 100; // bisa diganti di Inspector

    update(dt: number) {
        const pos = this.node.position;
        this.node.setPosition(new Vec3(pos.x - this.speed * dt, pos.y));
    }
}
