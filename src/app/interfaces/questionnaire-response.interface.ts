import { ValueCoding} from './questionnaire.interface';
import { BaseItem, BaseQuestionnaire } from './base-questionnaire.interface';

export interface QuestionnaireResponse extends BaseQuestionnaire {
    status?: "in-progress" | "completed" | "amended" | "entered-in-error" | "stopped";
    subjectType?: string[];
    authored: string | Date;
    item: ResponseItem[];
}

export interface ResponseItem  extends BaseItem {
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

