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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { LicenseComponent } from './License/License.component';
import { OrderComponent } from './Order/Order.component';

import { RegulatorComponent } from './Regulator/Regulator.component';
import { ManufacturerComponent } from './Manufacturer/Manufacturer.component';
import { MedicalStoreComponent } from './MedicalStore/MedicalStore.component';

import { IssueLicenseComponent } from './IssueLicense/IssueLicense.component';
import { PlaceOrderComponent } from './PlaceOrder/PlaceOrder.component';
import { UpdateOrderStatusComponent } from './UpdateOrderStatus/UpdateOrderStatus.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'License', component: LicenseComponent },
  { path: 'Order', component: OrderComponent },
  { path: 'Regulator', component: RegulatorComponent },
  { path: 'Manufacturer', component: ManufacturerComponent },
  { path: 'MedicalStore', component: MedicalStoreComponent },
  { path: 'IssueLicense', component: IssueLicenseComponent },
  { path: 'PlaceOrder', component: PlaceOrderComponent },
  { path: 'UpdateOrderStatus', component: UpdateOrderStatusComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
