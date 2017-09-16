import { Component, Input, OnInit, trigger, state, style, transition, animate } from '@angular/core';

const RECTO = 'recto';
const VERSO = 'verso';

@Component({
    selector: 'app-flip',
    templateUrl: './flip.component.html',
    styleUrls: ['./flip.component.scss'],
    animations: [
        trigger('flipState', [
            state(VERSO, style({
                transform: 'rotateY(179.9deg)'
            })),
            state(RECTO, style({
                transform: 'rotateY(0)'
            })),
            transition(`${VERSO} => ${RECTO}`, animate('300ms ease-out')),
            transition(`${RECTO} => ${VERSO}`, animate('300ms ease-in'))
        ])
    ]
})
export class FlipComponent {

    private _flip: string = RECTO;

    @Input()
    public set flip(val: string | null) {
        if (val === RECTO || val === VERSO) {
            this._flip = val;
        } else {
            this._flip = (this.flip === RECTO) ? VERSO : RECTO;
        }
    }
    public get flip(): string {
        return this._flip;
    }

    toggleFlip() {
        this.flip = 'invert';
    }

}
