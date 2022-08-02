import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeePersonalDataComponent } from './employee-personal-data/employee-personal-data.component';
import { ReferencesComponent } from './references/references.component';
import { GeneralNominationsComponent } from './general-nominations/general-nominations.component';
import { MedicalComponent } from './medical-insurance/medical.component';
import { AppComponent4 } from './screen4/app.component'
import { ChecklistComponent } from './screen5/checklist.component'

const routes: Routes = [
  { path: '', component: EmployeePersonalDataComponent },
  { path: 'references', component: ReferencesComponent },
  { path: 'general-nomination', component: GeneralNominationsComponent },
  { path: 'medical-insurance', component: MedicalComponent },
  { path: 'screen4', component: AppComponent4 },
  { path: 'screen5', component: ChecklistComponent },

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
