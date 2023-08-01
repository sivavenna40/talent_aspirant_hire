import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin_module/dashboard/dashboard.component';
import { OrganisationViewComponent } from './admin_module/organisation/organisation-view/organisation-view.component';
import { InterviewerViewComponent } from './admin_module/interviewer/interviewer-view/interviewer-view.component';
import { StudentViewComponent } from './interview_module/student/student-view/student-view.component';
import { InterviewReportComponent } from './interview_module/interview-report/interview-report.component';
import { InterviewSkillComponent } from './interview_module/interview-skill/interview-skill.component';
import { InterviewScheduleViewComponent } from './admin_module/schedule/interview-schedule-view/interview-schedule-view.component';
import { OrganizerViewComponent } from './admin_module/organisation/organizer-view/organizer-view.component';
import { InterviewerSkillViewComponent } from './admin_module/interviewer/interviewer-skill-view/interviewer-skill-view.component';
import { InterviewListComponent } from './interview_module/interview-list/interview-list.component';
import { InterviewPanelComponent } from './interview_module/interview-panel/interview-panel.component';
import { StudentFullViewComponent } from './interview_module/student/student-full-view/student-full-view.component';
import { InterviewResultComponent } from './interview_module/interview-result/interview-result.component';
import { FeedbackDetailComponent } from './interview_module/feedback-detail/feedback-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  

  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: 'interviewer',
        component: InterviewerViewComponent,
      },
      {
        path: 'organisation',
        component: OrganisationViewComponent,
      },
      {
        path: 'organizer',
        component: OrganizerViewComponent,
      },
      {
        path: 'student',
        component: StudentViewComponent,
      },
      {
        path: 'interview',
        component: InterviewReportComponent,
      },
      {
        path: 'interview-skill',
        component: InterviewSkillComponent,
      },
      {
        path: 'interviewer-skill',
        component: InterviewerSkillViewComponent,
      },
      {
        path: 'schedule',
        component: InterviewScheduleViewComponent,
      },
      // {
      //   path: '',
      //   redirectTo: 'schedule',
      //   pathMatch: 'full',
      // },
      {
        path: 'interview-list',
        component: InterviewListComponent,
      },
      {
        path: 'interview-result',
        component: InterviewResultComponent,
      },
      {
        path: 'feedback-detail/:studentId',
        component: FeedbackDetailComponent,
      },
      {
        path: 'interview-panel/:studentId',
        component: InterviewPanelComponent,
      },
      {
        path: 'interview/:studentId',
        component: InterviewPanelComponent,
      },
      {
        path: 'student-full-view',
        component: StudentFullViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
