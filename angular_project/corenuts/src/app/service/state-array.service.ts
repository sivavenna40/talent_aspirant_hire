import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateArrayService {
  private interviewStages: string[] = [
    'All',
    'Selected',
    'Rejected',
    'On Hold',
    'In Progress',
    'Not Attended',
  ];
  private states: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
  constructor() {}

  getStates() {
    return this.states;
  }

  getInterviewStages() {
    return this.interviewStages;
  }
}
