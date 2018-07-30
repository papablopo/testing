(function() {
	'use strict';

	window.models = window.models || {};

	models.gaRequests = {

		trackEvent : function(eventName, eventLabel) {

			try {

				var label = eventLabel == undefined ? 'default' : eventLabel;

				gaPlugin.trackEvent(function() {
					// console.log('XXXXX TRACK SUCCESS ' + eventName + ' ' +
					// eventLabel);
				}, function() {
					// console.log('XXXXX TRACK ERROR ' + eventName + ' ' +
					// eventLabel);
				}, eventName, 'tap', label, 1);

			} catch (e) {
				console.log('XXXXX Catch gaRequests.trackEvent ' + e.message);
			}

		},

		trackTransaction : function(data) {

			try {
				gaPlugin.addTransaction(data.orderId, 'Fybeca App', data.orderTotal, data.taxes, data.shippingCost, 'USD', function() {
                    console.log('ANALYTICS: Transaccion '+data.orderId+' registrada exitosamente.');
                }, function() {
                    console.log('ANALYTICS: Error al registrar transaccion.');
                });
                data.items.forEach(function(item){
                    gaPlugin.addTransactionItem(data.orderId, item.name, item.sku, item.category, item.price, item.quantity, 'USD', function() {
                        console.log('ANALYTICS: Item '+item.name+' registrado exitosamente.');
                    }, function() {
                        console.log('ANALYTICS: Error al registrar item de transaccion.');
                    });
                });
			} catch (e) {
				console.log('XXXXX Catch gaRequests.trackTransaction ' + e.message);
			}

		}

	};

})(jQuery);
