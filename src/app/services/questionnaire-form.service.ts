import { Injectable } from '@angular/core';
import {Questionnaire, QuestionnaireItem} from "../interfaces/questionnaire.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
      item: this.fb.group({})
    });

    questionnaireDef.item.forEach(field => {
      (form.get('item') as FormGroup).addControl(field.linkId, this.questionnaireItemToFormControl(field));
    });

    return form;
  }

  private questionnaireItemToFormControl(item: QuestionnaireItem): FormGroup {
    return this.fb.group({
      linkId: [item.linkId],
      text: [item.text],
      definition: [item.definition],
      answer: [null, Validators.required]
    });
  }
}
