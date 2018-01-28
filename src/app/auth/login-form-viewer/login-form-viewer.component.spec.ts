import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormViewerComponent } from './login-form-viewer.component';

xdescribe('LoginFormViewerComponent', () => {
    let component: LoginFormViewerComponent;
    let fixture: ComponentFixture<LoginFormViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginFormViewerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginFormViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
