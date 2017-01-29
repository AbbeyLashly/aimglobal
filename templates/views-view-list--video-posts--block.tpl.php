<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>

  <?php if (!empty($title)) : ?>
    <h3><?php print $title; ?></h3>
  <?php endif; ?>
    <?php print $list_type_prefix; ?>

      <div class="row">
        <?php foreach ($rows as $id => $row): ?>
          <div class="col-xs-12 col-sm-12 col-md-4">
            <li class="<?php print $classes_array[$id]; ?>"><?php print $row; ?></li>
          </div>
        <?php endforeach; ?>
      </div>
  
    <?php print $list_type_suffix; ?>


<?php print $wrapper_suffix; ?>
