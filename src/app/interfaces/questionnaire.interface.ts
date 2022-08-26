import { QuestionnaireItemTypeEnum } from '../enum/questionnaire-item-type.enum';
import { BaseItem, BaseQuestionnaire } from './base-questionnaire.interface';

export interface Questionnaire extends BaseQuestionnaire {
    url: string;
    status: "draft" | "active" | "retired" | "unknown";
    subjectType: string[];
    date: string | Date;
    item: QuestionnaireItem[];
}

export interface QuestionnaireItem extends BaseItem {
    type: QuestionnaireItemTypeEnum;
    option?: Option[];
}

export interface Option {
    valueCoding: ValueCoding;
}

export interface ValueCoding {
    system: string;
    code: string;
    display: string;
}
