import { Action } from "@ngrx/store";

export const ADD_SYMBOL = '[Tile] Add';
export const REMOVE_SYMBOL = '[Tile] Remove';


export class AddSymbol implements Action {
    readonly type = ADD_SYMBOL;
    constructor(
        public key: string,
        public index: number,
        public color: string) { }
}

export class RemoveSymbol implements Action {
    readonly type = REMOVE_SYMBOL;
    constructor(
        public index: number) { }
}

export type ALL = AddSymbol | RemoveSymbol;