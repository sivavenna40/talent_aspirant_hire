import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 5 }, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  public isOrganizer: boolean = false;
  public isAdmin: boolean = false;
  public isInterviewer: boolean = false;
  public role!: string;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public commonService: CommonService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.role = commonService.getrole();
    console.log(this.role);
    this.checkRole();
  }
  gotologinpage() {
    this.router.navigateByUrl('login');
  }
  logout() {
    this.router.navigateByUrl('login');
    localStorage.clear();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );

  checkRole() {
    if (this.role === 'Admin') {
      this.isAdmin = true;
      this.router.navigate(['/home/interview-result']);
    } else if (this.role === 'Interviewer') {
      this.isInterviewer = true;
      this.router.navigate(['/home/interview-list']);
    } else if (this.role === 'Organizer') {
      this.isOrganizer = true;
      this.router.navigate(['/home/student']);
    } else {
      console.log(this.role, 'role');
    }
  }
}
