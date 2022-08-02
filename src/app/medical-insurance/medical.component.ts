import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from './api-service.service';



@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.css']
})
export class MedicalComponent implements OnInit {

  medicalForm:any;
  requestPayLoad: any = {};
  
  constructor(
    private http: HttpClient,
    private ApiService: ApiServiceService,
    private router: Router
  ) {}

    // base url to which request has to be send
    submitted: any = false;
    emp_id: any = 0;

  ngOnInit(){

    this.medicalForm=new FormGroup({
      firstName: new FormControl('',[Validators.pattern("[A-Za-z]{1,32}"),Validators.required]),
      middlename: new FormControl(''),
      last: new FormControl('',[Validators.pattern("[A-Za-z]{1,32}"),Validators.required]),
      Dob: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required, Validators.pattern("[0-9]{0,2}")]),
      gender: new FormControl('',[Validators.required]),
      relationship: new FormControl('',[Validators.pattern("[A-Za-z]{1,32}"),Validators.required]),
      premium: new FormControl('',[Validators.required, Validators.pattern("[0-9]{0,2}")]),
      date: new FormControl('',[Validators.required]),
      idnumber: new FormControl('',[Validators.required]),
      idtype: new FormControl('',[Validators.required]),
      isHaveMedicalHistory:new FormControl(','),
      medicalHistoryDetails:new FormControl(','),
      insuranceWaiverType:new FormControl(','),


    });

  }
public savemedical()
{
  console.log(this.medicalForm.value);
  
this.requestPayLoad={
empId:1,
// empId:sessionStorage.getItem("emp_id"),
isHaveMedicalHistory:this.medicalForm.get('isHaveMedicalHistory')?.value,
medicalHistoryDetails:this.medicalForm.get('medicalHistoryDetails')?.value,
insuranceWaiverType:this.medicalForm.get('insuranceWaiverType')?.value,
member_details:[
  {
  memberName:this.medicalForm.get('firstName')?.value,
  memberDob:this.medicalForm.get('Dob')?.value,
  memberAge:this.medicalForm.get('age')?.value,
  memberRelation:this.medicalForm.get('relationship')?.value,
  memberIdType:this.medicalForm.get('idtype')?.value,
  memberIdNumber:this.medicalForm.get('idnumber')?.value,
  }
]
}
console.log(this.requestPayLoad);
this.ApiService.savePersonalDetails(
  this.requestPayLoad
);

window.alert("Medical Insurance details have been saved")
}
// onSubmit() {
//   if (sessionStorage.getItem('emp_id') == null) {


//     this.makePayLoad();
//     console.log(this.requestPayLoad);
//     this.submitted = true;

//     // if form is invalid it wont get submit
//     if (this.medicalForm.invalid) {
//       return;
//     }
//     console.log('submitted');

//     // sending payload to backend
//     this.empId = this.userservice.savePersonalDetails(
//       this.requestPayLoad
//     );

//     // setting session storage 
//     sessionStorage.setItem('emp_id', this.emp_id);
//     sessionStorage.setItem('stage', 'PERSONAL_INFO');
//   }
// }

// onSubmitAndContinue() {
//   if (sessionStorage.getItem('emp_id') == null) {
//     this.onSubmit();
//   }
// }

}
