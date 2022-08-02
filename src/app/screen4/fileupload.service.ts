import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Request } from './request.component';
import { Response } from './response.component';

@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  savebaseUrl = 'http://localhost:8080/hrmsController/employee/pf/saveUploadedPFDoc';
  getpdfbaseurl='http://localhost:8080/hrmsController/employee/pf/downloadUploadedPFDoc';
  httpClient: any;

  constructor(private http: HttpClient) { }

  savePdfDetails(data: any) {

    const requestOptions = { headers: new HttpHeaders({ 'content-type': "application/json" }) };
    const str=JSON.stringify(data);
    return this.http
      .post<any>(this.savebaseUrl, str, requestOptions)
      .subscribe((response: any) => {
        console.log(response.emp_id);
      });
    }

  getPdfDetails(emp_id: String): Observable<Request> {

    let obj = {
      "emp_id": emp_id,
    }
        return this.http.post<Request>(`${this.getpdfbaseurl}`, obj);
  }

  
  savedownloadpdf(data : Request) {

//     let headers = new Header,s();
// headers.append('Content-Type', 'application/json');
// headers.append('projectid', this.id);

 const requestOptions = { headers: new HttpHeaders({ 'content-type': "application/json" }) };
 console.log(data.emp_id);
     const str=(data.emp_id);
    console.log(str);
    let params = new HttpParams().set("emp_id", str);
      // this.http
      // .post<any>(this.getpdfbaseurl, str, requestOptions)
      // .subscribe((response: any) => {
      //   console.log(response.emp_id);
      // });

    return this.http
      .get<Response>(this.getpdfbaseurl, {headers: new HttpHeaders({ 'content-type': "application/json" }), params : params})
      
      
    }

}