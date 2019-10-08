import { Component, Input } from '@angular/core';
import { AppInfo } from '@models/AppInfo';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    @Input()
    public version: AppInfo;
}
