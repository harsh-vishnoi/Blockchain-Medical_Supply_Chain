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
    order.owner = factory.newRelationship(namespace, 'MedicalStore', tx.owner.getIdentifier());
    
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
    const assetRegistry = await getAssetRegistry(namespace + '.Order');
    await assetRegistry.update(order);
}