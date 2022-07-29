
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeePersonalDataService } from './employee-personal-data.service'
import { MaritalStatus } from './MaritalStatus';

import { Observable } from 'rxjs';
import { Gender } from './Gender';
import { State } from './State';
import { City } from './Citiy';



@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.css']
})
export class EmployeePersonalDataComponent implements OnInit {

  title = 'official_project';

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



  selectedState: any = '';


  currentstate: any = "";
  emergencystate: any = "";
  permanentstate: any = "";
  currentcity: any = "";
  emergencycity: any = "";
  permanentcity: any = "";

  maritalStatusList: MaritalStatus[] = [];

  // --------------------------------------------
  // form group
  myReactiveForm: any = {};
  requestPayLoad: any = {};

  ngOnInit() {

    // if (sessionStorage.getItem('emp_id') != null) {
    this.userservice.getMaritalStatusFromDb().subscribe(data => {
      this.maritalStatusList = data;
      console.log(`marital status gottten`);
      console.log(this.maritalStatusList)
    })


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
    });

    this.filldata();
    // } else {

    // }




  }

  // --------------------------------------------
  // Request Payload




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



  filldata() {
    this.myReactiveForm.controls.FirstName.setValue("Sahil");
    this.myReactiveForm.controls.MaritalStatus.setValue("married");
    this.myReactiveForm.controls.LastName.setValue("Rajpal");
    this.myReactiveForm.controls.MiddleName.setValue("m");
    this.myReactiveForm.controls.PhoneNumber.setValue("1234567890");
    this.myReactiveForm.controls.CAddress.setValue("banjra");
    this.myReactiveForm.controls.CAddress1.setValue("banjara2");
    this.myReactiveForm.controls.PAddress.setValue("srilax");
    this.myReactiveForm.controls.PAddress1.setValue("srilax2");
    this.myReactiveForm.controls.CPinCode.setValue("133001");
    this.myReactiveForm.controls.PinCode.setValue("500033");
    this.myReactiveForm.controls.Email.setValue("shilkkr56@g.com");
    this.myReactiveForm.controls.DOB.setValue("30-09-2001");
    this.myReactiveForm.controls.email.setValue("shilkkr56@g.com");
    this.myReactiveForm.controls.phone.setValue("1234567890");
    this.myReactiveForm.controls.country.setValue("India");
    this.myReactiveForm.controls.passport.setValue("J1239349");
    this.myReactiveForm.controls.issueddate.setValue("21-12-2002");
    this.myReactiveForm.controls.expirationdate.setValue("21-01-2013");
    this.myReactiveForm.controls.issuedby.setValue("India");
    this.myReactiveForm.controls.pan.setValue("ABCDE1234F");
    this.myReactiveForm.controls.panname.setValue("Sahil");
    this.myReactiveForm.controls.aadhar.setValue("4444 4444 4444");
    this.myReactiveForm.controls.aadharname.setValue("Sahil");
    this.myReactiveForm.controls.companyname.setValue("jocata");
    this.myReactiveForm.controls.fromyr.setValue("2022");
    this.myReactiveForm.controls.toyr.setValue("2012");
    this.myReactiveForm.controls.designation.setValue("intern");
    this.myReactiveForm.controls.location.setValue("hyderbad");
    this.myReactiveForm.controls.qualification.setValue("MBA");
    this.myReactiveForm.controls.major.setValue("major");
    this.myReactiveForm.controls.Membership.setValue("membership");
    this.myReactiveForm.controls.OrgMembership.setValue("OrgMembership");
    this.myReactiveForm.controls.membershipdate.setValue("04-08-2002");
    this.myReactiveForm.controls.honour.setValue("honour");
    this.myReactiveForm.controls.honouraward.setValue("award");
    this.myReactiveForm.controls.grantor.setValue("grantor");
    this.myReactiveForm.controls.year.setValue("2011");
    this.myReactiveForm.controls.currentstate.setValue("Haryana");
    this.myReactiveForm.controls.currentcity.setValue("Bathinda");
    this.myReactiveForm.controls.permanentstate.setValue("Haryana");
    this.myReactiveForm.controls.permanentcity.setValue("Bathinda");
    this.myReactiveForm.controls.institute.setValue("chitakra");
    this.myReactiveForm.controls.yearReceived.setValue("2011");
    this.myReactiveForm.controls.emergencyName.setValue("Jha");
    this.myReactiveForm.controls.relation.setValue("bro");
    this.myReactiveForm.controls.emergencyphone1.setValue("1234567890");
    this.myReactiveForm.controls.emergencyphone2.setValue("1234567890");
    this.myReactiveForm.controls.emergencystate.setValue("Haryana");
    this.myReactiveForm.controls.qualificationstate.setValue("Bathinda");
    this.myReactiveForm.controls.emergencycity.setValue("Bathinda");
    this.myReactiveForm.controls.address1.setValue("banjara1");
    this.myReactiveForm.controls.address2.setValue("banjara2");
    this.myReactiveForm.controls.pin.setValue("500033");
    this.myReactiveForm.controls.gender.setValue("male");
    this.myReactiveForm.controls.isInjured.setValue("true");
    this.myReactiveForm.controls.isIll.setValue("true");
    this.myReactiveForm.controls.isDisabled.setValue("true");
    this.myReactiveForm.controls.isMedicalAlert.setValue("true");
    this.myReactiveForm.controls.BloodGrp.setValue("A+");
    this.myReactiveForm.controls.injuryDetails.setValue("injury details");
    this.myReactiveForm.controls.Healthinfo.setValue("health issues");
    this.myReactiveForm.controls.illnessDetails.setValue("illness details");
    this.myReactiveForm.controls.disabilityDetails.setValue("disability details");
    this.myReactiveForm.controls.declarationCheckboxOne.setValue("true");
    this.myReactiveForm.controls.declarationCheckboxSecond.setValue("true");
    this.myReactiveForm.controls.beingQualifiedCheckbox.setValue("true");
    this.myReactiveForm.controls.otherConsentCheckbox.setValue("true");

    this.currentstate = "Haryana";
    this.emergencystate = "Haryana";
    this.permanentstate = "Haryana";
    this.currentcity = "Ambala";
    this.emergencycity = "Ambala";
    this.permanentcity = "Ambala";
  };



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
