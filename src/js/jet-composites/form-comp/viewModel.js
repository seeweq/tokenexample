/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
  ['ojs/ojcore', 'knockout', 'jquery'],
  function(oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
      var self = this;
      // self.composite = context.element;
      //Example observable
      self.messageText = ko.observable('Hello from Example Component');
      //observables that I need to get the data

      // self.username = ko.observable("jdesys");
      // self.deviceName = ko.observable("sivurs3");
      // self.aisurl = ko.observable("http://sandbox921.steltix.com");


      var req = {}

      self.getFormData = function() {

        req.token = localStorage.getItem("token");
        req.deviceName = "sivurs3";
        req.formName =  "P4101_W4101E",
        req.formActions =  [{
              "command": "SetQBEValue",
              "controlID": "1[123]",
              "value": "1001"

            },
            {
              "command": "DoAction",
              "controlID": "22"
            }
          ],
          req.aliasNaming =  true,
          req.outputType =  "VERSION2",
          req.formServiceAction =  "R",
          req.bypassFormServiceEREvent =  true
        // console.log(req.token);
        $.ajax({
            url: "http://sandbox921.steltix.com/jderest/v2/formservice",
            data: JSON.stringify(req),
            type: "post",
            dataType: "JSON",
            contentType: "application/json",
            fail:function(xhr, textStatus, errorThrow){
              console.log(xhr, textStatus, errorThrow);
              // console.log('liwa');
            }
          })
          .done(function(data) {
            console.log(data);
            // console.log(localStorage.setItem("token", results.));
          })




      }

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
