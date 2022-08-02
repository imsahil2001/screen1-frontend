import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/import { AsyncLocalStorage } from 'async_hooks';
import { Router } from '@angular/router';
@Component({
  selector: 'app-general-nominations',
  templateUrl: './general-nominations.component.html',
  styleUrls: ['./general-nominations.component.css']
})
export class GeneralNominationsComponent implements OnInit {
  res: any;
  d = new Date();

  // details = JSON.parse(localStorage.getItem('nomineedetails'));
  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router) {

  }
  async onNext(): Promise<void> {
    
    if(sessionStorage.getItem('stage') == 'NOMINEE SAVED'){
      await new Promise<void>(done => setTimeout(() => done(), 2000));
      this.router.navigate(['/screen4']);
      
    }else{
      await new Promise<void>(done => setTimeout(() => done(), 2000));
      this.submitForm();
      await new Promise<void>(done => setTimeout(() => done(), 2000));
      this.router.navigate(['/screen4']);

    }

  }
  // latest_date =  this.datepipe.transform(this.d , 'dd-mm-yyyy')
  public validationMessages = {
    'nomineeaddress': [
      { type: 'required', message: 'Address is required' }
    ],
    'nomineerelationship': [
      { type: 'required', message: 'Relationship with employee is required' },
      { type: 'pattern', message: 'Enter a valid input' }
    ],
    'nomineeage': [
      { type: 'required', message: 'Age is required' },
      { type: 'pattern', message: 'Enter a valid age' },
      { type: 'maxlength', message: 'Invalid age' }
    ],
    'nomineeper': [
      { type: 'required', message: 'Share percentage is required' },
      { type: 'pattern', message: 'Enter a valid number' },
      { type: 'maxlength', message: 'Invalid share' }
    ],
    'nomineename': [
      { type: 'required', message: 'Nominee name is required' },
      { type: 'pattern', message: 'Enter a valid name' },
      { type: 'maxlength', message: 'Name is too long' }
    ],
    'sno': [
      { type: 'required', message: 'Sr no is required' },
      { type: 'pattern', message: 'Enter a valid no' }
    ],
    'witness1': [
      { type: 'required', message: 'Witness 1 is required' },
      { type: 'pattern', message: 'Enter a valid witness name' }
    ],
    'witness2': [
      { type: 'required', message: 'Witness 2 is required' },
      { type: 'pattern', message: 'Enter a valid witness name' }
    ],
    'designation': [
      { type: 'required', message: 'Designation is required' },
      { type: 'pattern', message: 'Enter a valid designation' }
    ],
    'employeeid': [
      { type: 'required', message: 'Employee ID is required' },
      { type: 'pattern', message: 'Enter a valid Employee ID' },
      { type: 'maxlength', message: 'Employee ID should be less than 5 digits' }
    ],
    'employeename': [
      { type: 'required', message: 'Employee name is required' },
      { type: 'pattern', message: 'Enter a valid name' }
    ],
    'nomineeoccupation': [

      { type: 'required', message: 'Occupation is required' },

      { type: 'pattern', message: 'Enter a valid Occupation' }

    ]
  }
  ngOnInit(): void {
  }
  public checked1: boolean;

  public oncheck1(value: boolean) {
    this.checked1 = value;
    console.log(this.checked1);
  }
  public checked2: boolean;

  public oncheck2(value: boolean) {
    this.checked2 = value;
    console.log(this.checked2);
  }
  nomineeForm = this.fb.group({

    sno: ['', [Validators.pattern('0*[1-9][0-9]*'), Validators.required]],
    nomineename: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
    nomineeaddress: ['', [Validators.required]],
    nomineerelationship: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
    nomineeage: ['', [Validators.pattern('[1-9]|[1-9][0-9]'), Validators.required]],
    nomineeper: ['', [Validators.required]],
    witness1: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
    witness2: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
    nomineeoccupation: ['', [Validators.pattern('^[a-zA-Z ]*$'), Validators.required]],
    date: ['', [Validators.required]],
    box: ['', Validators.required],
    box1: ['', Validators.required]
  })
  // nomineeForm = new FormGroup({
  //   name:new FormControl('',
  //   [
  //     Validators.required,
  //     Validators.maxLength(50),
  //     Validators.pattern('^[a-zA-Z ]*$')
  //   ]),
  //   sno:new FormControl('',[Validators.pattern('0*[1-9][0-9]*'),Validators.required]),
  //   nomineename:new FormControl('',[Validators.pattern('^[a-zA-Z ]*$'),Validators.required]),
  //   nomineeaddress:new FormControl('',[Validators.required]),
  //   nomineerelationship:new FormControl('',[Validators.pattern('^[a-zA-Z ]*$'),Validators.required]),
  //   nomineeage:new FormControl('',[Validators.pattern('[1-9]|[1-9][0-9]'),Validators.required]),
  //   nomineeper:new FormControl('',[Validators.required]),
  //   date:new FormControl('',[Validators.required]),
  //   witness1:new FormControl('', [Validators.pattern('^[a-zA-Z ]*$'),Validators.required]),
  //   witness2:new FormControl('',[Validators.pattern('^[a-zA-Z ]*$'),Validators.required]),
  //   nomineeoccupation:new FormControl('',[Validators.pattern('^[a-zA-Z ]*$'),Validators.required])

  // })

  get sno() {
    return this.nomineeForm.get('sno');
  }
  get nomineename() {
    return this.nomineeForm.get('nomineename');
  }
  get nomineeaddress() {
    return this.nomineeForm.get('nomineeaddress');
  }
  get nomineerelationship() {
    return this.nomineeForm.get('nomineerelationship');
  }
  get nomineeage() {
    return this.nomineeForm.get('nomineeage');
  }
  get nomineeper() {
    return this.nomineeForm.get('nomineeper');
  }
  get date() {
    return this.nomineeForm.get('date');
  }
  get witness1() {
    return this.nomineeForm.get('witness1');
  }
  get witness2() {
    return this.nomineeForm.get('witness2');
  }
  get employeename() {
    return this.nomineeForm.get('employeename');
  }
  get employeeid() {
    return this.nomineeForm.get('employeeid');
  }
  get designation() {
    return this.nomineeForm.get('designation');
  }
  get nomineeoccupation() {
    return this.nomineeForm.get('nomineeoccupation');
  }
  get box() {
    return this.nomineeForm.get('box');
  }
  get box1() {
    return this.nomineeForm.get('box1');
  }

  async submitForm() {
    console.log("hurray!");
    console.log(sessionStorage.getItem('emp_id'));


    var formData: any = new FormData();
    // formData.append('sno', this.sno.value);
    formData.append('nomineeFullName', this.nomineename.value);
    formData.append('nomineeFullAddress', this.nomineeaddress.value);
    formData.append('nomineeRelationship', this.nomineerelationship.value);
    formData.append('nomineeAge', parseInt(this.nomineeage.value));
    formData.append('sharePayable', parseInt(this.nomineeper.value));
    // formData.append('date', this.date.value);
    formData.append('witness1', this.witness1.value);
    formData.append('witness2', this.witness2.value);
    formData.append('nomineeOccupation', this.nomineeoccupation.value);

    var object = {};
    formData.forEach(function (value: String, key: string) {
      object[key] = value;

    });

    // http://localhost:8080/nomineecontroller/nominee/saveNomineeDetails
    var combine = {
      // empId: 1,
      empId: sessionStorage.getItem("emp_id"),
      nominees: [object]
    }
    var json = JSON.stringify(combine);
    console.log(json);
    this.http
      .post('http://localhost:8080/hrmsController/nominee/saveNomineeDetails', json, { headers: { 'Content-Type': 'application/json' }, })
      .subscribe({
        //next: (response) => console.log(response),
        next: (response) => this.res = response,
        error: (error) => console.log(error),
      });
    await new Promise<void>(done => setTimeout(() => done(), 1000));
    var x = this.res.status;
    console.log(this.res.status);
    console.log(this.res.empID);
    await new Promise<void>(done => setTimeout(() => done(), 1000));
    if (x === "success")
      alert("Saved Successfully");

    localStorage.setItem('nomineedetails', json);
    sessionStorage.setItem('stage','NOMINEE SAVED')

  }

  // console.log(details.empId);
  // console.log(details.nominees[0].nomineeFullName);


}


