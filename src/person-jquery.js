(function($){ 
  $(document).ready(function() {
    $('.contact_methods table').filter(function() {
      return $(this).find('tr th').html() == "Phone";
    }).find('tr td').each(function(index) {
      // looks like: <td>0412002126    <span>Mobile</span></td>
      var matcher     = $(this).html().match(/([^<]+)(?:<span>([^<]*)<\/span>)/);
      var phoneNumber = $.trim(matcher[1]);
      var phoneType   = matcher[2];
      if ($.phone.test(phoneNumber)) {
        var linkedPhone = "<a href='callto://" + $.phone.toCallable(phoneNumber) +
          "' class='callto'>" + phoneNumber + "</a>";
        $(this).html(linkedPhone + " <span>" + phoneType + "</span>");
      } else {
        console.log("No match");
      }
    });
  });

  $.phone = $.phone || {};
  
  $.phone.digitsOnly = function(phoneNumber) {
    return phoneNumber.replace(/[^\d+]/g,'');
  };
  
  $.phone.test = function(phoneNumber) {
    var digits = $.phone.digitsOnly(phoneNumber);
    return (digits && digits.length >= 10 && digits.length >= 7);
  };
  
  // see http://userscripts.org/scripts/review/10990 for an algorithm
  // default international prefix should be user setting (e.g. +1 or +61)
  $.phone.toCallable = function(phoneNumber) {
    var number = $.phone.digitsOnly(phoneNumber);
    number = number.replace(/^0/, '');
    if (/^\+/.test(number) || number.length == 10) {
      return number;
    }
    return $.phone.prefix() + number;
  };  
  
  $.phone.prefix = function() {
    // TODO - store in user preferences
    return "+61";
  }
})(jQuery); 

