import { TestBed } from '@angular/core/testing';

import { QuestionnaireFormService } from './questionnaire-form.service';

describe('QuestionnaireFormService', () => {
  let service: QuestionnaireFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionnaireFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
