import { Component, Inject, ViewChild } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from '../app.component';
import {
  LinkAnnotationService, BookmarkViewService, MagnificationService,
  ThumbnailViewService, ToolbarService, NavigationService,
  AnnotationService, TextSearchService, TextSelectionService,
  PrintService, FormDesignerService, FormFieldsService,
  PdfViewerModule,
  PdfViewerComponent, TextFieldSettings, SignatureFieldSettings, InitialFieldSettings,
  CheckBoxFieldSettings, RadioButtonFieldSettings,
  ValidateFormFieldsArgs
} from '@syncfusion/ej2-angular-pdfviewer';
import { data, DataKeys } from "./fakedata";

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AppComponent,
    PdfViewerModule],
  providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService,
    NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormDesignerService, FormFieldsService],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css'
})
export class ModalDialogComponent {

  @ViewChild('pdfviewer')
  public pdfviewerControl?: PdfViewerComponent;
  public document: string = 'assets/jfs.pdf';
  public resource: string = "https://cdn.syncfusion.com/ej2/23.1.43/dist/ej2-pdfviewer-lib";

  isAnyOneSelected: boolean = false;
  pdfData: any = {};
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
  ) {

  }
   validateFormFields(e: ValidateFormFieldsArgs): void {
    e.nonFillableFields;
  }
  loaded() {

    
    this.pdfviewerControl?.enableAutoComplete;

    let allFields = this.pdfviewerControl?.retrieveFormFields()
    if (allFields) {
      allFields.forEach((field: any, i: number) => {
        if (field.name in data && this.pdfviewerControl) {
          const fieldName = field.name as keyof typeof data;
          const value = data[fieldName];
          console.log(value);
          if (value !== undefined && value !== '') {
            this.pdfviewerControl.formDesignerModule.updateFormField(
              this.pdfviewerControl.formFieldCollections[i],
              { value: value, isReadOnly: true } as TextFieldSettings
            );
          } 
        }
      })
      this.pdfData = allFields;
    }

  }


  ngOnInit() {

    document.querySelectorAll('div').forEach((div) => {
      if (div.innerText == "This application was built using a trial version of Syncfusion Essential Studio. To remove the license validation message permanently, a valid license key must be included. Claim your free account") {
        div.style.display = "none";
      }
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
