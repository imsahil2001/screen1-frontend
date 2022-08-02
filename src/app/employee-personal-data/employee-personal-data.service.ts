import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MaritalStatus } from './MaritalStatus';
import { Observable } from 'rxjs';
import { Gender } from './Gender';
import { State } from './State';
import { City } from './Citiy';
import { Users } from './users';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeePersonalDataService {
  baseUrl = 'http://localhost:8080/hrmsController/employeeDetails/saveEmployeeDetails';
  // baseUrl = 'http://localhost:8081/batch1_controller/saveEmployeeDetails';
  // statesUrl = 'http://localhost:8081/batch1_controller/StateList';
  statesUrl = 'http://localhost:8080/hrmsController/StateList';
  citiesUrl = 'http://localhost:8080/hrmsController/getCityListbyState?state=';
  // genderUrl = 'http://localhost:8081/batch1_controller/GenderList';
  genderUrl = 'http://localhost:8080/hrmsController/GenderList';
  // maritalStatusUrl = 'http://localhost:8081/batch1_controller/MaritalStatusList';
  maritalStatusUrl = 'http://localhost:8080/hrmsController/MaritalStatusList';
  PinCodefetchURL = 'http://localhost:8080/hrmsController/GetCityAndStateByPincode?pincode='


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

  getCityState(pincode) {

    let url = this.PinCodefetchURL + pincode;
    return this.http.get<Users>(url).
      pipe(
        map((data: Users) => {
          return data;
        })
      )
  }

  getCityListByState(state: string) {
    return this.http.get<City[]>(`${this.citiesUrl}${state}`);
  }

  dummy: any = '';
  // getStatesFromDb(): Observable<State[]> {
  getStatesFromDb() {
    return this.http.get<State[]>(this.statesUrl);
  }

  // getCitiesFromState(stateId: Number): Observable<City[]> {
  //   return this.http.get<City[]>(`${this.citiesUrl}?stateId=${stateId}`);
  // }

  public getMaritalStatusFromDb(): Observable<MaritalStatus[]> {
    return this.http.get<MaritalStatus[]>(this.maritalStatusUrl);
  }

  getGenderFromDb() {
    return this.http.get<Gender[]>(this.genderUrl);
  }
}
