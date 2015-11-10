(function(){
    angular.module('app').controller('FinalizarCompraController', FinalizarCompraController)
    
    // se injecta el factory como dependencia
    FinalizarCompraController.$inject = ['FCarroDeCompras']
    
    function FinalizarCompraController(FCarroDeCompras){
        // se asinga el objeto controller a la variable finCompra
        var finCompra = this;
        // se inicializa el array de productos guardados en el carrito de compras
        finCompra.listaDeCarrito = [] 
        // variable importeCarrito almacena el coste total del carro de compras
        finCompra.importeCarrito = 0 
        // variable numProductosCarrito sirve de contador de productos existentes en el carrito de compras
        finCompra.numProductosCarrito = 0
        
        // función que nos permite traer del localstorage los productos, actualiza el importe total y el contador de
        // productos en el carrito de compras.
        var productosLocalStorage = FCarroDeCompras.obtenerProductosDelLocalStorage()
        console.log(productosLocalStorage)
        // importe total del carrito de compras
        finCompra.importeCarrito = productosLocalStorage.precioTotal
        // productos que hay el el carrito de compras
        finCompra.listaDeCarrito = productosLocalStorage.productosEnCarro
        // número de productos en el carrito de compras
        finCompra.numProductosCarrito = productosLocalStorage.productosEnCarro.length
        $('#numProductosCarrito').html(finCompra.numProductosCarrito)
        
        // función que remueve productos del carrito
        finCompra.removerItemCarrito = function (index)
        {
            // se asinga a la variable removerItem el producto que va hacer eliminado
            var removerItem = finCompra.listaDeCarrito[index]
            // se resta el precio del producto a eliminar del importe total del carrito
            finCompra.importeCarrito -= removerItem.precio; 
            // elimina del array que contiene los productos del carrito de compras
            finCompra.listaDeCarrito.splice(index, 1)
            // actualiza el número que indica el número de productos que hay en el carrito de compras
            $('#numProductosCarrito').html(finCompra.listaDeCarrito.length)
            // remueve del localstorage el producto
            localStorage.removeItem('productoCarrito' +  removerItem.lid)
            finCompra.calcularTotal()
        }
        
        finCompra.sumarCantidad = function(lidProducto, sumarCantidad){
            finCompra.listaDeCarrito.forEach(function(item, index){
                console.log('lid:' + lidProducto + ' i:' + item.idproducto)
                if(item.lid === lidProducto){
                    finCompra.listaDeCarrito[index].cantidad += sumarCantidad
                    delete finCompra.listaDeCarrito[index].$$hashKey
                    localStorage['productoCarrito' +  finCompra.listaDeCarrito[index].lid ] = JSON.stringify(finCompra.listaDeCarrito[index])
                    finCompra.importeCarrito += item.precio
                }
            })
        }
        
        finCompra.restarCantidad = function(lidProducto, sumarCantidad){
            finCompra.listaDeCarrito.forEach(function(item, index){
                if(item.lid === lidProducto && item.cantidad > 1){
                    finCompra.listaDeCarrito[index].cantidad -= sumarCantidad
                    delete finCompra.listaDeCarrito[index].$$hashKey
                    localStorage['productoCarrito' +  finCompra.listaDeCarrito[index].lid ] = JSON.stringify(finCompra.listaDeCarrito[index])
                    finCompra.importeCarrito -= item.precio
                }
            })
        }
        
        finCompra.calcularTotal = function(){
            finCompra.importeCarrito = 0
            finCompra.listaDeCarrito.forEach(function(item, index) {
                finCompra.importeCarrito += item.cantidad * item.precio
            })
        }
    }
})()