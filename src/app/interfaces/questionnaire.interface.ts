import {QuestionnaireItemTypeEnum} from '../enum/questionnaire-item-type.enum';

export interface Questionnaire {
    resourceType: "QuestionnaireResponse";
    id: string;
    url: string;
    status: string;
    subjectType: string[];
    date: Date;
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

export interface BaseItem {
    linkId:string;
    text: string;
    definition?: string;
}
