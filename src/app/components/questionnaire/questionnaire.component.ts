import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Questionnaire, QuestionnaireItem} from "../../interfaces/questionnaire.interface";
import {QuestionnaireLoadingService} from "../../services/questionnaire-loading.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {QuestionnaireFormService} from "../../services/questionnaire-form.service";
import {QuestionnaireItemTypeEnum} from "../../enum/questionnaire-item-type.enum";

export interface ItemConfig {
  template: TemplateRef<any>;
  item: QuestionnaireItem;
}

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public form: FormGroup;
  public questionnaire: Questionnaire;
  public itemConfigs: ItemConfig[];

  @ViewChild('textAreaField', { read: TemplateRef }) textAreaFieldTemplate: TemplateRef<any>;
  @ViewChild('booleanField', { read: TemplateRef }) booleanFieldTemplate: TemplateRef<any>;
  @ViewChild('selectField', { read: TemplateRef }) selectFieldTemplate: TemplateRef<any>;
  @ViewChild('dateField', { read: TemplateRef }) dateFieldTemplate: TemplateRef<any>;
  @ViewChild('defaultField', { read: TemplateRef }) defaultFieldTemplate: TemplateRef<any>;

  constructor(
      private questionnaireLoadingService: QuestionnaireLoadingService,
      private questionnaireFormService: QuestionnaireFormService
  ) {
    this.subscription = new Subscription();
    this.itemConfigs = [];
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    const getQuestionnaireIndo$ = this.questionnaireLoadingService.getQuestionnaireInfo()
        .subscribe(info => {
          this.questionnaire = info;
          this.form = this.questionnaireFormService.buildForm(this.questionnaire);
          this.itemConfigs = this.questionnaire.item.map(this.itemToTemplateConfig.bind(this))
        });
    this.subscription.add(getQuestionnaireIndo$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private itemToTemplateConfig(item: QuestionnaireItem): ItemConfig {
    return {
      item: item,
      template: this.getFieldTemplate(item.type)
    };
  }

  private getFieldTemplate(itemType: QuestionnaireItemTypeEnum): TemplateRef<any> {
    const typeMapping: Partial<Record<QuestionnaireItemTypeEnum, TemplateRef<any>>> = {
      [QuestionnaireItemTypeEnum.text]: this.textAreaFieldTemplate,
      [QuestionnaireItemTypeEnum.string]: this.textAreaFieldTemplate,
      [QuestionnaireItemTypeEnum.boolean]: this.booleanFieldTemplate,
      [QuestionnaireItemTypeEnum.date]: this.dateFieldTemplate,
      [QuestionnaireItemTypeEnum.choice]: this.selectFieldTemplate
    }

    return typeMapping[itemType] || this.defaultFieldTemplate;
  }

  getFormControl(linkId: string): FormControl {
    return this.form.get(`item.${linkId}.answer`) as FormControl;
  }
}
