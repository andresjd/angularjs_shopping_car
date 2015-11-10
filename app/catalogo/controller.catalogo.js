(function(){
    angular.module('app').controller('CatalogoController',CatalogoController)
    CatalogoController.$inject = ['FCatalogo', 'FCarroDeCompras', '$state']
    function CatalogoController(FCatalogo, FCarroDeCompras, $state){
        var cat = this
        cat.importeCarrito = 0
        cat.productos = FCatalogo.obtenerProductos()
        cat.numProductosCarrito = 0
        cat.listaDeCarrito = []
        
        // función que nos permite traer del localstorage los productos, actualiza el importe total y el contador de
        // productos en el carrito de compras.
        var productosLocalStorage = FCarroDeCompras.obtenerProductosDelLocalStorage()
        // importe total del carrito de compras
        cat.importeCarrito = productosLocalStorage.precioTotal
        // productos que hay el el carrito de compras
        cat.listaDeCarrito = productosLocalStorage.productosEnCarro
        // número de productos en el carrito de compras
        cat.numProductosCarrito = productosLocalStorage.productosEnCarro.length
        $('#numProductosCarrito').html(cat.numProductosCarrito)
        
        // función que agrega productos al carro de compras, incrementa el contador de productos existentes en el
        // carro y suma al importe total del carrito el precio del producto agregado
        cat.agregarAlCarrito = function(producto){
            var validaSiExisteProductoEnCarro = false;
            // elimina el haskey por el cual angular identifica cada elemento
            delete producto.$$hashKey
            // incrementea el contador de productos en el carrito
            cat.numProductosCarrito++
            
            // si no existe ningún producto en el carrito entonces crea la propiedad cantidad y la inicializa en 1
            if(cat.listaDeCarrito.length === 0){
                producto.cantidad = 1
            }
            else{
                validaSiExisteProductoEnCarro = cat.listaDeCarrito.some(function(item){
                    return item.idproducto === producto.idproducto
                })    
            }
            //console.log(validaSiExisteProductoEnCarro)
            if( validaSiExisteProductoEnCarro === false){
                console.log('entre ' + validaSiExisteProductoEnCarro)
                producto.cantidad = 1
                // le crea el id único en base al contador de número de productos en el carrito
                producto.lid = cat.numProductosCarrito
                // agrega el producto en formato string al local storage y la llave se llama productoCarrito y se le 
                // concatena el número más a la cantidad de productos en el carrito
                localStorage['productoCarrito' +  cat.numProductosCarrito ] = JSON.stringify(producto)
                // se agrega el producto al array de productos que existe en el carrito
                cat.listaDeCarrito.push(producto)
                // actualiza el número que indica el número de productos que hay en el carrito de compras
                $('#numProductosCarrito').html(cat.numProductosCarrito)
            }
            else{
                cat.listaDeCarrito.forEach(function(item, index){
                    //console.log('arrpro: ' + item.idproducto + ' carPro:' + producto.idproducto)
                    if( item.idproducto == producto.idproducto ){
                        cat.listaDeCarrito[index].cantidad++
                        console.log(cat.listaDeCarrito[index])
                        localStorage['productoCarrito' +  cat.listaDeCarrito[index].lid ] = JSON.stringify(cat.listaDeCarrito[index])
                    }
                })
            }
            // se le suma el precio del producto a la variable que almacena el importe total de los productos en el carrito se
            cat.importeCarrito += producto.precio
            
        }
        // creo el objeto filtroCat para filtrar los productos del ng-repeat
        cat.filtroCat = {}
        // le creo una propiedad idcategoria y le asigno un valor por defecto, esto se debe mejorar
        // este valor por defecto es para decirle a angular qeu muestre los productos que pertenezcan a la categoria 11
        // son los que va a mostrar por defecto
        cat.filtroCat.idcategoria = 11;
        // funcion que asigna la categoria por la cual se va a filtrar el ng-repeat
        cat.mostrarProductosCategoria = function(idcategoria){
            cat.filtroCat.idcategoria = idcategoria
        }
        
        // funcion que cierra la ventana modal y elimina las classes para evitar que en el resumen del carrito quede inhabilitado
        // el scroll, luego es dirigido a la vista finalizarCompra
        cat.finalizarCompra = function(){
            $('#m_dialog').modal('hide')
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $state.go('finalizarCompra')
        }
    }
    
})()