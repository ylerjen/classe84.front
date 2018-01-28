import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoveryFormComponent } from './account-recovery-form.component';

xdescribe('PasswordRecoveryComponent', () => {
    let component: AccountRecoveryFormComponent;
    let fixture: ComponentFixture<AccountRecoveryFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountRecoveryFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountRecoveryFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
