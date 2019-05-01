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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Track the trade of a commodity from one trader to another
 * @param {org.usac.tienda.Recargar} recargar - the trade to be processed
 * @transaction
 */
async function tradeRecargar(recargar) {

    recargar.usuario.saldo += recargar.dinero;
    return getParticipantRegistry('org.usac.tienda.Usuario')
  		.then(function(registroUsuarios){
  			return registroUsuarios.update(recargar.usuario);
  		})
}


/**
 * Track the trade of a commodity from one trader to another
 * @param {org.usac.tienda.Reabastecer} reabastecer - the trade to be processed
 * @transaction
 */
async function Reabastecer(reabastecer) {
    reabastecer.producto.cantidad += reabastecer.cantidad;
    let assetRegistry = await getAssetRegistry('org.usac.tienda.Producto');
    await assetRegistry.update(reabastecer.producto);
}

/**
 * Sample transaction
 * @param {org.usac.tienda.Pago} pago2 - the trade to be processed
 * @transaction
 */
async function Pago(pago2) {
	

	if(pago2.usuario.saldo<=0){
	}else if(pago2.producto.cantidad<=0){
	}else{
	if(pago2.producto.oferta=="Si"){
	pago2.usuario.saldo -= pago2.producto.precio*0.60;
	pago2.producto.sucursal.ganancias += pago2.producto.precio*0.60;	
	}else{
	pago2.usuario.saldo -= pago2.producto.precio;
	pago2.producto.sucursal.ganancias += pago2.producto.precio;
	}

	pago2.producto.cantidad -= 1;

	let userRegistry = await getParticipantRegistry('org.usac.tienda.Usuario');
	let sucRegistry = await getParticipantRegistry('org.usac.tienda.Sucursal');
	 let assetRegistry = await getAssetRegistry('org.usac.tienda.Producto');

	await userRegistry.update(pago2.usuario);
	await sucRegistry.update(pago2.producto.sucursal);
	await assetRegistry.update(pago2.producto);
	}
}





