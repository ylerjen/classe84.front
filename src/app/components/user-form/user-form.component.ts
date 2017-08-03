import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, EGender } from '../../models/User';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

    private _user: User;

    @Input()
    set user(val: User) {
        this._user = val;
        this.createForm();
    }
    get user(): User {
        return this._user;
    }

    @Output()
    saveEvent = new EventEmitter<User>();

    @Output()
    cancelEvent = new EventEmitter<number>();

    public userForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    createForm() {
        if (!this.user) {
            return;
        }
        this.userForm = this.fb.group({
            id: [this.user.id || ''],
            gender: [this.user.gender || EGender.Male, Validators.required ],
            last_name: [this.user.last_name || '', Validators.required ],
            maiden_name: [this.user.maiden_name || '' ],
            first_name: [this.user.first_name || '', Validators.required ],
            birthdate: [this.user.birthdate || '', Validators.required ],
            email: [this.user.email || '', Validators.email],
            phone: [this.user.phone || '', Validators.maxLength(12)],
            mobile: [this.user.mobile || '', Validators.maxLength(12)],
            website: [this.user.website || ''],
            fb_profile_name: [this.user.fb_profile_name || ''],
            fb_user_id: [this.user.fb_user_id || ''],
            is_active: [this.user.is_active || false],
        });
  }

  onSubmit(event: Event) {
      event.preventDefault();
      this.saveEvent.emit(this.userForm.value);
  }

  onCancel(event: MouseEvent) {
      event.preventDefault();
      console.log('cancel', event);
      this.cancelEvent.emit(this.user.id);
  }
}
