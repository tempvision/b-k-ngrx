import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AddSymbol, RemoveSymbol } from '../actions/tile.actions';
import { Tile } from '../models/tile.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  value: any;
  color = 'incorrect';
  rowOne = new Array(6).fill('');
  currentIndex = -1;
  inputData: any;

  constructor(private store: Store<any>) {
    this.inputData = this.store.select('tiles').pipe(switchMap((val: any) => {
      if (val?.type === 'add') {
        this.rowOne[val.index] = val.key;
      } else if (val?.type === 'remove') {
        this.rowOne[this.currentIndex + 1] = ''
      }
      return of(val);
    })).subscribe();
  }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    // check for valid input - only numbers
    if (this.currentIndex === 5 && key === 'enter') {
      // submit the form
    }

    if (this.currentIndex === 5 && key !== 'backspace') { // max lenght is 6
      return;
    }

    if (this.currentIndex === -1 && key === 'backspace') { // cannot go below 0
      return;
    }

    if (key === 'backspace') { // clear a symbol
      this.currentIndex -= 1;
      this.store.dispatch(new RemoveSymbol(this.currentIndex));
    } else { // add symbol
      this.currentIndex += 1;
      this.store.dispatch(new AddSymbol(key, this.currentIndex, 'incorrect'));
    }
  }

}