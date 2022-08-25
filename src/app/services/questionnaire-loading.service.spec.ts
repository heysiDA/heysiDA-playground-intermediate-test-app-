import { TestBed } from '@angular/core/testing';

import { QuestionnaireLoadingService } from './questionnaire-loading.service';

describe('QuestionnaireLoadingService', () => {
  let service: QuestionnaireLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionnaireLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
