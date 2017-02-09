<?php
/**
 * Template Name: Payment Template
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

get_header(); ?>
<div align="center" style="margin-top: 50px;">
<h2>Please select a payment type</h2>

<select>
  <option value="select">Please select</option>
  <option value="debit_card">Debit Card</option>
  <option value="uk_credit_card">UK Credit Card</option>
  <option value="international_debit_cards">International Debit Cards</option>
  <option value="international_credit_cards">International Credit Card</option>
  <option value="business_credit_card">Business Credit Card</option>
</select>

<h2 class="currency">Please enter the amount you wish to pay</h2>
<input type="text" class="currency" placeholder="Payment Amount" style="margin-top: 30px; height: 32px;" />
<button style="color: white;font-size: 19px;background: #ac9757;padding: 0 20px;display: inline-block;line-height: 32px;height: 32px;border: 0;font-family: Gilda Display,Helvetica Neue,Helvetica,Helvetica,Arial,sans-serif;-webkit-font-smoothing: antialiased;margin-bottom: -2px;border-radius: 5px;margin-right: 15px;" >ok</button>
</div>
<div class="payment_info" align="center" style="display: none;">
<?php the_content(); ?>
</div>

<div style="text-align: center; margin-top: 40px;">
      <span style="display: block; font-size: 14px;">Currency accepted GBP</span>
      <img src="http://gartonjones.london/wp-content/themes/new_theme/img/logos/payments.png" alt="" style="height: 181px;margin: -35px 0 -55px;">
    </div>



<?php get_footer(); ?>

