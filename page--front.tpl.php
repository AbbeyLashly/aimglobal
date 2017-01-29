<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/garland.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to main-menu administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 */
?>
<!-- Start: Header -->
<div id="skrollr-body">
  <header id="header">
    <div class="container">
      <div class="logo">
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
      </div>
      <!-- Start: Navigation -->
      <nav class="main">
        <?php
          $main_menu_tree = menu_tree(variable_get('menu_main_links_source', 'main-menu'));
          print drupal_render($main_menu_tree);
        ?>
      </nav>
      <!-- End: Navigation -->
    </div>
  </header>
  <div class="clearfix"></div>
</div>




<!-- Start: Videos -->
<section class="videos">

  <?php if ($page['videos']): ?>
    <div class="container">
      <h4 class="section-title"> Aim Videos</h4>
        <?php print render($page['videos']); ?>
    </div>
  <?php endif; ?>
</section>


<!-- Start: Testimonials -->
<section class="testimonial">
    <div class="container">
      <h4 class="section-title"> Testimonials</h4>
      <ul class="row">
        <li class="col-xs-12 col-md-3">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-12">
              <img src="<?php print $base_path . $directory .'/img/joe.jpg'; ?>" class="img-circle">
              <h2 class="t_title">
                Biodun Olasebikan.
                <a href="#">CEO / A1-Digital Systems</a>
              </h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-md-12 ">
              <p>The amazing fact that you can sit and relax while watch your money
                 grows makes AIM business very cool.
              </p>
            </div>
          </div>
        </li>
        <li class="col-xs-12 col-md-3">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-12">
              <img src="<?php print $base_path . $directory .'/img/marc.jpg'; ?>" class="img-circle">
              <h2 class="t_title">
                Gbenga Bello.
                <a href="#"> CEO & MD / ExtremeFX NG</a>
              </h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-md-12 ">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                sed do eiusmod tempor incididunt ut labore.

              </p>
            </div>
          </div>
        </li>
        <li class="col-xs-12  col-md-3">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-12">
              <img src="<?php print $base_path . $directory .'/img/sasha.jpg'; ?>" class="img-circle">
              <h2 class="t_title">
                Sasha Abbey.
                <a href="#">Risk Manager / MoneyLane Nig Ltd.</a>
              </h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-md-12 ">
              <p>
                I’m happy to be part of AIM Global live changing opportunity.
                am gonna help a lot of people to see the great future.
              </p>
            </div>
          </div>
        </li>
        <li class="col-xs-12 col-md-3">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-12">
              <img src="<?php print $base_path . $directory .'/img/sasha.jpg'; ?>" class="img-circle">
              <h2 class="t_title">
                Maureen Igbokwe.
                <a href="#">Account Manager / Profit Group </a>
              </h2>
            </div>
            <div class="col-xs-12 col-sm-8 col-md-12 ">
              <p>
                C247 restored my hope by curing my Polycistic Ovary Syndrome and am now a mother.
                Thank you AIM Global.
              </p>
            </div>
          </div>
        </li>



      </ul>





    </div>

    <div class="container">
      <div class="view-all">
        <a href="#">view all</a>
      </div>
    </div>

</section>





<!-- Start: Footer -->
<footer>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="headline">
            <h2>Join our Channels</h2>
          </div>
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="https://chat.whatsapp.com/Ca19gfiHJg5IOamlXi7vjx" class="btn btn-social">
                <i class="fa fa-whatsapp"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://t.me/joinchat/AAAAAEBp1IW9HyvjvdW6cg" class="btn btn-social">
                <i class="fa fa-send"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#" class="btn btn-social">
                <i class="fa fa-facebook"></i>
              </a>
            </li>

            <li class="list-inline-item">
              <a href="#" class="btn btn-social">
                <i class="fa fa-twitter"></i>
              </a>
            </li>


          </ul>

          <div class="headline">
            <h2>Disclaimer</h2>
          </div>
          <?php print render ($page['disclaimer']); ?>

        </div>


        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="headline">
            <h2>Latest From Blog</h2>
          </div>
          <?php print render ($page['footer-latest']); ?>

        </div>

        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="headline">
            <h2>Like Us on Facebook</h2>
          </div>
          <?php print render ($page['footer-social']); ?>

        </div>


        <div class="col-xs-12 col-sm-6 col-lg-3">
          <div class="headline">
            <h2>Useful Links</h2>
          </div>
          <?php print render ($page['about']); ?>

        </div>




      </div>
    </div>



</footer>
<!-- End: Footer -->

<div class="bottom">
  <div class="container">
    <div class="copyrights">
      AllianceInMotion.org Copyrights 2016. &nbsp | &nbsp <a href="#">Privacy Policy </a>
    </div>
    <div class="developer">
      Powered by <a class="link" href="http://a1digitalsystems.com">A1-Digital Systems</a>
    </div>
  </div>
</div>
