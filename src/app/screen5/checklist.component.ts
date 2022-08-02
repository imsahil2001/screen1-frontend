// import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from './file-upload.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
// import * as FileSaver from 'file-saver';
import { Router } from '@angular/router'

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  base64: Observable<string>;



  constructor(private fileUploadService: FileUploadService, private route: Router) { }

  ngOnInit(): void {
  }
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any; // Variable to store file
  work_proof: boolean = false;
  last6: boolean = false;
  form16: boolean = false;
  relieving_letter: boolean = false;
  offer_letter_current_organization: boolean = false;
  salary_proof: boolean = false;
  qualification: boolean = false;
  any_id: boolean = false;
  document_type: string = "";
  // emp_id:any="123";
  emp_id: any = sessionStorage.getItem("emp_id");
  pipe = new DatePipe('en-US');
  updatedDate = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  a: any;
  base64Output: any;

  docList = [
    { "name": "fake", "type": "fake", "size": 0, "updatedDate": this.updatedDate, "docType": this.document_type }
  ];

  addDocument(a: any) {
    this.docList.push(a);
    console.log(this.docList);
  }
  onSelect(value: string) {
    this.document_type = value;
  }
  onWorkProof() {
    this.work_proof = !this.work_proof;
    console.log(this.work_proof);
  }
  onLast6() {
    this.last6 = !this.last6;
  }
  onform16() {
    this.form16 = !this.form16;
  }
  onRelievingLetter() {
    this.relieving_letter = !this.onRelievingLetter;
  }
  onOfferLetterCurrentOrganization() {
    this.offer_letter_current_organization = !this.offer_letter_current_organization;
  }
  onSalaryProof() {
    this.salary_proof = !this.salary_proof;
  }
  onQualification() {
    this.qualification = !this.qualification;
  }
  onAnyId() {
    this.any_id = !this.any_id;
  }
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload

  getFileDetails(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      var name = event.target.files[i].name;
      var type = event.target.files[i].type;
      var size = event.target.files[i].size;
      var modifiedDate = event.target.files[i].lastModifiedDate;
      this.file = event.target.files[0];
      this.convertFile(event.target.files[0]).subscribe(base64 => {
        this.base64Output = base64;
      });
      console.log('Name: ' + name + "\n" +
        'Type: ' + type + "\n" +
        'Last-Modified-Date: ' + modifiedDate + "\n" +
        'Size: ' + Math.round(size / 1024) + " KB");
    }
    var a = { "name": name, "type": type, "size": Math.round(size / 1024) + " KB", "updatedDate": this.updatedDate, "docType": this.document_type, "base64": this.base64Output, "emp_id": this.emp_id, "file": this.file };
    this.a = a;

  }
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  onUpload() {
    if (this.a != null && ((this.document_type != ""))) {
      this.loading = !this.loading;
      console.log(this.file);
      //this.base64=this.convertFile(this.file);
      this.fileUploadService.upload(this.file, this.emp_id, this.document_type).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {

            // Short link via api response
            this.shortLink = event.link;

            this.loading = false; // Flag variable 
          }
        }
      );


      this.addDocument(this.a);
    }
    else {
      alert("please select a document and document type")
    }

  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  onDownloadpdf(f: any, name: String, base64String) {
    // const source = "data:application/pdf;base64" + base64String;
    // //f.file.replace(source)
    // const blob = new Blob([f]);
    // const url = window.URL.createObjectURL(blob);
    // //var FileSaver=require('file-saver')
    // FileSaver.saveAs(blob, name.toString());
    // //window.open(url);
    // console.log();

  }

  downloadPdf(base64String, fileName) {
    const source = 'data:application/pdf;base64' + base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = fileName;
    link.click();
  }

  public onDownload(docType: String) {


    this.fileUploadService.savedownloadpdf(this.emp_id, this.document_type).subscribe(async (data: Response) => {
      console.log(data);
      var a = this.docList;
      var base64: String;
      var file_1: File;
      for (let i = 0; i < a.length; i++) {
        if (i['emp_id'] == this.emp_id && i["docType"] == docType) {
          console.log("file found")
          base64 = i["base64"];
          this.base64 = i["base64"];
          file_1 = i["file"];
          console.log(file_1.type)
        }
      }
      //this.downloadPdf(base64, docType+"_"+this.emp_id+".pdf");
      this.onDownloadpdf(file_1, docType + "_" + this.emp_id + ".pdf", base64);
    })

  }


  saveandcontinue() {

    sessionStorage.setItem("stage", 'DOCUMENTS UPLOAD');
    this.route.navigate(['/medical-insurance']);
  }
}

