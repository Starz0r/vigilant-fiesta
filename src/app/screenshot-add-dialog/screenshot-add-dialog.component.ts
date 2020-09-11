import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../core/login/login.component';

@Component({
  selector: 'app-screenshot-add-dialog',
  templateUrl: './screenshot-add-dialog.component.html',
  styleUrls: ['./screenshot-add-dialog.component.scss']
})
export class ScreenshotAddDialogComponent implements OnInit {

  source: string|ArrayBuffer = "/assets/images/upload.png"

  getImage() {
    return 'url('+this.source+')';
  }

  constructor(
    public dialogRef: MatDialogRef<ScreenshotSubmission>,
    @Inject(MAT_DIALOG_DATA) public data: ScreenshotSubmission) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.data.file = files.item(0);

    var reader = new FileReader();
    reader.readAsDataURL(this.data.file); 
    reader.onload = (_event) => { 
      this.source = reader.result;
    }
  }
}

export interface ScreenshotSubmission {
  description?: string;
  file?: File;
}