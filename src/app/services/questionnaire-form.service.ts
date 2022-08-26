import {Injectable} from '@angular/core';
import {Questionnaire, QuestionnaireItem} from '../interfaces/questionnaire.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionnaireResponse, ResponseItem} from '../interfaces/questionnaire-response.interface';
import {QuestionnaireItemTypeEnum} from '../enum/questionnaire-item-type.enum';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireFormService {

  constructor(private fb: FormBuilder) { }

  public buildForm(questionnaireDef: Questionnaire): FormGroup {
    const form: FormGroup = this.fb.group({
      id: [questionnaireDef.id],
      url: [questionnaireDef.url],
      status: [questionnaireDef.status],
      subjectType: [questionnaireDef.subjectType],
      item: this.fb.group({})
    });

    questionnaireDef.item.forEach(field => {
      (form.get('item') as FormGroup).addControl(field.linkId, this.questionnaireItemToFormControl());
    });

    return form;
  }

  private questionnaireItemToFormControl(): FormGroup {
    return this.fb.group({
      answer: [null, Validators.required]
    });
  }

  public buildQuestionnaireResponse(questionnaireDef: Questionnaire, form: FormGroup): QuestionnaireResponse {
    return {
      ...form.value,
      resourceType: 'QuestionnaireResponse',
      date: new Date(),
      item: this.buildItemResponse(questionnaireDef.item, form)
    };
  }

  private buildItemResponse(item: QuestionnaireItem[], form: FormGroup): ResponseItem[] {
    const formValue = form.value;
    return item.map(itemField => {
      const answerPropertyName = this.getQuestionnaireAnswer(itemField?.type);
      return {
        linkId: itemField?.linkId,
        definition: itemField.definition,
        text: itemField.text,
        answer: [{[answerPropertyName]: itemField?.type !== QuestionnaireItemTypeEnum.choice
           ? formValue.item[itemField.linkId].answer
           : itemField.option?.find(op => op.valueCoding.code === formValue.item[itemField.linkId].answer)?.valueCoding}]
      }
    });
  };

  private getQuestionnaireAnswer(itemType: QuestionnaireItemTypeEnum): string {
    const typeMapping: Partial<Record<QuestionnaireItemTypeEnum, string>> = {
      [QuestionnaireItemTypeEnum.text]: 'valueString',
      [QuestionnaireItemTypeEnum.string]: 'valueString',
      [QuestionnaireItemTypeEnum.boolean]: 'valueBoolean',
      [QuestionnaireItemTypeEnum.date]: 'valueDate',
      [QuestionnaireItemTypeEnum.choice]: 'valueCoding'
    }

    return typeMapping[itemType] || 'valueReference';
  }
}
