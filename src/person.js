var Highrise = Highrise || {};

Highrise.PersonView = Class.create();

Highrise.PersonView.prototype = {
  initialize: function() {
    $$('.contact_methods table').detect(function(table) {
      console.log(table);
      console.log(table.select('th'));
      return table.select('tr th').innerHTML == "Phone";
    });
  }
};