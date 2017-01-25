/* globals  $, _ */
/* eslint no-unused-vars: 0 */

// Login form
$('form#ipce_register_form').submit(function (e) {
  e.preventDefault();

  var username = $(this).find('input[name="username"]').val().trim();
  var email = $(this).find('input[name="email"]').val().trim();
  var password = $(this).find('input[name="password"]').val();
  var confirm_password = $(this).find('input[name="confirm_password"]').val();
  var first_name = $(this).find('input[name="first_name"]').val().trim();
  var last_name = $(this).find('input[name="last_name"]').val().trim();
  var company = $(this).find('input[name="company"]').val().trim();
  var telephone_no = $(this).find('input[name="telephone_no"]').val().trim();
  var cellphone_no = $(this).find('input[name="cellphone_no"]').val().trim();
  var country = $(this).find('select[name="country"] option:selected').data('name');
  var country_code = $(this).find('select[name="country"]').val();
  var state = $(this).find('select[name="state"]').val();
  var city = $(this).find('input[name="city"]').val().trim();
  var postal = $(this).find('input[name="postal"]').val().trim();
  var address = $(this).find('input[name="address"]').val().trim();
  var elButton = $(this).find('button');
  var elAlert = $(this).find('.alert.alert-danger');
  var elAlertSuccess = $('.alert.alert-success');
  var elForm = $(this);

  // Reset error message
  elAlert.addClass('hide').empty();

  // Check if Password and Confirm Password are not equal
  if (password !== confirm_password) {
    $('html, body').animate({ scrollTop: elForm.offset().top }, 'fast');
    elAlert.removeClass('hide').text('Passwords are not equal');
    return;
  }

  // Disable button
  elButton.prop('disabled', true);

  $.post('/api/register', {
      username: username,
      email: email,
      password: password,
      name: {
        first: first_name,
        last: last_name,
      },
      company: company,
      telephone_no: telephone_no,
      cellphone_no: cellphone_no,
      country: country,
      country_code: country_code,
      state: state,
      city: city,
      postal: postal,
      address: address,
    }, function (response) {
      console.log(response);

      // Show success message
      $('html, body').animate({ scrollTop: elForm.offset().top }, 'fast');
      elAlertSuccess.removeClass('hide');
      elForm.addClass('hide');
    }
  ).fail(function (response) {
    console.log(response);
    var data = response.responseJSON;

    // Display error message
    $('html, body').animate({ scrollTop: elForm.offset().top }, 'fast');
    var message = _.isArray(data.message)
      ? '<ul>' + data.message.map(function (val) { return '<li>' + val + '</li>'; }).join('') + '</ul>'
      : data.message;
    elAlert.removeClass('hide').html(message);

    // Enable button
    elButton.prop('disabled', false);
  });
});

// Country select element
$('form#ipce_register_form select[name="country"]').change(function () {
  var country = $(this).val();
  var elState = $('form#ipce_register_form select[name="state"]');

  // Disable state element
  elState.prop('disabled', true);

  // Remove Options, except first
  elState.find('option:gt(0)').remove();
  elState.val('');

  if (country !== '') {
    $.get('/api/register/states/' + country,
      function (response) {
        console.log(response);
        var data = response.data;

        // Append new options
        var html = '';
        _.each(data, function (value) {
          html += '<option value="' + value + '">' + value + '</option>';
        });
        elState.append(html);

        // Enable state element
        elState.prop('disabled', false);
      }
    ).fail(function (response) {
      console.log(response);
    });
  }
});
