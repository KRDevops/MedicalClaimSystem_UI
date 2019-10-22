import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService } from 'primeng/components/common/messageservice';
import { PolicyService } from 'src/app/services/policy/policy.service';

@Component({
  selector: 'app-claim-policy',
  templateUrl: './claim-policy.component.html',
  styleUrls: ['./claim-policy.component.scss'],
  providers: [MessageService],
  // encapsulation: ViewEncapsulation.Emulated
})
export class ClaimPolicyComponent implements OnInit {

  claimPolicyForm: FormGroup;
  validatePolicyForm: FormGroup;
  validatePolicy: boolean;
  claimPolicy: boolean;

  items: MenuItem[];
  activeIndex: number;
  claimPolicySubmitted: boolean;
  validatePolicySubmitted: boolean;
  validatedPolicy: any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private policyService: PolicyService
  ) {
    this.activeIndex = 0;
    this.validatePolicy = true;
    this.claimPolicy = false;

    this.claimPolicySubmitted = false;
    this.validatePolicySubmitted = false;

    this.validatedPolicy = {
      policyName: '',
      availableAmount: '',
      entitledAmount: ''
    };
  }

  ngOnInit() {

    this.items = [
      {
        label: 'Your Policy',
        command: (event: any) => {
          // this.activeIndex = 1;
          // this.validatePolicy = true;
          // this.claimPolicy = false;
          // this.messageService.add({ severity: 'info', summary: 'First Step', detail: event.item.label });
        }
      },
      {
        label: 'Claim Details',
        command: (event: any) => {
          // this.activeIndex = 1;
          // this.validatePolicy = false;
          // this.claimPolicy = true;
          // this.messageService.add({ severity: 'error', summary: 'Second Step', detail: event.item.label });
        }
      }
    ];

    this.validatePolicyForm = this.fb.group({
      policyNumber: ['', Validators.required]
    });

    this.claimPolicyForm = this.fb.group({
      diagnosis: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      hospitalId: ['', Validators.required],
      documents: ['', Validators.required],
      claimAmount: ['', Validators.required],
      policyNumber: ['', Validators.required],
      natureOfAilment: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  get v() {
    return this.validatePolicyForm.controls;
  }

  get f() {
    return this.claimPolicyForm.controls;
  }

  onUpload = (event) => {
    const file = (event.target as HTMLInputElement).files[0];
    this.claimPolicyForm.patchValue({
      documents: file
    });

    this.claimPolicyForm.get('documents').updateValueAndValidity();
  }

  onValidatePolicy = () => {
    // this.activeIndex = 1;
    this.validatePolicySubmitted = true;
    if (this.validatePolicyForm.invalid) {
      return;
    }

    // this.validatePolicy = false;
    // this.claimPolicy = true;

    this.policyService.validatePolicy(this.validatePolicyForm.value.policyNumber).subscribe(res => {
      this.activeIndex = 1;
      this.validatePolicy = false;
      this.claimPolicy = true;
      this.validatedPolicy = res;
    });
  }

  onClaimPolicy = () => {
    this.claimPolicySubmitted = true;
    if (this.claimPolicyForm.invalid) {
      return;
    }

    let formData: any = new FormData();
    for (const key in this.validatePolicyForm.value) {
      formData.append(key, this.validatePolicyForm.value[key]);
    }
    formData.append('userId', this.validatedPolicy.userId);

    console.log(this.validatePolicyForm.value);
    console.log(formData);

    this.policyService.validatePolicy(formData).subscribe(res => {
      this.activeIndex = 0;
      this.claimPolicy = false;
      this.validatePolicy = true;
      this.claimPolicyForm.reset();
      let r: any = res;
      this.messageService.add({ severity: 'info', summary: 'Message', detail: r.message });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Message', detail: err.error.message });
    });
  }

}
