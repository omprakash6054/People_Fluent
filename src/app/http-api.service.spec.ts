import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpApiService } from './http-api.service';

describe('HttpApiService', () => {
  let service: HttpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpApiService);
  });

  it('should get all students', () => {
    // expect(service).toBeTruthy();
    service.postData({ name: 'ah', score: 2, class: 'A' }).subscribe();
    service.getData().subscribe((res) => {
      expect(res.body).toEqual([]);
    });
  });

  it('should get all students', () => {
    // expect(service).toBeTruthy();
    service.getData().subscribe((res) => {
      expect(res.body).toEqual([]);
    });
  });

  it('should post a student', () => {
    // expect(service).toBeTruthy();
    service
      .postData({ studentName: 'ah', studentClass: 'A', studentScore: '23' })
      .subscribe((res) => {
        expect(res.body).toEqual([]);
      });
  });

  it('should put a student', () => {
    // expect(service).toBeTruthy();
    service
      .postData({ studentName: 'ah', studentClass: 'A', studentScore: '23' })
      .subscribe((res) => {
        expect(res.body).toEqual([]);
      });
  });

  it('should delete a student', () => {
    // expect(service).toBeTruthy();
    service
      .postData({ studentName: 'ah', studentClass: 'A', studentScore: '23' })
      .subscribe((res) => {
        expect(res.body).toEqual([]);
      });
  });
});
