import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { environment as env } from '../../environments/environment';
import { User } from '../models/User';
import { IUserListState } from '../stores/IUserState';
import { GET_USER,
    ADD_USER,
    DELETE_USER,
    ASYNC_USER_START,
    ASYNC_USER_SUCCESS,
    ASYNC_USERLIST_START,
    ASYNC_USERLIST_SUCCESS,
    CHANGE_FILTER } from '../actions/users.actions';


const BASE_URL = `${env.API_URL}/users`;

@Injectable()
export class UsersService {

    usersStore$: Observable<IUserListState>;

    constructor(private _http: Http, private _store: Store<IUserListState>) {
        this.usersStore$ = _store.select('usersList');
    }

    reload() {
        this._store.dispatch( { type: ASYNC_USERLIST_START});
        this._http.get(BASE_URL)
            .map(res => res.json())
            .map(payload => ({ type: ASYNC_USERLIST_SUCCESS, payload }))
            .subscribe(action => this._store.dispatch(action));
    }

    get(id: number) {
        this._store.dispatch( { type: ASYNC_USER_START});
        this._http.get(`${BASE_URL}/${id}`)
            .map(res => res.json())
            .map(payload => ({ type: ASYNC_USER_SUCCESS, payload }))
            .subscribe(action => this._store.dispatch(action));
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
/*
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
    */
}
