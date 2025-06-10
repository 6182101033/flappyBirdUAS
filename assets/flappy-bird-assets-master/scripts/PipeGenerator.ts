import { _decorator, Component, Prefab, instantiate, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeGenerator')
export class PipeGenerator extends Component {
    @property(Prefab)
    pipePrefab: Prefab = null;

    @property
    spawnInterval: number = 1; // tiap 1 detik

    @property
    pipeX: number = 500;

    @property
    minY: number = -100;

    @property
    maxY: number = 150;

    @property
    pipeGap: number = 300;

    private timer = 0;
    private lastPipeX: number = 0;

    // 🧠 dipanggil sebelum frame 1, semua property prefab udah ready
    onLoad() {
        this.spawnPipe(); // langsung spawn begitu node aktif
    }

    update(dt: number) {
        this.timer += dt;
        if (this.timer >= this.spawnInterval) {
            this.spawnPipe();
            this.timer = 0;
        }
    }

    spawnPipe() {
        const pipe = instantiate(this.pipePrefab);
        const randomY = Math.random() * (this.maxY - this.minY) + this.minY;

        this.lastPipeX = this.lastPipeX === 0 ? this.pipeX : this.lastPipeX + this.pipeGap;

        pipe.setPosition(new Vec3(this.lastPipeX, randomY, 0));
        this.node.addChild(pipe);
    }
}
