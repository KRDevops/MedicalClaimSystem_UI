import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { ClaimPolicy } from 'src/app/components/claim-policy/claim-policy';
import { policy } from './policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    private http: HttpClient
  ) { }

  validatePolicy(policyNumber: number) {
    return this.http.get(`${environment.apiDomain}/policies/${policyNumber}`);
  }

  claimPolicy(obj: ClaimPolicy) {
    return this.http.post(`${environment.apiDomain}/claims/create`, obj);
  }

  getPolicies(userId: number, type: number, pageNo: number) {
    return this.http.get<policy[]>(`${environment.apiDomain}/claims/approvals/${userId}/${type}/${pageNo}`);
  }
}
