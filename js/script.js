jQuery(document).ready(function($) {
    $('.gender-option').click(function() {
        $('.gender-option').removeClass('selected');
        $(this).addClass('selected');
        
        const selectedGender = $(this).data('gender');
        
        // Tutaj możesz dodać kod obsługujący wybór płci
        // np. wysłanie do API, zapis do localStorage itp.
    });
}); 