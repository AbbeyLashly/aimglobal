<?php
function abbeysassy_preprocess_html (&$var){

  drupal_add_css('http://fonts.googleapis.com/css?family=Lovers+Quarrel', array('group' => CSS_THEME));

  drupal_add_js(drupal_get_path('theme', 'abbeysassy') . '/js/main.js', array('type' => 'file','scope' => 'footer'));


}


?>
