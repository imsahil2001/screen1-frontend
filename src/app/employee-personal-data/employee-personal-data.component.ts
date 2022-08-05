
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
// import { CreateCSSProperties } 
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-employee-personal-data',
  templateUrl: './employee-personal-data.component.html',
  styleUrls: ['./employee-personal-data.component.css']
})



export class EmployeePersonalDataComponent implements OnInit {







  title = 'official_project';

  pincodegetwithCandS: any;
  pincodegetwithCandSofPerAdd: any;
  public pinCode = '';
  public pinCode2 = '';

  public EState = ' ';
  public ECity = ' ';

  public PEState = ' ';
  public PECity = ' ';
  injurySpec: boolean = false;
  illnessSpec: boolean = false;
  disabilitySpec: boolean = false;

  emergency_checkbox: boolean = false;
  firstedu: boolean = false;
  secedu: boolean = false;
  thirdedu: boolean = false;
  forthedu: boolean = false;
  fivthedu: boolean = false;
  countcertificate: any = 0;

  memberflagArr: any = class {

    flag1: boolean = false;
    flag2: boolean = false;
    flag3: boolean = false;

  }
  AwardsflagArr: any = class {

    flag1: boolean = false;
    flag2: boolean = false;
    flag3: boolean = false;
    flag4: boolean = false;
  }

  Certificate: any = class {

    membership: "";
    organizationmembership: "";
    membership_date: "";

  };

  certificatValidations: any = [];
  AwardValidations: any = [];
  Award: any = class {

    honours: "";
    honor_title: "";
    granter: "";
    receivedyear: "";
  }



  Certificates: any = [];


  Qualifications: Array<string> = ['Bachelor', 'Masters', '10TH', '12TH', 'Diploma/other'];
  Countries: Array<string> = ['India', 'USA', 'Australia', 'Germany', 'Others']
  Years: Array<Number> = new Array();

  PrivousEmpDetail: any = class {

    companyname: any;
    fromyr: any;
    toyr: any;
    location: any;
    designation: any;

  }
  PEmpDetails: any = [];
  validdob: boolean = true;





  constructor(private http: HttpClient, private userservice: EmployeePersonalDataService, private route: Router) {


  }

  // base url to which request has to be send
  submitted: any = false;
  emp_id: any = 0;

  // --------------------------------------------
  //select option list

  currentStateId: number = 0;
  statesList: State[] = [

    {

      id: 2,

      state: 'Punjab',

    },

    {

      id: 3,

      state: 'Haryana',

    },

    {

      id: 4,

      state: 'Telangana',

    },

  ];

  citiesList: City[];

  genderList: Gender[];



  selectedState: any = '';


  currentstate: any = "";
  emergencystate: any = "";
  permanentstate: any = "";
  currentcity: any = "";
  emergencycity: any = "";
  permanentcity: any = "";

  maritalStatusList: MaritalStatus[];

  // --------------------------------------------
  // form group
  myReactiveForm: any = {};
  requestPayLoad: any = {};
  Awards: any = [];


  getcuurentPincodeData(event, pin: any) {

    console.log(event.target.value.length);
    // console.log(this.myReactiveForm.controls.unknown.getValue());


    if (((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) && event.target.value.length == 6) {

      console.log(event.target.value);
      this.userservice.getCityState(event.target.value).subscribe((data: any) => {

        this.EState = data.state;
        this.ECity = data.city;
        let state1: State = {
          id: 1,
          state: data.state
        }

        let city1: City = {
          id: 1,
          city: data.city,
          state_id: 1,
        }

        console.log(state1);
        console.log(city1);


        console.log(this.statesList);
        console.log(this.citiesList);

        // while (this.statesList.length > 0) {
        //   this.statesList.pop();
        // }

        this.statesList = [];
        this.citiesList = [];

        // while (this.citiesList.length > 0) {
        //   this.citiesList.pop();
        // }

        this.statesList.push(state1);
        this.citiesList.push(city1);


        console.log(this.statesList);
        console.log(this.citiesList);

        // this.users.push(data);
        console.log(this.EState);
        console.log(this.ECity);

        // this.myReactiveForm.get('currentcity').disable();
        // this.myReactiveForm.get('currentstate').disable();

        console.log(`end`);

        this.myReactiveForm.value.currPin?.setValue(event.target.value);
      });
    } else if (event.target.value.length == 0) {
      this.citiesList = [];

      this.statesList = [];

      this.userservice.getStatesFromDb().subscribe(data => {
        this.statesList = data;
        console.log(`state list gotten`);
        console.log(this.statesList);
      })
    }

  }

  getDataofPerAdd(event, pinCode2: any) {
    //let val = this.myReactiveForm.get('unknown').value;
    //alert(data);
    console.log(event.target.value.length);
    // console.log(this.myReactiveForm.controls.unknown.getValue());
    // if (event.target.value.length == 6) {

    this.userservice.getCityState(event.target.value).subscribe((data: any) => {

      this.PEState = data.state;
      this.PECity = data.city;
      // this.users.push(data);
      console.log(this.PEState);
      console.log(this.PECity);

      this.myReactiveForm.value.perPin?.setValue(event.target.value);
      // }
    })

  }
  ngOnInit() {


    // 
    for (let i = 0; i < 50; i++) {
      this.Years.push(Number('1972') + i);
      console.log('helo');

    }




    this.userservice.getGenderFromDb().subscribe(data => {
      this.genderList = data;
      console.log(`gender list gotten`);
      console.log(this.genderList);
    })

    // while (this.statesList.length > 0) {
    //   this.statesList.pop();
    // }

    // while (this.citiesList.length > 0) {
    //   this.citiesList.pop();
    // }

    console.log('state');
    this.userservice.getStatesFromDb().subscribe(data => {
      this.statesList = data;
      console.log(`state list gotten`);
      console.log(this.statesList);
    })



    this.userservice.getMaritalStatusFromDb().subscribe(data => {
      this.maritalStatusList = data;
      console.log(`marital status gottten`);
      console.log(this.maritalStatusList)
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

      // country: new FormControl({ value: null, disabled: true }),
      // passport: new FormControl({ value: null, disabled: true }),
      // issueddate: new FormControl({ value: null, disabled: true }),
      // expirationdate: new FormControl({ value: null, disabled: true }),
      // issuedby: new FormControl({ value: null, disabled: true }),

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
      // Membership: new FormControl(null, [
      //   Validators.pattern('[A-Za-z_ ]{1,32}'),
      //   Validators.required,
      // ]),
      // OrgMembership: new FormControl(null, [
      //   Validators.pattern('[A-Za-z_ ]{1,32}'),
      //   Validators.required,
      // ]),
      // membershipdate: new FormControl(null, [
      //   Validators.required,
      //   Validators.pattern('^(2|1){1}[0-9]{3}.[0-9]{2}.[0-9]{2}.*$'),
      // ]),
      honour: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]),
      honouraward: new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
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
        Validators.pattern('[A-Za-z]{1,32}'),
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
        // Validators.pattern('^(A|B|AB|O)[+-]$'),
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
      declarationCheckboxOne: new FormControl(null, [Validators.required]),
      declarationCheckboxSecond: new FormControl(null, [Validators.required]),
      beingQualifiedCheckbox: new FormControl(null, [Validators.required]),
      otherConsentCheckbox: new FormControl(null, [Validators.required]),


    });




    // this.filldata();
    console.log('hello');

    // add one row to certificates and awards tables
    this.addCertificates();
    this.addAwards();
    this.addEducationRow();
    this.addPEmpDetails();


    this.myReactiveForm.get('currentstate').disable();
    this.myReactiveForm.get('currentcity').disable();

    this.myReactiveForm.get('permanentstate').disable();
    this.myReactiveForm.get('permanentcity').disable();

    this.myReactiveForm.get('emergencycity').disable();
    this.myReactiveForm.get('emergencystate').disable();


  }



  countPEmpDetails: any = 0;
  EmplprevValidations: any = [];
  onchangedob() {



    var date = this.myReactiveForm.get('DOB').value.substring(0, 4);

    var today = new Date();



    // console.log(date);

    console.log(today);

    //alert(date);

    var year = today.getUTCFullYear();




    if (Number(year) - (Number(date)) <= 18) {



      this.validdob = false;

    }

    else {

      this.validdob = true;

    }



  }

  addPEmpDetails() {


    this.myReactiveForm.addControl('companyname' + this.countPEmpDetails, new FormControl(null, [
      Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$'),
    ]));

    this.myReactiveForm.addControl('fromyr' + this.countPEmpDetails, new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{4}'),
      Validators.minLength(4),
      Validators.maxLength(4),
    ]));

    this.myReactiveForm.addControl('toyr' + this.countPEmpDetails, new FormControl('', [
      Validators.pattern('[A-Za-z]{1,32}'),
      Validators.required,
    ]));

    this.myReactiveForm.addControl('designation' + this.countPEmpDetails, new FormControl('', [
      Validators.pattern('[0-9]{1,4}'),
      Validators.required,
    ]));

    this.myReactiveForm.addControl('location' + this.countPEmpDetails, new FormControl('', [
      Validators.pattern('[0-9]{1,4}'),
      Validators.required,
    ]));




    let data = new this.PrivousEmpDetail();

    data.companyname = this.myReactiveForm.get('companyname' + this.countPEmpDetails)?.value;
    data.fromyr = this.myReactiveForm.get('fromyr' + this.countPEmpDetails)?.value;
    data.toyr = this.myReactiveForm.get('toyr' + this.countPEmpDetails)?.value;
    data.designation = this.myReactiveForm.get('designation' + this.countPEmpDetails)?.value;
    data.location = this.myReactiveForm.get('location' + this.countPEmpDetails)?.value;


    this.PEmpDetails.push(data);

    let obj = new this.PrivousEmpDetail();

    this.EmplprevValidations.push(obj);

    this.countPEmpDetails += 1;




  }

  removePEmpDetails(ind: any) {


    this.PEmpDetails.splice(ind, 1);

    this.myReactiveForm.removeControl('companyname' + ind);
    this.myReactiveForm.removeControl('fromyr' + ind);
    this.myReactiveForm.removeControl('toyr' + ind);
    this.myReactiveForm.removeControl('designation' + ind);
    this.myReactiveForm.removeControl('location' + ind);




  }
  toggleemergency_checkbox() {
    this.emergency_checkbox = !this.emergency_checkbox;
  }

  ValidationInAwards(ind: any) {


    let flag = (!this.myReactiveForm.get('honour' + ind).valid &&
      this.myReactiveForm.get('honour' + ind).touched) ||
      (this.submitted && this.myReactiveForm.get('honour' + ind).invalid)
    this.AwardValidations[ind].flag1 = flag;


    flag =
      (!this.myReactiveForm.get('honouraward' + ind).valid &&
        this.myReactiveForm.get('honouraward' + ind).touched) ||
      (this.submitted && this.myReactiveForm.get('honouraward' + ind).invalid)

    this.AwardValidations[ind].flag2 = flag;


    flag =
      (!this.myReactiveForm.get('grantor' + ind).valid &&
        this.myReactiveForm.get('grantor' + ind).touched) ||
      (this.submitted && this.myReactiveForm.get('grantor' + ind).invalid)

    this.AwardValidations[ind].flag3 = flag;




    flag = (!this.myReactiveForm.get('yearReceived' + ind).valid &&
      this.myReactiveForm.get('yearReceived' + ind).touched) ||
      (this.submitted && this.myReactiveForm.get('yearReceived' + ind).invalid)

    this.AwardValidations[ind].flag4 = flag;

  }




  // checks validations of each colum of certificate table
  ValidationInCertificate(ind: any) {


    // making a validation flag and then adding it to a validation flag array 
    let flag = (!this.myReactiveForm.get('Membership' + ind).valid &&
      this.myReactiveForm.get('Membership' + ind).touched) ||
      (this.submitted && this.myReactiveForm.get('Membership' + ind).invalid);
    this.certificatValidations[ind].flag1 = flag;

    console.log(flag);
    console.log("touched" + this.myReactiveForm.get('Membership' + ind).touched);
    console.log(this.myReactiveForm.get('Membership' + ind)?.value);


    flag = (!this.myReactiveForm.get('OrgMembership' + ind)?.valid &&
      this.myReactiveForm.get('OrgMembership' + ind)?.touched) ||
      (this.submitted && this.myReactiveForm.get('OrgMembership' + ind)?.invalid);
    this.certificatValidations[ind].flag2 = flag;


    console.log(this.countcertificate);

    flag = (this.myReactiveForm.get('membershipdate' + ind).invalid &&
      this.myReactiveForm.get('membershipdate' + ind).touched) ||
      (this.submitted && this.myReactiveForm.get('membershipdate' + ind).invalid);
    this.certificatValidations[ind].flag3 = flag;

  }

  awardCount: any = 0;

  addAwards() {



    this.myReactiveForm.addControl('honour' + this.awardCount, new FormControl('', [
      Validators.pattern('[A-Za-z]{1,32}'),
      Validators.required,
    ]));

    this.myReactiveForm.addControl('honouraward' + this.awardCount, new FormControl('', [
      Validators.pattern('[A-Za-z]{1,32}'),
      Validators.required,
    ]));

    this.myReactiveForm.addControl('grantor' + this.awardCount, new FormControl('', [
      Validators.pattern('[A-Za-z]{1,32}'),
      Validators.required,
    ]));

    this.myReactiveForm.addControl('yearReceived' + this.awardCount, new FormControl('', [
      Validators.pattern('[0-9]{1,4}'),
      Validators.required,
    ]));





    let data = new this.Award();

    data.honours = this.myReactiveForm.get('honour' + this.awardCount)?.value;
    data.honor_title = this.myReactiveForm.get('honouraward' + this.awardCount)?.value;
    data.granter = this.myReactiveForm.get('grantor' + this.awardCount)?.value;
    data.receivedyear = this.myReactiveForm.get('yearReceived' + this.awardCount)?.value;


    this.Awards.push(data);

    let obj = new this.AwardsflagArr();

    this.AwardValidations.push(obj);

    this.awardCount += 1;
  }

  removeReward(data: any) {

    this.Awards.forEach((val, index) => {

      if (val == data) {



        this.myReactiveForm.removeControl('honour' + index);

        this.myReactiveForm.removeControl('honouraward' + index);

        this.myReactiveForm.removeControl('grantor' + index);

        this.myReactiveForm.removeControl('yearReceived' + index);


        this.Awards.splice(index, 1);
      }
    })
  }


  // adds new certificate row to the certification table
  addCertificates() {

    let obj = new this.memberflagArr();
    this.certificatValidations.push(obj);


    // adding validation to the newly added row and its columns in certificates table
    this.myReactiveForm.addControl('Membership' + this.countcertificate, new FormControl('', [Validators.pattern('[A-Za-z_ ]{1,32}'), Validators.required]));

    this.myReactiveForm.addControl('OrgMembership' + this.countcertificate, new FormControl('', [
      Validators.pattern('[A-Za-z_ ]{1,32}'),
      Validators.required,
    ]));

    this.myReactiveForm.addControl('membershipdate' + this.countcertificate, new FormControl(null, [Validators.required,
    Validators.pattern('^(2|1){1}[0-9]{3}.[0-9]{2}.[0-9]{2}.*$')]));


    //making array for payload of certificates table
    let data = new this.Certificate();

    data.membership = this.myReactiveForm.get("Membership" + this.countcertificate)?.value,
      data.organizationmembership = this.myReactiveForm.get("OrgMembership" + this.countcertificate)?.value,
      data.membership_date = this.myReactiveForm.get("membershipdate" + this.countcertificate)?.value

    console.log(data);
    this.Certificates.push(data);

    //counter which increases when a new row is added to certificate table 
    this.countcertificate += 1;

  }

  //removes particular row from certifcates table
  removeCertificate(data: any) {

    // data is the value of that particular row
    this.Certificates.forEach((value, index) => {

      if (value.membership == data.membership) {


        this.myReactiveForm.addControl('Membership' + index);
        this.myReactiveForm.removeControl('OrgMembership' + index);
        this.myReactiveForm.removeControl('membershipdate' + index);


        this.Certificates.splice(index, 1)

      }
    })
  }


  addEducationRow() {



    // qualificationstate4:new FormControl(null,[
    //   Validators.required,


    // ]),
    // qualificationstate0:new FormControl(null,[

    //   Validators.required]),
    // qualificationstate1:new FormControl(null,[

    //   Validators.required]),
    // qualificationstate2:new FormControl(null,[
    // Validators.required]),

    // qualificationstate3:new FormControl(null,[
    // Validators.required]),


    // qualification0:new FormControl(null,[Validators.required]),
    // qualification1:new FormControl(null,[Validators.required]),
    // qualification2:new FormControl(null,[Validators.required]),
    // qualification3:new FormControl(null,[Validators.required]),
    // qualification4:new FormControl(null,[Validators.required]),
    // major0:new FormControl(null,[Validators.required]),
    // major1:new FormControl(null,[Validators.required]),
    // major2:new FormControl(null,[Validators.required]),
    // major3:new FormControl(null,[Validators.required]),
    // major4:new FormControl(null,[Validators.required]),
    // year0:new FormControl(null,[Validators.required]),
    // year1:new FormControl(null,[Validators.required]),
    // year2:new FormControl(null,[Validators.required]),
    // year3:new FormControl(null,[Validators.required]),
    // year4:new FormControl(null,[Validators.required]),


    // institute0:new FormControl(null,[Validators.required]),
    // institute1:new FormControl(null,[Validators.required]),
    // institute2:new FormControl(null,[Validators.required]),
    // institute3:new FormControl(null,[Validators.required]),
    // institute4:new FormControl(null,[Validators.required]),





    if (!this.firstedu) {
      this.firstedu = true;


      // this.myReactiveForm.addControl('honour'+this.awardCount, new FormControl('',[
      //   Validators.pattern('[A-Za-z]{1,32}'),
      //   Validators.required,
      // ]));

      this.myReactiveForm.addControl('institute0', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('year0', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('major0', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualification0', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualificationstate0', new FormControl(null, [Validators.required]));


    }
    else if (!this.secedu) {
      this.secedu = true;


      this.myReactiveForm.addControl('institute1', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('year1', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('major1', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualification1', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualificationstate1', new FormControl(null, [Validators.required]));


    }
    else if (!this.thirdedu) {
      this.thirdedu = true;


      this.myReactiveForm.addControl('institute2', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('year2', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('major2', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualification2', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualificationstate2', new FormControl(null, [Validators.required]));

    }
    else if (!this.forthedu) {
      this.forthedu = true;



      this.myReactiveForm.addControl('institute3', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('year3', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('major3', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualification3', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualificationstate3', new FormControl(null, [Validators.required]));


    }
    else if (!this.fivthedu) {



      this.myReactiveForm.addControl('institute4', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('year4', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('major4', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualification4', new FormControl(null, [Validators.required]));

      this.myReactiveForm.addControl('qualificationstate4', new FormControl(null, [Validators.required]));

      this.fivthedu = true;


    }
  }

  toggle2edu() {

    this.myReactiveForm.removeControl('qualification2');
    this.myReactiveForm.removeControl('major2');
    this.myReactiveForm.removeControl('year2');
    this.myReactiveForm.removeControl('institute2');


    this.secedu = !this.secedu;
  }
  toggle3edu() {

    this.myReactiveForm.removeControl('qualification3');
    this.myReactiveForm.removeControl('major3');
    this.myReactiveForm.removeControl('year3');
    this.myReactiveForm.removeControl('institute3');

    this.thirdedu = !this.thirdedu;
  }
  toggle4edu() {

    this.myReactiveForm.removeControl('qualification4');
    this.myReactiveForm.removeControl('major4');
    this.myReactiveForm.removeControl('year4');
    this.myReactiveForm.removeControl('institute4');

    this.forthedu = !this.forthedu;
  }
  toggle5edu() {


    this.myReactiveForm.removeControl('qualification5');
    this.myReactiveForm.removeControl('major5');
    this.myReactiveForm.removeControl('year5');
    this.myReactiveForm.removeControl('institute5');

    this.fivthedu = !this.fivthedu;
  }
  toggle1edu() {

    this.myReactiveForm.removeControl('qualification1');
    this.myReactiveForm.removeControl('major1');
    this.myReactiveForm.removeControl('year1');
    this.myReactiveForm.removeControl('institute1');


    this.firstedu = !this.firstedu;
  }


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

    console.log(this.statesList)
    console.log(e.target.value);
    console.log(e.target.value.length);

    let s = e.target.value;
    let ss = "";
    for (let i = s.length - 1; i >= 0; i--) {

      if (s[i] == " ") break;
      ss = s[i] + ss;
    }
    console.log(ss);

    this.userservice.getCityListByState(ss).subscribe(data => {
      this.citiesList = data;
      console.log(`gender list gotten`);
    })


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


  passportcheck: boolean = false;
  // --------------------------------------------
  // enable or disable the passport fields on the basis of the checkbox
  passportClick() {
    console.log(`passport checkbox clicked`);


    // this.myReactiveForm.controls.country.enable();

    this.passportcheck = !this.passportcheck;
    if (this.passportcheck) {




      // country: new FormControl({ value: null, disabled: true }),
      // passport: new FormControl({ value: null, disabled: true }),
      // issueddate: new FormControl({ value: null, disabled: true }),
      // expirationdate: new FormControl({ value: null, disabled: true }),
      // issuedby: new FormControl({ value: null, disabled: true }),

      // enabling inputs
      // console.log("hvghvghsfdvgvsdfhvhgdfs")
      // this.myReactiveForm.controls.country.disabled=false;
      // this.myReactiveForm.controls.issueddate.enable();
      // this.myReactiveForm.controls.expirationdate.enable();
      // this.myReactiveForm.controls.issuedby.enable();

      // // applying validations to inputs
      // this.myReactiveForm
      //   .get('country')
      //   .setValidators([
      //     Validators.required,
      //     Validators.pattern('^[a-zA-Z]{1,}$'),
      //   ]);
      // this.myReactiveForm
      //   .get('passport')
      //   .setValidators([
      //     Validators.required,
      //     Validators.pattern('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$'),
      //   ]);
      // this.myReactiveForm
      //   .get('issueddate')
      //   .setValidators([Validators.required]);
      // this.myReactiveForm
      //   .get('expirationdate')
      //   .setValidators([Validators.required]);
      // this.myReactiveForm
      //   .get('issuedby')
      //   .setValidators([
      //     Validators.required,
      //     Validators.pattern('^[a-zA-Z]{1,}$'),
      //   ]);

      // // updating the inputs after alteration
      // this.myReactiveForm.get('country').updateValueAndValidity();
      // this.myReactiveForm.get('passport').updateValueAndValidity();
      // this.myReactiveForm.get('issueddate').updateValueAndValidity();
      // this.myReactiveForm.get('expirationdate').updateValueAndValidity();
      // this.myReactiveForm.get('issuedby').updateValueAndValidity();


      this.myReactiveForm.addControl('country', new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]{1,}$')]));
      this.myReactiveForm.addControl('passport', new FormControl(null, [Validators.required, Validators.pattern('^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$')]));
      this.myReactiveForm.addControl('issueddate', new FormControl(null, [Validators.required]));
      this.myReactiveForm.addControl('expirationdate', new FormControl(null, [Validators.required]));
      this.myReactiveForm.addControl('issuedby', new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]{1,}$')]));

      //this.myReactiveForm.addControl('institute4',new FormControl(null,[Validators.required]));


    } else {
      //country
      // this.myReactiveForm.get('country').clearValidators();
      // this.myReactiveForm.controls.country?.setValue(null);
      // this.myReactiveForm.controls.country.disable();
      // this.myReactiveForm.get('country').updateValueAndValidity();

      // //passport
      // this.myReactiveForm.get('passport').clearValidators();
      // this.myReactiveForm.controls.passport?.setValue(null);
      // this.myReactiveForm.controls.passport.disable();
      // this.myReactiveForm.get('passport').updateValueAndValidity();

      // //issued date
      // this.myReactiveForm.get('issueddate').clearValidators();
      // this.myReactiveForm.controls.issueddate?.setValue(null);
      // this.myReactiveForm.controls.issueddate.disable();
      // this.myReactiveForm.get('issueddate').updateValueAndValidity();

      // //expiration date
      // this.myReactiveForm.get('expirationdate').clearValidators();
      // this.myReactiveForm.controls.expirationdate?.setValue(null);
      // this.myReactiveForm.controls.expirationdate.disable();
      // this.myReactiveForm.get('expirationdate').updateValueAndValidity();

      // //issued by
      // this.myReactiveForm.get('issuedby').clearValidators();
      // this.myReactiveForm.controls.issuedby?.setValue(null);
      // this.myReactiveForm.controls.issuedby.disable();
      // this.myReactiveForm.get('issuedby').updateValueAndValidity();


      this.myReactiveForm.get('issuedby').removeControl();
      this.myReactiveForm.get('expirationdate').removeControl();
      this.myReactiveForm.get('issueddate').removeControl();
      this.myReactiveForm.get('passport').removeControl();
      this.myReactiveForm.get('country').removeControl();


    }
  }

  // --------------------------------------------
  // checkboxes functions
  isInjuredFcn(e: any) {
    if (e.target.value = "true")
      e.target.value = true;
    this.myReactiveForm.controls.isInjured?.setValue(e.target.value);
  }
  injury() {
    this.injurySpec = true;
  }
  noinjury() {
    this.injurySpec = false;
  }

  isIllFcn(e: any) {

    if (e.target.value = "true")
      e.target.value = true;

    this.myReactiveForm.controls.isIll?.setValue(e.target.value);
  }
  illness() {
    this.illnessSpec = !this.illnessSpec;
  }
  noillness() {
    this.illnessSpec = false;
  }

  isDisabledFcn(e: any) {
    if (e.target.value = "true")
      e.target.value = true;
    this.myReactiveForm.controls.isDisabled?.setValue(e.target.value);
  }
  disability() {
    this.disabilitySpec = !this.disabilitySpec;
  }
  nodisability() {
    this.disabilitySpec = false;
  }

  isMedicalAlertFcn(e: any) {
    if (e.target.value = "true")
      e.target.value = true;
    this.myReactiveForm.controls.isMedicalAlert?.setValue(e.target.value);
  }

  currAddr: string;

  permAddr: string;

  currAddr1: string;

  permAddr1: string;

  currPin: number;

  perPin: number;



  updateAddr(event) {

    if (event.target.checked) {

      this.permAddr = this.currAddr;

      this.permAddr1 = this.currAddr1;

      this.perPin = this.currPin;

      this.permanentstate = this.currentstate;

      this.permanentcity = this.currentcity;

    } else {

      this.permAddr = '';

      this.permAddr1 = '';

      this.perPin = null;

      this.permanentstate = '';

      this.permanentcity = '';

    }

  }

  check = false;

  // --------------------------------------------
  // request to service layer
  onSubmit() {
    // if (sessionStorage.getItem('emp_id') == null) {


    console.log(this.myReactiveForm.value)
    this.makePayLoad();




    this.requestPayLoad.memberships = this.Certificates;
    this.requestPayLoad.honors = this.Awards;



    console.log(JSON.stringify(this.requestPayLoad));
    this.submitted = true;

    if (this.myReactiveForm.invalid) {
      return;
    }

    this.certificatValidations.forEach((val, index) => {

      this.ValidationInCertificate(index);
    })

    this.Awards.forEach((val, index) => {

      this.ValidationInAwards(index);
    })






    if (!this.emergency_checkbox) {

      this.myReactiveForm.removeControl('pin');
      this.myReactiveForm.removeControl('emergencycity');
      this.myReactiveForm.removeControl('emergencystate');
      this.myReactiveForm.removeControl('address2');
      this.myReactiveForm.removeControl('address1');
      this.myReactiveForm.removeControl('emergencyphone2');
      this.myReactiveForm.removeControl('emergencyphone1');
      this.myReactiveForm.removeControl('relation');
      this.myReactiveForm.removeControl('emergencyName');
      //this.myReactiveForm.removeControl('emergencystate');


    }



    // if form is invalid it wont get submit

    console.log('submitted');

    // sending payload to backend
    this.emp_id = this.userservice.savePersonalDetails(
      this.requestPayLoad
    );

    // setting session storage 
    sessionStorage.setItem('emp_id', this.requestPayLoad.empId);
    sessionStorage.setItem('stage', 'PERSONAL_INFO');

    // window.alert("data has been saved")



    if (!this.emergency_checkbox) {

      this.myReactiveForm.addControl('pin', new FormControl(null, [
        Validators.pattern('[0-9]{6}'),
        Validators.required,
      ]));
      this.myReactiveForm.addControl('emergencycity', new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]));
      this.myReactiveForm.addControl('emergencystate', new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]));
      this.myReactiveForm.addControl('address2', new FormControl(null, Validators.required));
      this.myReactiveForm.addControl('address1', new FormControl(null, Validators.required));
      this.myReactiveForm.addControl('emergencyphone1', new FormControl(null, [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]));
      this.myReactiveForm.addControl('emergencyphone2', new FormControl(null, [
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]));
      this.myReactiveForm.addControl('relation', new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]));
      this.myReactiveForm.addControl('emergencyName', new FormControl(null, [
        Validators.pattern('[A-Za-z]{1,32}'),
        Validators.required,
      ]));
    }




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



  // filldata() {
  //   this.myReactiveForm.controls.FirstName.setValue("Sahil");
  //   this.myReactiveForm.controls.MaritalStatus.setValue("married");
  //   this.myReactiveForm.controls.LastName.setValue("Rajpal");
  //   this.myReactiveForm.controls.MiddleName.setValue("m");
  //   this.myReactiveForm.controls.PhoneNumber.setValue("1234567890");
  //   this.myReactiveForm.controls.CAddress.setValue("banjra");
  //   this.myReactiveForm.controls.CAddress1.setValue("banjara2");
  //   this.myReactiveForm.controls.PAddress.setValue("srilax");
  //   this.myReactiveForm.controls.PAddress1.setValue("srilax2");
  //   this.myReactiveForm.controls.CPinCode.setValue("133001");
  //   this.myReactiveForm.controls.PinCode.setValue("500033");
  //   this.myReactiveForm.controls.Email.setValue("shilkkr56@g.com");
  //   this.myReactiveForm.controls.DOB.setValue("30-09-2001");
  //   this.myReactiveForm.controls.email.setValue("shilkkr56@g.com");
  //   this.myReactiveForm.controls.phone.setValue("1234567890");
  //   this.myReactiveForm.controls.country.setValue("India");
  //   this.myReactiveForm.controls.passport.setValue("J1239349");
  //   this.myReactiveForm.controls.issueddate.setValue("21-12-2002");
  //   this.myReactiveForm.controls.expirationdate.setValue("21-01-2013");
  //   this.myReactiveForm.controls.issuedby.setValue("India");
  //   this.myReactiveForm.controls.pan.setValue("ABCDE1234F");
  //   this.myReactiveForm.controls.panname.setValue("Sahil");
  //   this.myReactiveForm.controls.aadhar.setValue("4444 4444 4444");
  //   this.myReactiveForm.controls.aadharname.setValue("Sahil");
  //   this.myReactiveForm.controls.companyname.setValue("jocata");
  //   this.myReactiveForm.controls.fromyr.setValue("2022");
  //   this.myReactiveForm.controls.toyr.setValue("2012");
  //   this.myReactiveForm.controls.designation.setValue("intern");
  //   this.myReactiveForm.controls.location.setValue("hyderbad");
  //   this.myReactiveForm.controls.qualification.setValue("Masters");
  //   this.myReactiveForm.controls.major.setValue("major");
  //   this.myReactiveForm.controls.Membership.setValue("membership");
  //   this.myReactiveForm.controls.OrgMembership.setValue("OrgMembership");
  //   this.myReactiveForm.controls.membershipdate.setValue("04-08-2002");
  //   this.myReactiveForm.controls.honour.setValue("honour");
  //   this.myReactiveForm.controls.honouraward.setValue("award");
  //   this.myReactiveForm.controls.grantor.setValue("grantor");
  //   this.myReactiveForm.controls.year.setValue("2011");
  //   this.myReactiveForm.controls.currentstate.setValue("Haryana");
  //   this.myReactiveForm.controls.currentcity.setValue("Bathinda");
  //   this.myReactiveForm.controls.permanentstate.setValue("Haryana");
  //   this.myReactiveForm.controls.permanentcity.setValue("Bathinda");
  //   this.myReactiveForm.controls.institute.setValue("chitakra");
  //   this.myReactiveForm.controls.yearReceived.setValue("2011");
  //   this.myReactiveForm.controls.emergencyName.setValue("Jha");
  //   this.myReactiveForm.controls.relation.setValue("bro");
  //   this.myReactiveForm.controls.emergencyphone1.setValue("1234567890");
  //   this.myReactiveForm.controls.emergencyphone2.setValue("1234567890");
  //   this.myReactiveForm.controls.emergencystate.setValue("Haryana");
  //   this.myReactiveForm.controls.qualificationstate.setValue("Bathinda");
  //   this.myReactiveForm.controls.emergencycity.setValue("Bathinda");
  //   this.myReactiveForm.controls.address1.setValue("banjara1");
  //   this.myReactiveForm.controls.address2.setValue("banjara2");
  //   this.myReactiveForm.controls.pin.setValue("500033");
  //   this.myReactiveForm.controls.gender.setValue("male");
  //   this.myReactiveForm.controls.isInjured.setValue("true");
  //   this.myReactiveForm.controls.isIll.setValue("true");
  //   this.myReactiveForm.controls.isDisabled.setValue("true");
  //   this.myReactiveForm.controls.isMedicalAlert.setValue("true");
  //   this.myReactiveForm.controls.BloodGrp.setValue("A+");
  //   this.myReactiveForm.controls.injuryDetails.setValue("injury details");
  //   this.myReactiveForm.controls.Healthinfo.setValue("health issues");
  //   this.myReactiveForm.controls.illnessDetails.setValue("illness details");
  //   this.myReactiveForm.controls.disabilityDetails.setValue("disability details");
  //   this.myReactiveForm.controls.declarationCheckboxOne.setValue("true");
  //   this.myReactiveForm.controls.declarationCheckboxSecond.setValue("true");
  //   this.myReactiveForm.controls.beingQualifiedCheckbox.setValue("true");
  //   this.myReactiveForm.controls.otherConsentCheckbox.setValue("true");

  //   this.currentstate = "Haryana";
  //   this.emergencystate = "Haryana";
  //   this.permanentstate = "Haryana";
  //   this.currentcity = "Ambala";
  //   this.emergencycity = "Ambala";
  //   this.permanentcity = "Ambala";
  // };



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
          qualification: this.myReactiveForm.get('qualification0')?.value,
          major: this.myReactiveForm.get('major0')?.value,
          institute: this.myReactiveForm.get('institute0')?.value,
          yearOfCompletion: this.myReactiveForm.get('year0')?.value,
          stateOrCountry: this.myReactiveForm.get('qualificationstate0')?.value
        },
        {
          qualification: this.myReactiveForm.get('qualification1')?.value,
          major: this.myReactiveForm.get('major1')?.value,
          institute: this.myReactiveForm.get('institute1')?.value,
          yearOfCompletion: this.myReactiveForm.get('year1')?.value,
          stateOrCountry: this.myReactiveForm.get('qualificationstate1')?.value
        },
        {
          qualification: this.myReactiveForm.get('qualification2')?.value,
          major: this.myReactiveForm.get('major2')?.value,
          institute: this.myReactiveForm.get('institute2')?.value,
          yearOfCompletion: this.myReactiveForm.get('year2')?.value,
          stateOrCountry: this.myReactiveForm.get('qualificationstate2')?.value
        },
        {
          qualification: this.myReactiveForm.get('qualification3')?.value,
          major: this.myReactiveForm.get('major3')?.value,
          institute: this.myReactiveForm.get('institute3')?.value,
          yearOfCompletion: this.myReactiveForm.get('year3')?.value,
          stateOrCountry: this.myReactiveForm.get('qualificationstate3')?.value
        },
        {
          qualification: this.myReactiveForm.get('qualification4')?.value,
          major: this.myReactiveForm.get('major4')?.value,
          institute: this.myReactiveForm.get('institute4')?.value,
          yearOfCompletion: this.myReactiveForm.get('year4')?.value,
          stateOrCountry: this.myReactiveForm.get('qualificationstate4')?.value
        },


      ],
      memberships:
        [



        ],

      // [
      //   {
      //     membership: this.myReactiveForm.get('Membership')?.value,
      //     organizationmembership: this.myReactiveForm.get('OrgMembership')?.value,
      //     membership_date: this.myReactiveForm.get('membershipdate')?.value
      //   }
      // ],
      honors: [
        // {
        //     honours: this.myReactiveForm.get('honour')?.value,
        //     honor_title: this.myReactiveForm.get('honouraward')?.value,
        //     granter: this.myReactiveForm.get('grantor')?.value,
        //     receivedyear: this.myReactiveForm.get('yearReceived')?.value
        // }
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


