import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeePersonalDataComponent } from './employee-personal-data/employee-personal-data.component';
import { ReferencesComponent } from './references/references.component';
import { GeneralNominationsComponent } from './general-nominations/general-nominations.component';
import { MedicalComponent } from './medical-insurance/medical.component';
import { AppComponent4 } from './screen4/app.component';
import { ChecklistComponent } from './screen5/checklist.component';
import { InputTypeComponent } from './employee-personal-data/input-type.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeePersonalDataComponent,
    ReferencesComponent,
    GeneralNominationsComponent,
    MedicalComponent,
    AppComponent4,
    ChecklistComponent,
    InputTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
