import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reference } from './reference';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getReferences(id: any): Observable<Reference[]> {
    let obj = {
      "emp_id": id,

    }
    return this.http.post<Reference[]>(`${this.apiServerUrl}/getReferences`, obj);
  }

  public addReferences(references: Reference): Observable<Reference> {
    let obj = {
      // "empId": "1",
      "empId": sessionStorage.getItem("emp_id"),
      "references": [
        {
          "name": references.name,
          "designation": references.designation,
          "company": references.company,
          "emailid": references.email,
          "phno": references.phno
        },
        {
          "name": references.name2,
          "designation": references.designation2,
          "company": references.company2,
          "emailid": references.email2,
          "phno": references.phno2
        }
      ]
    }
    return this.http.post<Reference>(
      `${this.apiServerUrl}/saveReferenceDetails`,
      obj
    );
  }
}
