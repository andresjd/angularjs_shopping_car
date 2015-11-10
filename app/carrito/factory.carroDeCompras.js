(function(){
    angular.module('app').factory('FCarroDeCompras', FCarroDeCompras)
    
    function FCarroDeCompras(){
        return {
            obtenerProductosDelLocalStorage: obtenerProductosDelLocalStorage
        }
        
        function obtenerProductosDelLocalStorage(){
            var respuesta = {}
            respuesta.precioTotal = 0 
            respuesta.productosEnCarro = []
            for (var i = 0; i < localStorage.length; i++){
                // convierte el valor del elemento en un objeto json
                var producto = JSON.parse(localStorage.getItem(localStorage.key(i)))
                // se verifica que si el elemento tiene una propiedad llamada idproducto entonces es un producto
                // debido a que pueden haber mas elementos en el LS que no sean productos
                if( typeof producto.idproducto != 'undefined'){
                    // se agrega el producto al array de productos que existe en el carrito
                    respuesta.productosEnCarro.push(producto)
                    // se le suma el precio del producto a la variable que almacena el importe total de los productos en el carrito se
                    respuesta.precioTotal += producto.cantidad * producto.precio
                }
            }
           return respuesta
        }
    }
    
})()