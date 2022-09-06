import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { HttpApiService } from '../http-api.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm = new FormGroup({
    studentName: new FormControl(''),
    studentClass: new FormControl(''),
    studentScore: new FormControl(''),
  });
  actionText: string = this.translate.instant('student.addStudent');
  headerText: string = 'Add';

  constructor(
    public dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public formBuilder: FormBuilder,
    private HttpApi: HttpApiService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      studentScore: ['', Validators.required],
      studentClass: ['', Validators.required],
    });
    if (this.editData) {
      this.actionText = this.translate.instant('student.updateStudent');
      this.headerText = 'Update';
      this.studentForm.controls['studentName'].setValue(
        this.editData.studentName
      );
      this.studentForm.controls['studentScore'].setValue(
        this.editData.studentScore
      );
      this.studentForm.controls['studentClass'].setValue(
        this.editData.studentClass
      );
    }
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
  addStudent() {
    if (!this.editData) {
      if (this.studentForm.valid) {
        this.HttpApi.postData(this.studentForm.value).subscribe({
          next: (res) => {
            console.log(this.studentForm.value);

            this.studentForm.reset();
            this.dialogRef.close('Save');
          },
          error: () => {
            console.log('something went wrong');
          },
        });
      }
    } else {
      this.updateStudent();
    }
  }
  updateStudent() {
    this.HttpApi.putData(this.studentForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.studentForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        console.log('err');
      },
    });
  }
}
