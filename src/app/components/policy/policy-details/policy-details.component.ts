import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { UserService } from 'src/app/services/user/user.service';
import { policy } from 'src/app/services/policy/policy';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {

  userId: number;
  userType: string;
  tabIndex: number;
  pagination: Array<any>;
  paginationActive: number;

  datas: policy[];
  constructor(
    private policyService: PolicyService,
    private userService: UserService
  ) {
    this.tabIndex = 0;
    this.datas = [];
    this.pagination = [];
    this.paginationActive = 0;
  }

  ngOnInit() {
    this.userId = this.userService.isUserLoggedIn.value.userId;
    this.userType = 'aprrover';
    this.policyService.getPolicies(this.userId, this.tabIndex, 0).subscribe(res => {
      let r: any = res;
      this.datas = r;
      this.pagination = this.generatePagination(r.count, 5);
    });
  }

  getPolicies = (pageNo: number) => {
    this.policyService.getPolicies(this.userId, this.tabIndex, pageNo).subscribe(res => {
      this.datas = res;
    });
  }

  /**
   * Calulate of Pagination and return
   * @param count number
   * @param perPage number
   */
  generatePagination = (count: number, perPage: number) => {
    if ((count / perPage)) {
      return Array(Math.ceil(count / perPage)).fill(0).map((x, i) => ({ id: i + 1 }));
    }
    return [];
  }

  /**
   * Pagination Callback
   */
  onTabChange = (event: any) => {
    this.tabIndex = event.index;
    this.getPolicies(0);
  }

  /**
   * Pagination Callback
   * @param pageNo number
   */
  onPagination = (pageNo: number) => {
    this.getPolicies(pageNo);
  }

}
