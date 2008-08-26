var Highrise = Highrise || {};

Highrise.PersonView = function() {
  this.markupPhoneNumbers();
  this.markupSkypeIM();
};

Highrise.PersonView.prototype.markupPhoneNumbers = function() {
  var self = this;
  var table = this.findTable('Phone');
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
};

Highrise.PersonView.prototype.markupSkypeIM = function() {
  var table = this.findTable('IM');
  table.select('tr td').each(function(element) {
    var matcher  = element.innerHTML.match(/^([^<]+)(?:<span>on ([^<]+), ([^<]+)<\/span>)/);
    if (matcher) {
      var username = matcher[1].strip();
      var imType   = matcher[2];
      var usage    = matcher[3];
      console.log(username);
      console.log(imType);
      var usernameLink = username;
      if (imType == "Skype") {
        usernameLink = "<a href='skype:" + username +
          "' class='skype'>" + username + "</a>";
      };
      element.innerHTML = usernameLink + " <span>on " +
        imType + ", " + usage + "</span>";
    }
  });
};

Highrise.PersonView.prototype.findTable = function(label) {
  return $$('.contact_methods table').detect(function(table) {
    return $(table).select('th').any(function(header) {
      return (header.innerHTML == label);
    });
  });
};


Highrise.PersonView.prototype.isPhoneNumber = function(phoneNumber) {
  var digits = this.digitsOnly(phoneNumber);
  return (digits && digits.length >= 10 && digits.length >= 7);
};

Highrise.PersonView.prototype.digitsOnly = function(phoneNumber) {
  return phoneNumber.replace(/[^\d+]/g,'');
};

// see http://userscripts.org/scripts/review/10990 for an algorithm
// default international prefix should be user setting (e.g. +1 or +61)
Highrise.PersonView.prototype.toCallable = function(phoneNumber) {
  var number = this.digitsOnly(phoneNumber);
  number = number.replace(/^0/, '');
  if (/^\+/.test(number) || number.length == 10) {
    return number;
  }
  return this.phonePrefix() + number;
};

Highrise.PersonView.prototype.phonePrefix = function() {
  // TODO - store in user preferences
  return "+61";
};
