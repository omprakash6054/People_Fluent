import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpApiService } from '../http-api.service';
import { StudentInfoComponent } from './student-info.component';

describe('StudentInfoComponent', () => {
  let component: StudentInfoComponent;
  let fixture: ComponentFixture<StudentInfoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatPaginatorModule,
        MatRadioModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [TranslateService],
      declarations: [StudentInfoComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StudentInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get students', fakeAsync(() => {
    expect(component.allStudents.length).toBe(0);

    component.allStudents = [
      { studentName: 'ah', studentClass: 'A', studentScore: '22' },
    ];
    expect(component.allStudents.length).toBeGreaterThan(0);
  }));

  it('should delete the student', fakeAsync(() => {
    expect(component.allStudents.length).toBe(0);

    component.allStudents = [
      { studentName: 'ah', studentClass: 'A', studentScore: '22' },
    ];
    expect(component.allStudents.length).toBeGreaterThan(0);

    component.allStudents.pop();

    expect(component.allStudents.length).toBe(0);
  }));

  it('should get the search value', fakeAsync(() => {
    expect(component.allStudents.length).toBe(0);

    component.allStudents = [
      { studentName: 'ah', studentClass: 'A', studentScore: '23' },
      { studentName: 'ba', studentClass: 'A', studentScore: '21' },
    ];

    const addStudentBtn =
      fixture.debugElement.nativeElement.querySelector('#filterBtn');

    component.studentScoreMax.setValue(22);
    component.studentScoreMin.setValue(21);
    addStudentBtn.click();

    expect(component.allStudents.length).toBeGreaterThan(1);
  }));
});
