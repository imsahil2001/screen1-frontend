// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import { Medical } from './medical';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiServiceService {
//   private apiServerUrl = environment.apiBaseUrl;
//   constructor(private http: HttpClient) { }
//   public addReferences(references: Medical): Observable<Medical> {
//     let obj ={
//       "empId":"1",
//         "references": [
//             {
                
//                 "isHaveMedicalHistory": references.isHaveMedicalHistory,
//                 "medicalHistoryDetails": references.medicalHistoryDetails,
//                 "insuranceWaiverType": references.insuranceWaiverType,
               
//             }
//         ]
//     }
//     return this.http.post<Medical>(
//       `${this.apiServerUrl}/saveEmpInsuranceDetails`,
//       obj
//     );
//   }



  
  
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  baseUrl = 'http://localhost:8080/hrmsController/empinsurance/saveEmpInsuranceDetails';
  constructor(private http: HttpClient) { }

  savePersonalDetails(data: any) {

    const requestOptions = { headers: new HttpHeaders({ 'content-type': "application/json" }) };
    const str=JSON.stringify(data);

    return this.http
      .post<any>(this.baseUrl, str, requestOptions)
      .subscribe((response: any) => {
        console.log(response.emp_id);
      });
  }
}
