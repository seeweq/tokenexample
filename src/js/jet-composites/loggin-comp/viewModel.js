/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
  ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojinputtext', 'ojs/ojbutton','ojs/ojrouter'],
  function(oj, ko, $) {
    'use strict';
    var router = oj.Router.rootInstance;


    function ExampleComponentModel(context) {
      var self = this;
      self.composite = context.element;

      // loggin-comp observables
      self.username = ko.observable("jdesys");
      self.password = ko.observable("steltixE1");
      self.aisurl = ko.observable("http://sandbox921.steltix.com");
      self.deviceName = ko.observable("sivurs3");

      // store username,password and device name
      var req = {}

      // get the token from the server
      self.getToken = function() {

        req.username = self.username();
        req.password = self.password();
        req.deviceName = self.deviceName();

        // do a ajax call to the AIS to get the token
        $.ajax({
            url: self.aisurl() + "/jderest/v2/tokenrequest",
            data: JSON.stringify(req),
            type: "post",
            dataType: "JSON",
            contentType: "application/json",
            fail: function(xhr, textStatus, errorThrow) { //if the request fail print the error
              console.log(xhr, textStatus, errorThrow);
            }
          })
          .done(function(results) { //if successful print the token
            console.log(results.userInfo.token);
            localStorage.setItem("token", results.userInfo.token);
            router.go('dashboard');
            
          })

      }


      //Example observable
      self.messageText = ko.observable();

      context.props.then(function(propertyMap) {
        //Store a reference to the properties for any later use
        self.properties = propertyMap;

        //Parse your component properties here

      });
    };

    //Lifecycle methods - uncomment and implement if necessary
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
  });
