/**
 * PlaceOrder is initiated by store
 * @param {org.example.pharma.PlaceOrder} tx
 * @transaction
 */
async function placeorder(tx){

  const factory = getFactory();
  const namespace = 'org.example.pharma';

  const order = factory.newResource(namespace, 'Order', tx.orderId);

  order.medicine = tx.medicine;
  order.orderStatus = "PLACED";
  order.Store = factory.newRelationship(namespace, 'MedicalStore', tx.Store.getIdentifier());
  order.LicenseIssuer = factory.newRelationship(namespace, 'Regulator', tx.LicenseIssuer.getIdentifier());
  order.Manufacturer = factory.newRelationship(namespace, 'Manufacturer', tx.Manufacturer.getIdentifier());
  // save the order
  order.Company = factory.newRelationship(namespace, 'ShippingCompany', tx.Company.getIdentifier());
  // save the order
  const assetRegistry = await getAssetRegistry(order.getFullyQualifiedType());
  await assetRegistry.add(order);
}

/**
* UpdateOrderStatus of the Order
* @param {org.example.pharma.UpdateOrderStatus} tx
* @transaction
*/
async function updateOrder(tx){

  const namespace = 'org.example.pharma';
  const order = tx.order;

  order.orderStatus = tx.orderStatus;
  order.medicineDetails = tx.medicineDetails;
  const assetRegistry = await getAssetRegistry(namespace + '.Order');
  await assetRegistry.update(order);
}

/**
* Issue license  by the regulator
* @param {org.example.pharma.IssueLicense} tx
* @transaction
*/
async function issueLicense(tx){

  const factory = getFactory();
  const namespace = 'org.example.pharma';

  const license = factory.newResource(namespace, 'License', tx.licenseId);

  license.licenseId = tx.licenseId;
  license.issueDate = tx.issueDate;
  license.expiryDate = tx.expiryDate;

  license.LicenseIssuer = factory.newRelationship(namespace, 'Regulator', tx.LicenseIssuer.getIdentifier());
  license.Manufacturer = factory.newRelationship(namespace, 'Manufacturer', tx.Manufacturer.getIdentifier());
  
  // save the order
  const licenseRegistry = await getAssetRegistry(license.getFullyQualifiedType());
  await licenseRegistry.add(license);
}

/**
* UpdateShipmentStatus of the Order
* @param {org.example.pharma.UpdateShipmentStatus} tx
* @transaction
*/
async function updateShipmentStatus(tx){

  const namespace = 'org.example.pharma';
  const order = tx.order;
    
  order.shipmentStatus = tx.shipmentStatus;
  if(order.shipmentStatus == "SHIPPED"){
      order.ShipmentShipped = tx.time
  }

  if(order.shipmentStatus == "ARRIVED"){
      order.ShipmentArrived = tx.time
  }
  
  if(order.shipmentStatus == "ONWAY"){
      order.ShipmentOnWay = tx.time
  }
  
  if(order.shipmentStatus == "DELIVERED"){
      order.ShipmentDelivered = tx.time
  }

  const assetRegistry = await getAssetRegistry(namespace + '.Order');
  await assetRegistry.update(order);
}
