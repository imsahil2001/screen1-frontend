import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reference } from './reference';
import { ReferenceService } from './reference.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css'],
})
export class ReferencesComponent implements OnInit {
  public storage: any;
  public id: any;
  public references: Reference[] = [
    {
      name: '',
      designation: '',
      company: '',
      email: '',
      phno: '',
      name2: '',
      designation2: '',
      company2: '',
      email2: '',
      phno2: '',
    },
  ];

  constructor(
    private referenceService: ReferenceService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getReferences();
    // this.id = sessionStorage.getItem();
  }

   emp_id =Number(sessionStorage.getItem("emp_id"));
  public getReferences(): void {
    // this.referenceService.getReferences(this.id).subscribe(
    this.referenceService.getReferences(this.emp_id).subscribe(
      (response: any) => {
        this.references[0].name = response.references[0].name;
        this.references[0].designation = response.references[0].designation;
        this.references[0].company = response.references[0].company;
        this.references[0].email = response.references[0].emailid;
        this.references[0].phno = response.references[0].phno;
        this.references[0].name2 = response.references[1].name;
        this.references[0].designation2 = response.references[1].designation;
        this.references[0].company2 = response.references[1].company;
        this.references[0].email2 = response.references[1].emailid;
        this.references[0].phno2 = response.references[1].phno;

        console.log(this.references[0]);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddReference(refForm: any, id: any): void {
    console.log(id);
    this.referenceService.addReferences(refForm.value).subscribe(
      (response: Reference) => {
        this.getReferences();
        if (id == "route") {
          this.gotoNominee();
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        refForm.reset();
      }
    );
  }

  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phno: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    designation: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    company: new FormControl('', [Validators.required]),
    name2: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email2: new FormControl('', [
      Validators.email,
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phno2: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    designation2: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    company2: new FormControl('', [Validators.required]),
  });
  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phno() {
    return this.contactForm.get('phno');
  }
  get designation() {
    return this.contactForm.get('designation');
  }
  get company() {
    return this.contactForm.get('company');
  }

  get name2() {
    return this.contactForm.get('name2');
  }
  get email2() {
    return this.contactForm.get('email2');
  }
  get phno2() {
    return this.contactForm.get('phno2');
  }
  get designation2() {
    return this.contactForm.get('designation2');
  }
  get company2() {
    return this.contactForm.get('company2');
  }

  gotoNominee() {
    window.alert("References have been saved")
    this.router.navigate(['/general-nomination']);
    sessionStorage.setItem("stage","REFERENCES SAVED");
  }
  gotoHome() {
    this.router.navigate(['/home']);
  }
}
