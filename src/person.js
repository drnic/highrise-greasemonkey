var Highrise = Highrise || {};

Highrise.PersonView = Class.create();

Highrise.PersonView.prototype = {
  initialize: function() {
    var self = this;
    var table = $$('.contact_methods table').detect(function(table) {
      return $(table).select('th').any(function(header) {
        return (header.innerHTML == 'Phone');
      });
    });
    table.select('tr td').each(function(element) {
      var matcher     = element.innerHTML.match(/([^<]+)(?:<span>([^<]*)<\/span>)/);
      var phoneNumber = matcher[1].strip();
      var phoneType   = matcher[2];
      if (self.isPhoneNumber(phoneNumber)) {
        var linkedPhone = "<a href='callto://" + self.toCallable(phoneNumber) +
          "' class='callto'>" + phoneNumber + "</a>";
        element.innerHTML = linkedPhone + " <span>" + phoneType + "</span>";
      }
    });
  },
  
  isPhoneNumber: function(phoneNumber) {
    var digits = this.digitsOnly(phoneNumber);
    return (digits && digits.length >= 10 && digits.length >= 7);
  },
  
  digitsOnly: function(phoneNumber) {
    return phoneNumber.replace(/[^\d+]/g,'');
  },

  // see http://userscripts.org/scripts/review/10990 for an algorithm
  // default international prefix should be user setting (e.g. +1 or +61)
  toCallable: function(phoneNumber) {
    var number = this.digitsOnly(phoneNumber);
    number = number.replace(/^0/, '');
    if (/^\+/.test(number) || number.length == 10) {
      return number;
    }
    return this.phonePrefix() + number;
  },
  
  phonePrefix: function() {
    // TODO - store in user preferences
    return "+61";
  }
};