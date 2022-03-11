import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const INITIAL_STATE: State = {
  name: 'Rafi',
  company: 'Mobi'
};

@Injectable({
  providedIn: 'root'
})
export class StateService {

    private _state = new BehaviorSubject<State>(INITIAL_STATE);

    state = this._state.asObservable(); 

    changeName(newName: string) {
      const oldState = this._state.getValue()
      this._state.next({ ...oldState, name: newName });
    }

}

export interface State {
  name: string;
  company: string;
}
