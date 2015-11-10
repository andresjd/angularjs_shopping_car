$(document).ready(function(){
    $('#wizardCarrito').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',
         onInit : function(tab, navigation,index){
           //check number of tabs and fill the entire row
           var $total = navigation.find('li').length;
           $width = 100/$total;
           
           $display_width = $(document).width();
           
           if($display_width < 400 && $total > 3){
               $width = 50;
           }
           navigation.find('li').css('width',$width + '%');
        },
        onTabClick : function(tab, navigation, index){
            // Disable the posibility to click on tabs
            return false;
        }, 
        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index+1;
            
            var wizard = navigation.closest('.wizard-card');
            
            // If it's the last tab then hide the last button and show the finish instead
            if($current >= $total) {
                $(wizard).find('.btn-next').hide();
                $(wizard).find('.btn-finish').show();
            } else {
                $(wizard).find('.btn-next').show();
                $(wizard).find('.btn-finish').hide();
            }
        },
        onNext: function(tab, navigation, index) {
            var $valid = $("#order-form").valid();
            console.log($valid);
            if(!$valid) {
                
                return false;
            }else{
                
            }

            if( index == 1 ){
                if( $('input[name=radioMetodoPago]:checked', '#order-form').val() == 1 ){
                    /*$('#finish').removeClass('disabled');
                    $('#inputPin').hide();
                    $('#divTransferencia').hide();
                    $('#spanMetodoPago').html('Tarjeta Crédito/Débito o UPAY o Caixa Linea Abierta');*/
                }else if( $('input[name=radioMetodoPago]:checked', '#order-form').val() == 'pin' ){
                    /*if($('#pin').val() == '' ){
                        $('#finish').addClass('disabled');
                    }
                    $('#spanMetodoPago').html('Pin');
                    $('#inputPin').show();
                    $('#divTransferencia').hide();*/
                }else if( $('input[name=radioMetodoPago]:checked', '#order-form').val() == 2 ){
                    /*$('#finish').removeClass('disabled');
                    $('#spanMetodoPago').html('Ingreso o Transferencia Bancaria');
                    $('#inputPin').hide();*/
                }
            }
        },
        onPrevious: function(){
            
        }
    });

    $('[data-toggle="wizard-radio"]').click(function(event){
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        var radioMetodoPago = $(this).find('[type="radio"]');
        radioMetodoPago.attr('checked','true');
    });
    
    $height = $(document).height();
    $('.set-full-height').css('height',$height);

    $('.wizard-container').show();
});
