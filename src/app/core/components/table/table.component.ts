import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() datas: any = [];
  @Input() columns: any = [];
  @Input('required-fields') requiredFields: any = [];
  @Input('custom-class') customClass: string = 'table table-bordered table-hover table-striped';

  rows: Array<any>;

  objectKeys = Object.keys;

  constructor() {
  }

  ngOnInit() {
    this.datas = [
      {
        claimId: 1,
        claimStatus: 'string',
        diagnosis: 'string',
        claimDate: 'Date',
        admissionDate: 'Date',
        dischargeDate: 'Date',
        hospitalName: 'Date',
        documents: 'any',
        claimAmount: 1000,
        policyNumber: 11,
        deviationPercent: 10,
        remarks: 'string',
        userId: 1
      },
      {
        claimId: 2,
        claimStatus: 'string',
        diagnosis: 'string',
        claimDate: 'Date',
        admissionDate: 'Date',
        dischargeDate: 'Date',
        hospitalName: 'Date',
        documents: 'any',
        claimAmount: 1000,
        policyNumber: 11,
        deviationPercent: 10,
        remarks: 'string',
        userId: 1
      },
    ];

    let columns = [];
    let rows = [];
    if (this.datas.length) {
      if (typeof this.datas[0] === 'object') {

        if (!this.requiredFields.length) {
          for (const key in this.datas[0]) {
            if (this.datas[0].hasOwnProperty(key)) {
              columns.push(key);
            }
          }
        } else {
          console.log(this.requiredFields.length);
          for (const key in this.datas[0]) {
            if (this.datas[0].hasOwnProperty(key) && this.requiredFields.indexOf(key) !== -1) {
              columns.push(key);
            }
          }
        }

        this.datas.forEach((v, i, arr) => {
          rows[i] = [];
          for (const key in v) {
            if (v.hasOwnProperty(key) && columns.indexOf(key) !== -1) {
              rows[i].push(v[key]);
            }
          }
        });

      } else {

        if (!this.requiredFields.length) {
          for (const key in this.datas) {
            if (this.datas.hasOwnProperty(key)) {
              columns.push(key);
            }
          }
        } else {
          for (const key in this.datas[0]) {
            if (this.datas[0].hasOwnProperty(key) && this.requiredFields.indexOf(key) !== -1) {
              columns.push(key);
            }
          }
        }

        this.datas.forEach((v, i, arr) => {
          rows[i] = [];
          for (const key in v) {
            if (v.hasOwnProperty(key) && columns.indexOf(key) !== -1) {
              rows[i].push(v[key]);
            }
          }
        });
      }
    }

    columns.forEach((v, i) => {
      let result = v.replace(/([A-Z])/g, " $1");
      columns[i] = result.charAt(0).toUpperCase() + result.slice(1);
    });

    this.columns = columns;
    this.rows = rows;
  }

}
