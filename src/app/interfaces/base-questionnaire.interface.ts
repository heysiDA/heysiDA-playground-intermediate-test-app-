export interface BaseQuestionnaire {
    resourceType: "Questionnaire" | "QuestionnaireResponse";
    id: string;
    language?: string;
    text?: string;
}

export interface BaseItem {
    linkId:string;
    text: string;
    definition?: string;
}
