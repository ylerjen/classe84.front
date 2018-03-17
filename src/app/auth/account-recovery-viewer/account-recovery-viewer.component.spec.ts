import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoveryViewerComponent } from './account-recovery-viewer.component';

import { AuthService } from 'app/services/auth/auth.service';
import { NotificationService } from 'app/services/notification/notification.service';

xdescribe('AccountRecoveryViewerComponent', () => {
    let component: AccountRecoveryViewerComponent;
    let fixture: ComponentFixture<AccountRecoveryViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AccountRecoveryViewerComponent ],
            providers: [ AuthService, NotificationService ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountRecoveryViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
