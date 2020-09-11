import { Component, OnInit, Input, Inject } from '@angular/core';
import { User } from '../model/user';
import * as moment from 'moment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GameService } from '../service/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-admin-control',
  templateUrl: './user-admin-control.component.html',
  styleUrls: ['./user-admin-control.component.scss']
})
export class UserAdminControlComponent implements OnInit {

  @Input() user: User;

  constructor(
    public dialog: MatDialog,
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log(this.user);
  }

  get permissions(): any[] {
    return this.user? Object.values(this.user.permissions) : [];
  }

  showDialog(permission: any) {
    const dialogRef = this.dialog.open(RevokeDialog, {
      data: {
        username: this.user.name,
        name: permission.permission_id, 
        date: permission.revoked_until ? moment(permission.revoked_until) : moment()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.date);
      if (result.date)
        this.gameService.updatePermission(this.user.id,result.name,result.date)
          .subscribe(r => {
            this.user.permissions = r;
            this.snackBar.open("Permission Revoked.",null,{
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            });
          });
    });
  }

  showDialogGrant(permission: any) {
    const dialogRef = this.dialog.open(GrantDialog, {
      data: {
        username: this.user.name,
        name: permission.permission_id, 
        date: permission.revoked_until ? moment(permission.revoked_until) : moment()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.date);
      if (result.date)
        this.gameService.updatePermission(this.user.id,result.name,moment())
          .subscribe(r => {
            this.user.permissions = r;
            this.snackBar.open("Permission Granted.",null,{
              duration: 5000,
              panelClass: ['mat-toolbar', 'mat-primary']
            });
          });
    });
  }

  isRevoked(permission: any): boolean {
    if (!permission.revoked_until) return false;
    return (moment(permission.revoked_until).isAfter(moment()));
  }
}

export interface DialogData {
  username: string;
  date: moment.Moment;
  name: string;
}

@Component({
  selector: 'app-revoke-dialog',
  template: `
  <h1 mat-dialog-title>Revoking {{data.name}}</h1>
  <div mat-dialog-content>
    <p>Revoke for how long?</p>
    <mat-form-field>
      <input matInput name="date"
        [matDatepicker]="revokePicker" 
        placeholder="Revoked Until" 
        [(ngModel)]="data.date">
      <mat-datepicker-toggle matSuffix [for]="revokePicker"></mat-datepicker-toggle>
      <mat-datepicker #revokePicker></mat-datepicker>
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-raised-button (click)="onNoClick()">Cancel</button>
    <button mat-raised-button [mat-dialog-close]="data" color="warn" cdkFocusInitial>Revoke</button>
  </div>`,
})
export class RevokeDialog {

  constructor(
    public dialogRef: MatDialogRef<RevokeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-grant-dialog',
  template: `
  <h1 mat-dialog-title>Granting {{data.name}}</h1>
  <div mat-dialog-content>
    <p>Grant permission {{data.name}} to {{data.username}}?</p>
    <p *ngIf="isRevoked(data.date)">Revoked until {{data.date | date}} (Remaining: {{data.date | duration}})</p>
  </div>
  <div mat-dialog-actions>
    <button mat-raised-button (click)="onNoClick()">Cancel</button>
    <button mat-raised-button [mat-dialog-close]="data" color="primary" cdkFocusInitial>Grant</button>
  </div>`,
})
export class GrantDialog {
  constructor(
    public dialogRef: MatDialogRef<GrantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRevoked(revoked_until: moment.Moment): boolean {
    if (!revoked_until) return false;
    return (moment(revoked_until).isAfter(moment()));
  }
}