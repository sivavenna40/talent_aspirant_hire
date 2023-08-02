import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrganizerFormComponent } from './admin_module/organisation/organizer-form/organizer-form.component';
import { OrganizerViewComponent } from './admin_module/organisation/organizer-view/organizer-view.component';
import { InterviewSkillComponent } from './interview_module/interview-skill/interview-skill.component';
import { DashboardComponent } from './admin_module/dashboard/dashboard.component';
import { InterviewerViewComponent } from './admin_module/interviewer/interviewer-view/interviewer-view.component';
import { InterviewerFormComponent } from './admin_module/interviewer/interviewer-form/interviewer-form.component';
import { OrganisationFormComponent } from './admin_module/organisation/organisation-form/organisation-form.component';
import { OrganisationViewComponent } from './admin_module/organisation/organisation-view/organisation-view.component';
import { StudentViewComponent } from './interview_module/student/student-view/student-view.component';
import { InterviewReportComponent } from './interview_module/interview-report/interview-report.component';
import { RestDataSource } from './service/restdataSource';
import { InterviewSkillFormComponent } from './interview_module/interview-skill-form/interview-skill-form.component';
import { InterviewScheduleViewComponent } from './admin_module/schedule/interview-schedule-view/interview-schedule-view.component';
import { InterviewScheduleFormComponent } from './admin_module/schedule/interview-schedule-form/interview-schedule-form.component';
import { DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { StudentFormComponent } from './interview_module/student/student-form/student-form.component';
import { InterviewerSkillFormComponent } from './admin_module/interviewer/interviewer-skill-form/interviewer-skill-form.component';
import { InterviewerSkillViewComponent } from './admin_module/interviewer/interviewer-skill-view/interviewer-skill-view.component';
import { IntrviewHomeComponent } from './interview_module/intrview-home/intrview-home.component';
import { InterviewListComponent } from './interview_module/interview-list/interview-list.component';
import { InterviewPanelComponent } from './interview_module/interview-panel/interview-panel.component';
import { StudentFullViewComponent } from './interview_module/student/student-full-view/student-full-view.component';
import { InterviewResultComponent } from './interview_module/interview-result/interview-result.component';
import { FeedbackDetailComponent } from './interview_module/feedback-detail/feedback-detail.component';
import { FeedbackUpdateComponent } from './interview_module/feedback-update/feedback-update.component';
import { TokenInterceptor } from './service/corenutsintercepter/intercepter';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InterviewerViewComponent,
    InterviewerFormComponent,
    OrganisationFormComponent,
    OrganisationViewComponent,
    StudentViewComponent,
    InterviewReportComponent,
    InterviewSkillComponent,
    OrganizerViewComponent,
    OrganizerFormComponent,
    InterviewSkillFormComponent,
    InterviewScheduleViewComponent,
    InterviewScheduleFormComponent,
    StudentFormComponent,
    InterviewerSkillViewComponent,
    InterviewerSkillFormComponent,
    IntrviewHomeComponent,
    InterviewListComponent,
    InterviewPanelComponent,
    StudentFullViewComponent,
    InterviewResultComponent,
    FeedbackDetailComponent,
    FeedbackUpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    ToastModule,
  ],
  providers: [
    RestDataSource,

    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
