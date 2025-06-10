import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MoveLeft')
export class MoveLeft extends Component {
    @property
    speed: number = 150;

    update(dt: number) {
        const pos = this.node.position;
        this.node.setPosition(new Vec3(pos.x - this.speed * dt, pos.y));

        if (pos.x < -600) {
            this.node.destroy();
        }
    }
}
