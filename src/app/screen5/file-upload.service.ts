import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class FileUploadService {
	
// API url
baseApiUrl = "http://localhost:8080/hrmsController/docs/saveUploadedDocList";
  savePdfDetails: any;
downloadUrl="http://localhost:8080/hrmsController/docs/download";


	
constructor(private http:HttpClient) { }

// Returns an observable
upload(file:any ,empId:any,docType:any):Observable<any> {

	// Create form data
	const formData = new FormData();
	formData.append('file',file,file.name);
	formData.append('empId', empId.toString());
	formData.append('docType',docType.toString() );
	//const options = file?
   //{ params: new HttpParams().set('file', formData.getAll('file').toString()),
     //params1: new HttpParams().set('empId', empId), 
	 //params2: new HttpParams().set('docType', docType)} : {};

	 return this.http.post(this.baseApiUrl,formData,{responseType: 'blob'})
}
download( empId:String,docType:any){

	// Create form data
	const formData = new FormData();
		
	// Store form name as "file" with file data
	formData.append('empId', empId.toString());
	formData.append('docType',docType.toString() );
	
	var data={'epmId':empId,'docType':docType};
	// Make http post request over api
	// with formData as req
	return this.http.get(this.downloadUrl, {
		params: {
			downloadUploadedDocRequest: encodeURIComponent(JSON.stringify(data))
		}
	  })

	
	
}



  getPdfDetails(emp_id: String,docType:String): Observable<Request> {

    let obj = {
      "empId": emp_id,
	  "docType":docType
    }
        return this.http.post<Request>(`${this.downloadUrl}`, obj);
  }
  savedownloadpdf(empId:string,docType:String) {

	//     let headers = new Header,s();
	// headers.append('Content-Type', 'application/json');
	// headers.append('projectid', this.id);
	
	 const requestOptions = { headers: new HttpHeaders({ 'content-type': "application/json" }) };
		let params = new HttpParams().set("empId", empId.toString())
									 .set("docType",docType.toString());
		  // this.http
		  // .post<any>(this.getpdfbaseurl, str, requestOptions)
		  // .subscribe((response: any) => {
		  //   console.log(response.emp_id);
		  // });
	
		return this.http
		  .get<Response>(this.downloadUrl+"/"+empId+"/"+docType)
		}

}