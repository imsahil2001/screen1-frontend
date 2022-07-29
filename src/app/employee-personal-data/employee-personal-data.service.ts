import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MaritalStatus } from './MaritalStatus';
import { Observable } from 'rxjs';
import { Gender } from './Gender';
import { State } from './State';
import { City } from './Citiy';


@Injectable({
  providedIn: 'root'
})
export class EmployeePersonalDataService {
  baseUrl = 'http://localhost:8081/batch1_controller/saveEmployeeDetails';
  statesUrl = 'http://localhost:8081/batch1_controller/StateList';
  genderUrl = 'http://localhost:8081/batch1_controller/GenderList';
  maritalStatusUrl = 'http://localhost:8081/batch1_controller/MaritalStatusList';
  getEmployeeeDataUrl = 'http://localhost:8080/batch1_controller/getEmployeeDetails';
  citiesUrl = 'http://localhost:8081/batch1_controller/commonutils/getCities?=';

  // baseUrl = 'http://localhost:8080/hrmsController/employeeDetails/saveEmployeeDetails';
  // statesUrl = 'http://localhost:8080/hrmsController/StateList';
  // genderUrl = 'http://localhost:8080/hrmsController/GenderList';
  // maritalStatusUrl = 'http://localhost:8080/hrmsController/MaritalStatusList';
  // getUrl = 'http://localhost:8080/hrmsController/MaritalStatusList';


  constructor(private http: HttpClient) { }

  savePersonalDetails(data: any) {

    // console.log(JSON.stringify(data));
    const requestOptions = { headers: new HttpHeaders({ 'content-type': "application/json" }) };

    return this.http
      .post<any>(this.baseUrl, JSON.stringify(data), requestOptions)
      .subscribe((response: any) => {
        console.log(response.emp_id);
        console.log(response);
      });
  }


  getStatesFromDb() {
    return this.http.get<State[]>(this.statesUrl);
  }

  getEmployeeDataFromDb() {
    return this.http.get<State[]>(this.getEmployeeeDataUrl)
  }

  getCitiesFromState(stateId: Number): Observable<City[]> {
    return this.http.get<City[]>(`${this.citiesUrl}?stateId=${stateId}`);
  }

  public getMaritalStatusFromDb(): Observable<MaritalStatus[]> {
    return this.http.get<MaritalStatus[]>(this.maritalStatusUrl);
  }

  getGenderFromDb() {
    return this.http.get<Gender[]>(this.genderUrl);
  }
}
