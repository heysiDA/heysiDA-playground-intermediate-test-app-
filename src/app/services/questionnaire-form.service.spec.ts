import {TestBed} from '@angular/core/testing';
import {QuestionnaireFormService} from './questionnaire-form.service';
import {Questionnaire} from "../interfaces/questionnaire.interface";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {QuestionnaireItemTypeEnum} from "../enum/questionnaire-item-type.enum";

export const mockQuestionnaire: Questionnaire = {
  resourceType: "Questionnaire",
  id: "f201",
  url: "http://hl7.org/fhir/Questionnaire/f201",
  status: "active",
  subjectType: [
    "Patient"
  ],
  date: "2021-08-12",
  item: [
    {
      linkId: "1",
      text: "Do you have allergies?",
      type: QuestionnaireItemTypeEnum.boolean
    },
    {
      linkId: "2",
      text: "What is your gender?",
      type: QuestionnaireItemTypeEnum.choice,
      option: [
        {
          valueCoding: {
            system: "http://hl7.fhir/org",
            code: "male",
            display: "Male"
          }
        },
        {
          valueCoding: {
            system: "http://hl7.fhir/org",
            code: "female",
            display: "Female"
          }
        }
      ]
    },
    {
      linkId: "3",
      text: "What is your date of birth?",
      type: QuestionnaireItemTypeEnum.date
    },
    {
      linkId: "4",
      text: "What is your country of birth?",
      type: QuestionnaireItemTypeEnum.string
    },
  ]
};

describe('QuestionnaireFormService', () => {
  let service: QuestionnaireFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule]
    });
    service = TestBed.inject(QuestionnaireFormService);
  });

  describe('buildForm', () => {
    it('should create the form correctly with the default data', () => {
      const form: FormGroup = service.buildForm(mockQuestionnaire);
      expect(form.get('id')?.value).toBe(mockQuestionnaire.id);
    });

    it('should generate the controls for each item', () => {
      const form: FormGroup = service.buildForm(mockQuestionnaire);
      mockQuestionnaire.item.forEach(item => {
        const itemControl: FormGroup = form.get('item')?.get(item.linkId) as FormGroup;
        expect(itemControl).toBeTruthy();

        const answerControl: FormControl = itemControl.get('answer') as FormControl;
        const errors = answerControl.errors || {};
        expect(answerControl).toBeTruthy();
        expect(errors['required']).toBeTruthy();
      })
    });
  });
});
