import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Board } from '../models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddItemModalComponent } from '../add-item-modal/add-item-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    AddItemModalComponent,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,

  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

  constructor(public dialog: MatDialog) { }

  // initial static kanban board
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

  openDialog(columnIndex: number): void {
    const dialogRef = this.dialog.open(AddItemModalComponent, {
      width: 'fit-content',
      data: { columnName: this.board.columns[columnIndex].name },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.board.columns[columnIndex].tasks.push(result);
      }
    });
  }

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
