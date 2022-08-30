import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionnaireComponent } from './questionnaire.component';
import {mockQuestionnaire} from "../../services/questionnaire-form.service.spec";
import {QuestionnaireLoadingService} from "../../services/questionnaire-loading.service";
import SpyObj = jasmine.SpyObj;
import {of} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('QuestionnaireComponent', () => {
  let component: QuestionnaireComponent;
  let fixture: ComponentFixture<QuestionnaireComponent>;
  let mockQuestionnaireService: SpyObj<QuestionnaireLoadingService>;

  beforeEach(async () => {
    mockQuestionnaireService = jasmine.createSpyObj('QuestionnaireLoadingService', ['getQuestionnaireInfo'])
    await TestBed.configureTestingModule({
      imports: [
          ReactiveFormsModule,
          FormsModule
      ],
      declarations: [ QuestionnaireComponent ],
      providers: [{
        provide: QuestionnaireLoadingService,
        useValue: mockQuestionnaireService
      }]
    })
    .compileComponents();
    mockQuestionnaireService.getQuestionnaireInfo.and.returnValue(of(mockQuestionnaire));
    fixture = TestBed.createComponent(QuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the correct template for boolean field', () => {
    const field1 = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[0].linkId}`);
    expect(field1).toBeTruthy();

    const fieldBoolean = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[0].linkId}`)
        ?.querySelector('input[type="radio"]');
    expect(fieldBoolean).toBeTruthy();
  });

  it('should render the correct template for select field', () => {
    const field2 = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[1].linkId}`);
    expect(field2).toBeTruthy();

    const fieldSelect = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[1].linkId}`)
        ?.querySelector('select');
    expect(fieldSelect).toBeTruthy();
  });

  it('should render the correct template for date field', () => {
    const field3 = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[2].linkId}`);
    expect(field3).toBeTruthy();

    const fieldDate = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[2].linkId}`)
        ?.querySelector('input[type="date"]');
    expect(fieldDate).toBeTruthy();
  });

  it('should render the correct template for textarea field', () => {
    const field4 = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[3].linkId}`);
    expect(field4).toBeTruthy();

    const fieldTextArea = fixture.debugElement.nativeElement.querySelector(`#field_${mockQuestionnaire.item[3].linkId}`)
        ?.querySelector('textarea');
    expect(fieldTextArea).toBeTruthy();
  });
});
