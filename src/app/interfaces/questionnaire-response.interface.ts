import {BaseItem, ValueCoding} from './questionnaire.interface';

export interface QuestionnaireResponse {
    resourceType: "QuestionnaireResponse";
    id: string;
    url: string;
    status: string;
    subjectType: string[];
    date: Date;
    item: ResponseItem[];
}

export interface ResponseItem  extends BaseItem{
    answer: QuestionnaireAnswer[];
}

export interface QuestionnaireAnswer {
    valueBoolean?: boolean;
    valueDecimal?: number;
    valueInteger?: number;
    valueDate?: string;
    valueDateTime?: string;
    valueTime?: string;
    valueString?: string;
    valueUri?: string;
    valueAttachment?: any;
    valueCoding?: ValueCoding;
    valueQuantity?: any;
    valueReference?: any;
}

