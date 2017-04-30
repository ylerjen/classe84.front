import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { environment as env } from '../../environments/environment';
import { User } from '../models/User';
import { IUserState } from '../stores/IUserState';
import { ADD_USER, DELETE_USER, ASYNC_USER_START, LOAD_USER_SUCCESS, CHANGE_FILTER } from '../actions/users.actions';


const BASE_URL = `${env.API_URL}/users`;

@Injectable()
export class UsersService {

    usersStore$: Observable<IUserState>;

    constructor(private _http: Http, private _store: Store<IUserState>) {
        this.usersStore$ = _store.select('usersList');
    }

    reload() {
        this._store.dispatch( { type: ASYNC_USER_START});
        this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: LOAD_USER_SUCCESS, payload }))
            .subscribe(action => {
                setTimeout(() => {
                    this._store.dispatch(action);
                }, 500);
            });
    }

    add(user: User) {
        console.log('add user from service');
    }

    delete(user: User) {
        console.log(DELETE_USER + ' from service');
        this._store.dispatch({ type: DELETE_USER, payload: user });
    }

    updateFilter(filter: string) {
        this._store.dispatch({ type: CHANGE_FILTER });
    }

    // EXAMPLE METHODS

    saveItem(item: User) {
        (item.id) ? this.updateItem(item) : this.createItem(item);
    }

    createItem(item: User) {
        this._http.post(`${BASE_URL}`, JSON.stringify(item))
            .map(res => res.json())
            .map(payload => ({ type: ADD_USER, payload }))
            .subscribe(action => this._store.dispatch(action));
    }

    updateItem(item: User) {
        this._http.put(`${BASE_URL}${item.id}`, JSON.stringify(item))
            .subscribe(action => this._store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
    }

    deleteItem(item: User) {
        this._http.delete(`${BASE_URL}${item.id}`)
            .subscribe(action => this._store.dispatch({ type: DELETE_USER, payload: item }));
    }
}
