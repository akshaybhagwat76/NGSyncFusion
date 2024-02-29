import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PdfViewerModule, ModalDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FreelancerDemo ';
  
  pdfContent: any = './assets/demo.pdf';
  editableFields: any = {}; // Object to store editable field values

  ngOnInit():void{
    this.openDialog()
  }
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ModalDialogComponent);
  }

}
