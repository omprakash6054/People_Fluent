import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpApiService } from '../http-api.service';
import { AddStudentComponent } from '../add-student/add-student.component';
import { Student } from '../student.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css'],
})
export class StudentInfoComponent implements OnInit {
  displayedColumns: string[] = [
    'studentName',
    'studentScore',
    'studentClass',
    'action',
  ];
  classOptions = [
    { name: 'A', value: '1', checked: false },
    { name: 'B', value: '2', checked: false },
    { name: 'C', value: '3', checked: false },
  ];
  dataSource: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  studentForm!: FormGroup;
  studentData: any;
  studentScoreMin = new FormControl();
  studentScoreMax = new FormControl();
  studentClass = new FormControl();

  allStudents: Student[] = [];

  filteredValues = { name: '', studentClass: '' };

  constructor(
    private HttpApi: HttpApiService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.studentForm = this.formBuilder.group({
      studentName: ['', Validators.required],
      studentScore: ['', Validators.required],
      studentClass: ['', Validators.required],
    });
    /*  this.studentScore.valueChanges.subscribe((studentScoreValue)=> {
      this.filteredValues['name'] = studentScoreValue;
      });
  
      this.studentClass.valueChanges.subscribe((studentClassValue) => {
        this.filteredValues['studentClass'] = studentClassValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      }); */
  }
  getStudents() {
    this.HttpApi.getData().subscribe({
      next: (res) => {
        this.allStudents = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log('error');
      },
    });
  }
  editStudent(element: any) {
    this.dialog
      .open(AddStudentComponent, {
        width: '50%',
        data: element,
      })
      .afterClosed()
      .subscribe((val) => {
        if ((val = 'update')) {
          this.getStudents();
        }
      });
  }
  deleteStudent(id: any) {
    this.HttpApi.deleteData(id).subscribe({
      next: (res) => {
        this.getStudents();
      },
      error: (err) => {
        console.log('error');
      },
    });
  }
  addStudentModel() {
    this.dialog
      .open(AddStudentComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if ((val = 'save')) {
          this.getStudents();
        }
      });
  }

  search(): void {
    const scoreMax = this.studentScoreMax.value;
    const scoreMin = this.studentScoreMin.value;
    //********************* */
    if (scoreMax < scoreMin) {
      return;
    }
    const StudentClass = this.studentClass.value;
    const filtredStudents = this.allStudents.filter(
      (student) =>
        (!scoreMax || (student.studentScore ?? scoreMax) <= scoreMax) &&
        (!scoreMin || (student.studentScore ?? scoreMin) >= scoreMin) &&
        (!StudentClass ||
          (student.studentClass ?? StudentClass) == StudentClass)
    );

    this.dataSource = new MatTableDataSource(filtredStudents);
    this.dataSource.paginator = this.paginator;
  }

  useLanguage(event: any): void {
    const language = event.checked ? 'fr' : 'en';
    this.translate.use(language);
  }
}
