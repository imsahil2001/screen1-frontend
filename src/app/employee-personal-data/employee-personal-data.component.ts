
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeePersonalDataService } from './employee-personal-data.service'
import { MaritalStatus } from './MaritalStatus';

import { Observable, VirtualTimeScheduler } from 'rxjs';
import { Gender } from './Gender';
import { State } from './State';
import { City } from './Citiy';
import { Users } from './users';
import { LocationStrategy } from '@angular/common';
import { createInjectableType } from '@angular/compiler';
import { cityState } from './cityState';
//import { state } from '@angular/animations';



@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.css']
})
export class EmployeePersonalDataComponent implements OnInit {

  title = 'official_project';
  users: Users;
  change() {
    //this.City = this.City;
  }

  constructor(private http: HttpClient, private userservice: EmployeePersonalDataService, private route: Router) { }

  // base url to which request has to be send
  submitted: any = false;
  emp_id: any = 0;

  // --------------------------------------------
  //select option list

  currentStateId: number = 0;
  statesList: State[] = [];

  citiesList: City[] = [
    {
      "id": 2,
      "city": "Patiala",
      "state_id": 2
    },
    {
      "id": 3,
      "city": "Bathinda",
      "state_id": 2
    }
  ];

  genderList: Gender[] = [];

  cityState: cityState[];
  // cityState.state="random";

  selectedState: any = '';


  currentstate: any = "";
  emergencystate: any = "";
  permanentstate: any = "";
  currentcity: any = "";
  emergencycity: any = "";
  permanentcity: any = "";

  maritalStatusList: MaritalStatus[] = [];

  public pinCode = '';

  public EState = ' ';
  public ECity = ' ';
  // --------------------------------------------
  // form group
  myReactiveForm: any = {};
  requestPayLoad: any = {};


  getData(pin: any) {
    //let val = this.myReactiveForm.get('unknown').value;
    //alert(data);
    this.userservice.getCityState(pin).subscribe((data: any) => {
      //  this.myReactiveForm.get('city').value = data.city;
      //console.log(data);
      // console.log(data.city);
      // this.myReactiveForm.controls.currentstate.setValue(data.state);
      // alert(user1.City);

      // this.cityState = data;
      // console.log(this.cityState.push(data))
      // this.City = data.city;
      // window.location.reload();
      // alert(this.City);
      //alert(data.state);
      // this.users.PState = JSON.stringify(data.state);
      // this.users.PCity = JSON.stringify(data.city);
      // var Scity = this.users.PCity;
      // alert(Scity);
      this.EState = data.state;
      this.ECity = data.city;
      // this.users.push(data);
      console.log(this.EState);
      console.log(this.ECity);
    })

  }


  ngOnInit() {





    // if (sessionStorage.getItem('emp_id') != null) {
    this.userservice.getMaritalStatusFromDb().subscribe(data => {
      this.maritalStatusList = data;
      console.log(`marital status gottten`);
      console.log(this.maritalStatusList)
    })

    //this.getUserList();

    this.userservice.getGenderFromDb().subscribe(data => {
      this.genderList = data;
      console.log(`gender list gotten`);
    })

    this.userservice.getStatesFromDb().subscribe(data => {
      this.statesList = data;
      console.log(`state list gotten`);
    })


    this.myReactiveForm = new FormGroup({

      FirstName: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      MaritalStatus: new FormControl(null, [Validators.required]),
      LastName: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      MiddleName: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
      ]),
      PhoneNumber: new FormControl(null, [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      CAddress: new FormControl(null, [Validators.required]),
      CAddress1: new FormControl(null, [Validators.required]),
      PAddress: new FormControl(null, [Validators.required]),
      PAddress1: new FormControl(null, [Validators.required]),
      CPinCode: new FormControl(null, [
        Validators.pattern('^[1-9][0-9]{5}$'),
        Validators.required,
      ]),
      PinCode: new FormControl(null, [
        Validators.pattern('^[1-9][0-9]{5}$'),
        Validators.required,
      ]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      DOB: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(2|1){1}[0-9]{3}.[0-9]{2}.[0-9]{2}.*$'),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      city: new FormControl(null, {}),
      //state: new FormControl(null, {}),

      country: new FormControl({ value: null, disabled: true }),
      passport: new FormControl({ value: null, disabled: true }),
      issueddate: new FormControl({ value: null, disabled: true }),
      expirationdate: new FormControl({ value: null, disabled: true }),
      issuedby: new FormControl({ value: null, disabled: true }),

      pan: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),
      ]),
      panname: new FormControl(null, [
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$'),
      ]),
      aadhar: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$'),
      ]),
      aadharname: new FormControl(null, [
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$'),
      ]),
      companyname: new FormControl(null, [
        Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$'),
      ]),
      fromyr: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{4}'),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      toyr: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]{4}'),
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      designation: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z]{1,}'),
      ]),
      location: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z]{1,}'),
      ]),
      qualification: new FormControl(null, [
        Validators.pattern('[a-zA-Z.{}";_^%$#!~@,-]{1,32}'),
        Validators.required,
      ]),
      major: new FormControl(null, [
        Validators.pattern('[a-zA-Z.{}";_^%$#!~@,-]{1,32}'),
        Validators.required,
      ]),
      Membership: new FormControl(null, [
        Validators.pattern('[A-Za-z_ ]{1,32}'),
        Validators.required,
      ]),
      OrgMembership: new FormControl(null, [
        Validators.pattern('[A-Za-z_ ]{1,32}'),
        Validators.required,
      ]),
      membershipdate: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(2|1){1}[0-9]{3}.[0-9]{2}.[0-9]{2}.*$'),
      ]),
      honour: new FormControl(null, [
        Validators.pattern('[A-Za-z_ ]{1,32}'),
        Validators.required,
      ]),
      honouraward: new FormControl(null, [
        Validators.pattern('[A-Za-z_ ]{1,32}'),
        Validators.required,
      ]),
      grantor: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      year: new FormControl(null, [
        Validators.pattern('[0-9]{1,4}'),
        Validators.required,
      ]),
      currentstate: new FormControl(null, [
        // Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      currentcity: new FormControl(null, [
        // Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      permanentstate: new FormControl(null, [
        // Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      permanentcity: new FormControl(null, [
        // Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      institute: new FormControl(null, [Validators.required]),
      yearReceived: new FormControl(null, [
        Validators.pattern('[0-9]{1,4}'),
        Validators.required,
      ]),
      emergencyName: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      relation: new FormControl(null, [
        Validators.pattern('[A-Za-z_ ]{1,32}'),
        Validators.required,
      ]), //
      emergencyphone1: new FormControl(null, [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      emergencyphone2: new FormControl(null, [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      emergencystate: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      qualificationstate: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      emergencycity: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      pin: new FormControl(null, [
        Validators.pattern('[0-9]{6}'),
        Validators.required,
      ]),
      gender: new FormControl(null, Validators.required),

      isInjured: new FormControl(false),
      isIll: new FormControl(false),
      isDisabled: new FormControl(false),
      isMedicalAlert: new FormControl(false),
      BloodGrp: new FormControl(null, [
        Validators.pattern('^(A|B|AB|O)[+-]$'),
        Validators.required,
      ]),

      injuryDetails: new FormControl(null, [
        Validators.pattern('^(?!d+$)(?:[a-zA-Z][a-zA-Z @&$,]*)?$'),
        Validators.required,
      ]),
      Healthinfo: new FormControl(null, [
        Validators.pattern('^(?!d+$)(?:[a-zA-Z][a-zA-Z @&$,]*)?$'),
        Validators.required,
      ]),
      illnessDetails: new FormControl(null, [
        Validators.pattern('^(?!d+$)(?:[a-zA-Z][a-zA-Z @&$,]*)?$'),
        Validators.required,
      ]),
      disabilityDetails: new FormControl(null, [
        Validators.pattern('^(?!d+$)(?:[a-zA-Z][a-zA-Z @&$,]*)?$'),
        Validators.required,
      ]),
      declarationCheckboxOne: new FormControl(false, [Validators.required]),
      declarationCheckboxSecond: new FormControl(false, [Validators.required]),
      beingQualifiedCheckbox: new FormControl(false, [Validators.required]),
      otherConsentCheckbox: new FormControl(false, [Validators.required]),
      pincode: new FormControl(null, [Validators.required]),

      unknown: new FormControl(null, [Validators.required])
    });

    // this.filldata();
    // } else {

    // }



  }



  // --------------------------------------------
  // Request Payload

  // getAdd() {

  //   alert(this.myReactiveForm.get('pincode').value);

  //   let url = "http://localhost:8080/hrmsController/GetCityAndStateByPincode?pincode=" + this.myReactiveForm.get('pincode').value;
  //   alert(url);
  //   this.http.get<any>(url)

  //     .subscribe(function (val) {

  //       // const [address] = val as any;



  //       // this.finalAddress = address;

  //       // console.log(this.finalAddress); // it returns multiple postOffices

  //       // const postOffices = this.finalAddress.PostOffice;

  //       // if (postOffices.length > 0) {

  //       //   this.state = postOffices[0].State;

  //       //   this.district = postOffices[0].District;

  //       //   this.city = postOffices[0].Name;

  //       // }

  //       //MapUtils.deserialize(object, val);

  //       alert(JSON.stringify(val.city));
  //       alert(JSON.stringify(val.state));
  //       var str = JSON.stringify(val.state);

  //       this.State = JSON.stringify(val.state);
  //       console.log(str);
  //       //alert(str);
  //       this.City = JSON.stringify(val.city);

  //     });

  // }
  // --------------------------------------------
  // disabled fields


  disabledFields() {
    this.myReactiveForm.controls.country.disable();
  }


  // --------------------------------------------
  // select options change functions
  changeMaritalStatus(e: any) {
    // console.log(`marital`);
    // this.myReactiveForm.value.MaritalStatus?.setValue(e.target.value);
  }

  changeGender(e: any) {
    this.myReactiveForm.value.gender?.setValue(e.target.value);
  }

  currentStateChange(e: any) {

    // console.log(this.statesList)

    let currentState = "";
    if (e.target.value.length == 4) {
      this.currentStateId = Number(e.target.value[3]);
    } else {
      this.currentStateId = Number(e.target.value[3] + e.target.value[4]);
    }

    this.statesList.forEach((i) => {
      if (i.id == this.currentStateId) {
        // console.log(i.state)
        this.myReactiveForm.value.currentstate?.setValue(i.state);
        this.myReactiveForm.patchValue({ currentstate: `${i.state}` });
      }
    })


    // console.log(this.currentStateId);
    // console.log(this.currentstate.name);
    // console.log(this.myReactiveForm.value);

    // this.userservice.getCitiesFromState(this.currentStateId).subscribe(data => {
    //   this.citiesList = data;
    //   console.log(`state list gotten`);
    // })

    // this.myReactiveForm.value.currentstate?.setValue(e.target.value);

  }



  // --------------------------------------------
  // enable or disable the passport fields on the basis of the checkbox
  passportClick(e: any) {
    console.log(`passport checkbox clicked`);

    if (e.target.checked) {
      //enabling inputs
      this.myReactiveForm.controls.country.enable();
      this.myReactiveForm.controls.passport.enable();
      this.myReactiveForm.controls.issueddate.enable();
      this.myReactiveForm.controls.expirationdate.enable();
      this.myReactiveForm.controls.issuedby.enable();

      // applying validations to inputs
      this.myReactiveForm
        .get('country')
        .setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z]{1,}$'),
        ]);
      this.myReactiveForm
        .get('passport')
        .setValidators([
          Validators.required,
          Validators.pattern('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$'),
        ]);
      this.myReactiveForm
        .get('issueddate')
        .setValidators([Validators.required]);
      this.myReactiveForm
        .get('expirationdate')
        .setValidators([Validators.required]);
      this.myReactiveForm
        .get('issuedby')
        .setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z]{1,}$'),
        ]);

      // updating the inputs after alteration
      this.myReactiveForm.get('country').updateValueAndValidity();
      this.myReactiveForm.get('passport').updateValueAndValidity();
      this.myReactiveForm.get('issueddate').updateValueAndValidity();
      this.myReactiveForm.get('expirationdate').updateValueAndValidity();
      this.myReactiveForm.get('issuedby').updateValueAndValidity();
    } else {
      //country
      this.myReactiveForm.get('country').clearValidators();
      this.myReactiveForm.controls.country?.setValue(null);
      this.myReactiveForm.controls.country.disable();
      this.myReactiveForm.get('country').updateValueAndValidity();

      //passport
      this.myReactiveForm.get('passport').clearValidators();
      this.myReactiveForm.controls.passport?.setValue(null);
      this.myReactiveForm.controls.passport.disable();
      this.myReactiveForm.get('passport').updateValueAndValidity();

      //issued date
      this.myReactiveForm.get('issueddate').clearValidators();
      this.myReactiveForm.controls.issueddate?.setValue(null);
      this.myReactiveForm.controls.issueddate.disable();
      this.myReactiveForm.get('issueddate').updateValueAndValidity();

      //expiration date
      this.myReactiveForm.get('expirationdate').clearValidators();
      this.myReactiveForm.controls.expirationdate?.setValue(null);
      this.myReactiveForm.controls.expirationdate.disable();
      this.myReactiveForm.get('expirationdate').updateValueAndValidity();

      //issued by
      this.myReactiveForm.get('issuedby').clearValidators();
      this.myReactiveForm.controls.issuedby?.setValue(null);
      this.myReactiveForm.controls.issuedby.disable();
      this.myReactiveForm.get('issuedby').updateValueAndValidity();
    }
  }

  // --------------------------------------------
  // checkboxes functions
  isInjuredFcn(e: any) {
    if (e.target.value = "true")
      e.target.value = true;
    this.myReactiveForm.controls.isInjured?.setValue(e.target.value);
  }

  isIllFcn(e: any) {

    if (e.target.value = "true")
      e.target.value = true;

    this.myReactiveForm.controls.isIll?.setValue(e.target.value);
  }

  isDisabledFcn(e: any) {
    if (e.target.value = "true")
      e.target.value = true;
    this.myReactiveForm.controls.isDisabled?.setValue(e.target.value);
  }

  isMedicalAlertFcn(e: any) {
    if (e.target.value = "true")
      e.target.value = true;
    this.myReactiveForm.controls.isMedicalAlert?.setValue(e.target.value);
  }

  // --------------------------------------------
  // request to service layer
  onSubmit() {
    // if (sessionStorage.getItem('emp_id') == null) {


    this.makePayLoad();
    // console.log(JSON.stringify(this.requestPayLoad));
    this.submitted = true;

    // if form is invalid it wont get submit
    if (this.myReactiveForm.invalid) {
      return;
    }
    console.log('submitted');

    // sending payload to backend
    this.emp_id = this.userservice.savePersonalDetails(
      this.requestPayLoad
    );

    // setting session storage 
    sessionStorage.setItem('emp_id', this.requestPayLoad.empId);
    sessionStorage.setItem('stage', 'PERSONAL_INFO');

    window.alert("data has been saved")
    // }
  }

  onSubmitAndContinue() {
    if (sessionStorage.getItem('emp_id') == null) {
      this.onSubmit();
      setTimeout(() => {
        this.route.navigate(['/references']);
      }, 2500);
    } else {
      this.route.navigate(['/references']);
    }
  }

  getCitiesfromState() {
    console.log(`this is the state value ${this.myReactiveForm.get('currentstate').value}`);
  }

  // getting states from db call




  getMaritalStatusFromDb() {
    console.log(this.maritalStatusList)
  }

  getGenderFromDb() {
    // this.genderList.push(this.userservice.getGenderFromDb());
  }






  getUserList() {


    //this.makePayLoad();

    // let pincode = Number(this.myReactiveForm.get('unknown').value);


    // alert(pincode);

    // this.userservice
    //   .getUsers(pincode)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     this.users = data;
    //   });
  }


  //request payload is made from formGroup 
  makePayLoad() {
    this.requestPayLoad = {
      empId: 1,
      // empId: sessionStorage.setItem("empId"),
      fname: this.myReactiveForm.get('FirstName')?.value,
      mname: this.myReactiveForm.get('MiddleName')?.value,
      lname: this.myReactiveForm.get('LastName')?.value,
      dob: this.myReactiveForm.get('DOB')?.value,
      phno: this.myReactiveForm.get('PhoneNumber')?.value,
      maritalstatus: this.myReactiveForm.get('MaritalStatus')?.value,
      emailid: this.myReactiveForm.get('Email')?.value,
      addresses: [
        {
          address1: this.myReactiveForm.get('CAddress')?.value,
          address2: this.myReactiveForm.get('CAddress1')?.value,
          city: this.myReactiveForm.get('currentcity').value,
          state: this.myReactiveForm.get('currentstate')?.value,
          pincode: this.myReactiveForm.get('CPinCode')?.value,
          addressType: 'current'
        },
        {
          address1: this.myReactiveForm.get('PAddress')?.value,
          address2: this.myReactiveForm.get('PAddress1')?.value,
          city: this.myReactiveForm.get('permanentcity')?.value,
          state: this.myReactiveForm.get('permanentstate')?.value,
          pincode: this.myReactiveForm.get('PinCode')?.value,
          addressType: 'permanent'
        }
      ],

      emergencyName: this.myReactiveForm.get('emergencyName')?.value,
      emergencyRelation: this.myReactiveForm.get('relation')?.value,
      emergencyPh1: this.myReactiveForm.get('emergencyphone1')?.value,
      emergencyPh2: this.myReactiveForm.get('emergencyphone2')?.value,
      emergencyAddr1: this.myReactiveForm.get('address1')?.value,
      emergencyAddr2: this.myReactiveForm.get('address2')?.value,
      emergencyCity: this.myReactiveForm.get('emergencycity')?.value,
      emergencyState: this.myReactiveForm.get('emergencystate')?.value,
      emergencyPincode: this.myReactiveForm.get('pin')?.value,
      citizenshipCountry: this.myReactiveForm.get('country')?.value,
      passportNumber: this.myReactiveForm.get('passport')?.value,
      passportIssueDate: this.myReactiveForm.get('issueddate')?.value,
      passportExpiryDate: this.myReactiveForm.get('expirationdate')?.value,
      passportIssuedBy: this.myReactiveForm.get('issuedby')?.value,
      panNumber: this.myReactiveForm.get('pan')?.value,
      nameOnPan: this.myReactiveForm.get('panname')?.value,
      aadharNumber: this.myReactiveForm.get('aadhar')?.value,
      nameOnAadhar: this.myReactiveForm.get('aadharname')?.value,
      qualifications: [
        {
          qualification: this.myReactiveForm.get('qualification')?.value,
          major: this.myReactiveForm.get('major')?.value,
          institute: this.myReactiveForm.get('institute')?.value,
          yearOfCompletion: this.myReactiveForm.get('year')?.value,
          stateOrCountry: this.myReactiveForm.get('qualificationstate')?.value
        }
      ],
      memberships: [
        {
          membership: this.myReactiveForm.get('Membership')?.value,
          organizationmembership: this.myReactiveForm.get('OrgMembership')?.value,
          membership_date: this.myReactiveForm.get('membershipdate')?.value
        }
      ],
      honors: [
        {
          honours: this.myReactiveForm.get('honour')?.value,
          honor_title: this.myReactiveForm.get('honouraward')?.value,
          granter: this.myReactiveForm.get('grantor')?.value,
          receivedyear: this.myReactiveForm.get('yearReceived')?.value
        }
      ],
      previousEmploymentDetails: [
        {
          from: this.myReactiveForm.get('fromyr')?.value,
          to: this.myReactiveForm.get('toyr')?.value,
          location: this.myReactiveForm.get('location')?.value,
          designation: this.myReactiveForm.get('designation')?.value,
          companyName: this.myReactiveForm.get('companyname')?.value
        }
      ],
      gender: this.myReactiveForm.get('gender')?.value,
      bloodgroup: this.myReactiveForm.get('BloodGrp')?.value,
      isLivingWithInjury: this.myReactiveForm.get('isInjured')?.value,
      injuryDetails: this.myReactiveForm.get('injuryDetails')?.value,
      isLivingWithIllness: this.myReactiveForm.get('isIll')?.value,
      illnessDetails: this.myReactiveForm.get('illnessDetails')?.value,
      isLivingWithDisability: this.myReactiveForm.get('isDisabled')?.value,
      disabilityDetails: this.myReactiveForm.get('disabilityDetails')?.value,
      allergyToMedicines: this.myReactiveForm.get('Healthinfo')?.value,
      medicalAlert: this.myReactiveForm.get('isMedicalAlert')?.value
    }
  }




}




function data(data: any) {
  throw new Error('Function not implemented.');
}

