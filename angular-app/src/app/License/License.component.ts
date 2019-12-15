/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LicenseService } from './License.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-license',
  templateUrl: './License.component.html',
  styleUrls: ['./License.component.css'],
  providers: [LicenseService]
})
export class LicenseComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  licenseId = new FormControl('', Validators.required);
  issueDate = new FormControl('', Validators.required);
  expiryDate = new FormControl('', Validators.required);
  regulator = new FormControl('', Validators.required);
  manufacturer = new FormControl('', Validators.required);

  constructor(public serviceLicense: LicenseService, fb: FormBuilder) {
    this.myForm = fb.group({
      licenseId: this.licenseId,
      issueDate: this.issueDate,
      expiryDate: this.expiryDate,
      regulator: this.regulator,
      manufacturer: this.manufacturer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLicense.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.pharma.License',
      'licenseId': this.licenseId.value,
      'issueDate': this.issueDate.value,
      'expiryDate': this.expiryDate.value,
      'regulator': this.regulator.value,
      'manufacturer': this.manufacturer.value
    };

    this.myForm.setValue({
      'licenseId': null,
      'issueDate': null,
      'expiryDate': null,
      'regulator': null,
      'manufacturer': null
    });

    return this.serviceLicense.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'licenseId': null,
        'issueDate': null,
        'expiryDate': null,
        'regulator': null,
        'manufacturer': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.pharma.License',
      'issueDate': this.issueDate.value,
      'expiryDate': this.expiryDate.value,
      'regulator': this.regulator.value,
      'manufacturer': this.manufacturer.value
    };

    return this.serviceLicense.updateAsset(form.get('licenseId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceLicense.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceLicense.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'licenseId': null,
        'issueDate': null,
        'expiryDate': null,
        'regulator': null,
        'manufacturer': null
      };

      if (result.licenseId) {
        formObject.licenseId = result.licenseId;
      } else {
        formObject.licenseId = null;
      }

      if (result.issueDate) {
        formObject.issueDate = result.issueDate;
      } else {
        formObject.issueDate = null;
      }

      if (result.expiryDate) {
        formObject.expiryDate = result.expiryDate;
      } else {
        formObject.expiryDate = null;
      }

      if (result.regulator) {
        formObject.regulator = result.regulator;
      } else {
        formObject.regulator = null;
      }

      if (result.manufacturer) {
        formObject.manufacturer = result.manufacturer;
      } else {
        formObject.manufacturer = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'licenseId': null,
      'issueDate': null,
      'expiryDate': null,
      'regulator': null,
      'manufacturer': null
      });
  }

}
