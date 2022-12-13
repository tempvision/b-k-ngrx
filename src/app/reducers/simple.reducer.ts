import { Action } from '@ngrx/store';
import { Tile } from '../models/tile.model';
import * as Actions from '../actions/tile.actions'

const newState = (state: any, newData: any) => {
    return Object.assign({}, state, newData);
};

export const simpleReducer = (state: Tile, action: any) => {

    // console.log(state, action)

    switch (action.type) {
        case Actions.ADD_SYMBOL:
            return newState(state, { key: action.key, index: action.index, type: 'add' });

        case Actions.REMOVE_SYMBOL:
            return newState(state, { type: 'remove' });
    }
};