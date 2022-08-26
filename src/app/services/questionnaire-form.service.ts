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
      date: [questionnaireDef.date],
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
      item: this.buildItemResponse(questionnaireDef.item, form)
    };
  }

  private buildItemResponse(item: QuestionnaireItem[], form: FormGroup): ResponseItem[] {
    const formValue = form.value;
    const response: ResponseItem[] = [];
    Object.keys(formValue.item).forEach(linkId => {
      const itemField = item
          .find((field: QuestionnaireItem) => field.linkId === linkId) as QuestionnaireItem;
      const answerPropertyName = this.getQuestionnaireAnswer(itemField?.type);
      response.push({
        linkId: itemField.linkId,
        definition: itemField.definition,
        text: itemField.text,
        answer: [{[answerPropertyName]: itemField?.type !== QuestionnaireItemTypeEnum.choice
              ? formValue.item[linkId].answer
              :
              itemField.option?.find(op => op.valueCoding.code === formValue.item[linkId].answer)?.valueCoding}]
      } as ResponseItem);
    })
    return response;
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
