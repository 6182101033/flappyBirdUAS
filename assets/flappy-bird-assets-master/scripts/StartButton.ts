import { _decorator, Component, Button, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartButton')
export class StartButton extends Component {

    start() {
        const button = this.getComponent(Button);
        if (button) {
            button.node.on(Button.EventType.CLICK, this.onClickStart, this);
        }
    }

    onClickStart() {
        // Ganti ke scene game utama, misalnya "GameScene"
        director.loadScene("GameScene");
    }
}
