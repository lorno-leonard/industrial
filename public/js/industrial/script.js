/* globals  $, _ */
/* eslint no-unused-vars: 0 */

// Login form
$('form#icpe_login_form').submit(function (e) {
  e.preventDefault();

  var _csrf = $(this).find('input[name="_csrf"]').val();
  var username = $(this).find('input[name="username"]').val();
  var password = $(this).find('input[name="password"]').val();
  var elButton = $(this).find('button');
  var elAlert = $(this).find('.alert');

  // Rest error message
  elAlert.addClass('hide').text('');

  // Disable button
  elButton.prop('disabled', true);

  $.post('/api/signin', {
      _csrf: _csrf,
      username: username,
      password: password,
    }, function (response) {
      console.log(response);

      // Enable button
      elButton.prop('disabled', false);

      // Reload page
      location.reload();
    }
  ).fail(function (response) {
    console.log(response);
    var data = response.responseJSON;

    // Display error message
    elAlert.removeClass('hide').text(data.message);

    // Enable button
    elButton.prop('disabled', false);
  });
});
