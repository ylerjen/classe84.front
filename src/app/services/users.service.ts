import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { environment as env } from '../../environments/environment';
import { User } from '../models/User';
import { UsersState, LOAD_USER, DELETE_USER, LOAD_USER_START } from '../stores/userlistReducer';


const BASE_URL = env.API_URL + 'users';

@Injectable()
export class UsersService {

    users: Observable<Array<User>>;
    isLoading: Observable<boolean>;

    constructor(private http: Http, private store: Store<UsersState>) {
        this.users = store.select('users');
        this.isLoading = store.select('isLoading');
    }

    reload() {
        this.store.dispatch( { type: LOAD_USER_START});
        this.http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: LOAD_USER, payload }))
            .subscribe(action => {
                setTimeout(()=>{
                    this.store.dispatch({ type: 'LOAD_USER_SUCCESS' });
                    this.store.dispatch(action);
                });
            });
    }

    add(user: User) {
        console.log('add user from service');
    }

    delete(user: User) {
        console.log(DELETE_USER + ' from service');
        this.store.dispatch({ type: DELETE_USER, payload: user });
    }


    // EXAMPLE METHODS

    saveItem(item: User) {
        (item.id) ? this.updateItem(item) : this.createItem(item);
    }

    createItem(item: User) {
        this.http.post(`${BASE_URL}`, JSON.stringify(item))
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_ITEM', payload }))
            .subscribe(action => this.store.dispatch(action));
    }

    updateItem(item: User) {
        this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item))
            .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
    }

    deleteItem(item: User) {
        this.http.delete(`${BASE_URL}${item.id}`)
            .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
    }
}
