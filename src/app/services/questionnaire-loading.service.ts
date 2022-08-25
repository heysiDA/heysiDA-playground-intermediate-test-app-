import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Questionnaire} from "../interfaces/questionnaire.interface";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireLoadingService {

  constructor(private http: HttpClient) { }

  getQuestionnaireInfo(): Observable<Questionnaire>{
    return this.http.get<Questionnaire>('assets/questionnaire.json');
  }
}
