import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.pharma{
   export class Medicine {
      manufacturer: Manufacturer;
      Name: string;
   }
   export class MedicineDetails {
      Price: number;
      ManufacturingDate: Date;
      ExpiryDate: Date;
   }
   export enum OrderStatus {
      PLACED,
      SCHEDULED_FOR_MANUFACTURE,
      DELIVERED,
   }
   export class License extends Asset {
      licenseId: string;
      issueDate: Date;
      expiryDate: Date;
      regulator: Regulator;
      manufacturer: Manufacturer;
   }
   export class Order extends Asset {
      orderId: string;
      orderStatus: OrderStatus;
      medicine: Medicine;
      medicineDetails: MedicineDetails;
      owner: MedicalStore;
   }
   export class Regulator extends Participant {
      regulatorId: string;
      regulatorName: string;
   }
   export class Manufacturer extends Participant {
      manufacturerId: string;
      manufacturerName: string;
   }
   export class MedicalStore extends Participant {
      medicalStoreId: string;
      medicalStoreName: string;
   }
   export class IssueLicense extends Transaction {
      licenseId: string;
      issueDate: Date;
      expiryDate: Date;
      regulator: Regulator;
      manufacturer: Manufacturer;
   }
   export class PlaceOrder extends Transaction {
      orderId: string;
      medicine: Medicine;
      owner: MedicalStore;
   }
   export class UpdateOrderStatus extends Transaction {
      orderStatus: OrderStatus;
      medicineDetails: MedicineDetails;
      order: Order;
   }
// }
