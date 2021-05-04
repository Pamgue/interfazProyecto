import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DasbhoardComponent } from './dasbhoard/dasbhoard.component';
import { ExpansionComponent } from './dashboard/expansion/expansion.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';

import { GroupsService } from './services/groups.service';
import { LabelsService } from './services/labels.service';
import { ProblemsService } from './services/problems.service';
import { StudentProfileService } from './services/student-profile.service';
import { StudentsService } from './services/students.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DasbhoardComponent,
    ExpansionComponent
  ],
  providers: [
    NgbActiveModal,
    GroupsService,
    LabelsService,
    ProblemsService,
    StudentProfileService,
    StudentsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
