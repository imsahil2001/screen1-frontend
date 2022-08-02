import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { FileuploadService } from './fileupload.service';
import { Request } from './request.component';
import { Response } from './response.component';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent4 implements OnInit {
  file: File = null;
  base: string;
  emp: string;
  requestPayLoad: any = {};
  requestPayLoad2: Request = { emp_id: sessionStorage.getItem("emp_id") };

  base64Output: string;

  getPdfdetails: Response = {

    emp_id: "",
    status: "",
    pfDoc: ""

  }

  savedownloadpdf: Response = {

    emp_id: "",
    status: "",
    pfDoc: ""

  }

  //   constructor(private fileUploadService: FileuploadService, public http: HttpClient, private apiService: ApicallService) { }
  //   ngOnInit(): void {

  //   }

  //  user: any = {};

  //   createUser(){
  //     this.apiService.createUsers(this.user).subscribe((res)=>{
  //     });
  //   }

  constructor(private fileUploadService: FileuploadService, private route: Router) { }
  ngOnInit(): void {
  }
  title = 'pf_forms';


  name: string = "";

  type: String = "";

  size: number = 0;

  modifiedDate: String = "";
  downloadbutton: boolean = false;
  removebutton: boolean = true;


  // On file Select file from computer
  onChange(event) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
    });
    for (var i = 0; i < event.target.files.length; i++) {

      this.name = event.target.files[i].name;

      this.type = event.target.files[i].type;

      this.size = Math.round(event.target.files[i].size / 1024);

      this.modifiedDate = event.target.files[i].lastModifiedDate;



      console.log('Name: ' + this.name + "\n" +

        'Type: ' + this.type + "\n" +

        'Last-Modified-Date: ' + this.modifiedDate + "\n" +

        'Size: ' + Math.round(this.size / 1024) + " KB");

    }
  }
  //convert file into base 64 string
  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  //sending entity empid and base 64 string to backend
  onUpload() {
    this.downloadbutton = true;
    this.removebutton = false;

    console.log(this.file);
    this.requestPayLoad = {
      empId: sessionStorage.getItem("emp_id"),
      pfDoc: this.base64Output
    }
    console.log(this.requestPayLoad);
    this.fileUploadService.savePdfDetails(
      this.requestPayLoad
    );

    window.alert("File has been uploaded")

  }
  onPreview() {
    const source = `data:application/pdf;base64,${this.base64Output}`;
    const link = document.createElement("a");
    link.href = source;
    var win = window.open();
    win.document.write('<iframe src="' + link.href + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }






  //download pdf file by converting base64 string to pdf
  downloadPdf(base64String, fileName) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}`
    link.click();
  }

  public onClickDownloadPdf() {

    console.log(this.requestPayLoad2);


    this.fileUploadService.savedownloadpdf(this.requestPayLoad2).subscribe(async (data: Response) => {
      console.log(data);
      this.savedownloadpdf.emp_id = data.emp_id;
      this.savedownloadpdf.status = data.status;
      this.savedownloadpdf.pfDoc = data.pfDoc;
      console.log(this.savedownloadpdf.pfDoc);

      this.base = this.savedownloadpdf.pfDoc;
      this.emp = this.savedownloadpdf.emp_id + "_PfForm";
      await this.downloadPdf(this.base, this.emp);

    })

  }

  saveandcontinue(){
    console.log('hi');
    this.route.navigate(['/screen5']);
  }
}
