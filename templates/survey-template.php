<?php if (!defined('ABSPATH')) exit; ?>

<div class="therapy-survey" id="therapy-survey">
    <div class="survey-container">
        <!-- Dynamiczna zawartość -->
    </div>
</div>

<!-- Gender Selection Template -->
<script type="text/template" id="gender-template">
    <div class="gender-selection">
        <h2>Sprawdź zalecaną kurację dla ciebie lub dla bliskiego.</h2>
        <div class="gender-options">
            <div class="gender-option" data-gender="male">
                <img src="https://plaza.universe.ehost.pl/strona-Mnemosline/wp-content/uploads/male.png" 
                     alt="Mężczyzna"
                     width="180"
                     height="180">
                <span>Mężczyzna</span>
            </div>
            <div class="gender-option" data-gender="female">
                <img src="https://plaza.universe.ehost.pl/strona-Mnemosline/wp-content/uploads/female-e1735604916446.png" 
                     alt="Kobieta"
                     width="180"
                     height="180">
                <span>Kobieta</span>
            </div>
        </div>
        <div class="navigation-buttons">
            <button class="next-btn">Dalej</button>
        </div>
    </div>
</script>

<!-- Pozostałe templaty bez zmian... --> 