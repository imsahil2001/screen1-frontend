import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmployeePersonalDataComponent } from './employee-personal-data/employee-personal-data.component';
import { HttpClientModule } from '@angular/common/http';
import { InputTypeComponent } from './employee-personal-data/input-type.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeePersonalDataComponent,
    InputTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
