import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ForgotPasswordDialogData) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ok(): void {
    this.dialogRef.close(this.data);
  }
}

export interface ForgotPasswordDialogData {
  username: string;
  password: string;
}
