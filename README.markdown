= Greasemonkey/GreaseKit extensions for 37signal's Highrise

== WARNING

Currently only working on GreaseKit (Safari or Fluid apps) - I think Greasemonkey + Prototype (being reused from highrisehq.com) aren't coexisting nicely.

== Description

A set of extensions to the Highrise CRM by 37signals:

* within contact information, phone numbers converted to callto:// links to enable access to Skype/VOIP apps

== Requirements

For Safari or Fluid.app apps: requires [GreaseKit](http://8-p.info/greasekit/)
For Firefox: requires [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/748)

== Installation

To install to Safari:

  BROWSER=safari rake install

To install to a Fluid.app wrapper app for Highrise, say called 'Highrise':

  BROWSER=Highrise rake install

== Author

Dr Nic Williams, http://drnicwilliams.com