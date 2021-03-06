import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    cancel(): void {
      this.dialogRef.close();
    }

    ok(): void {
      this.dialogRef.close(this.data);
    }

    forgot() {
      this.data.forgot = true;
      this.dialogRef.close(this.data);
    }
}

export interface DialogData {
  username: string;
  password: string;
  forgot: boolean;
}