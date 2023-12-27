import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board } from '../models';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

  constructor() { }

  board: Board = {
    name: 'Demo Board',
    columns: [{
      name: 'Concept',
      tasks: [
        "Think of something good",
        "Get creative",
        "Visualize your goals"
      ]
    },
    {
      name: 'Research',
      tasks: [
        "Calculate the work needed",
        "More reading",
        "Even more reading"
      ]
    },
    {
      name: 'Todo',
      tasks: [
        'Task 1',
        'task 64',
        'Check in with POs',
        'Redo part of the code'
      ]
    },
    {
      name: 'Done',
      tasks:
        [
          'Wake up',
          'Go to work',
          'Coffee',
        ]
    }]
  };

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


}
