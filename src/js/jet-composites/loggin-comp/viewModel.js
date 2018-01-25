/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery','ojs/ojinputtext'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        self.username = ko.observable("jdesys");
        self.password = ko.observable("steltixE1");
        self.aisurl = ko.observable("http://sandbox921.steltix.com");
        self.deviceName = ko.observable("sivurs3");


         var req = {}


        self.getToken = function(){
        req.username = self.username();
        req.password = self.password();
        req.deviceName = self.deviceName();

        $.ajax({
          url:self.aisurl() + "/jderest/v2/tokenrequest",
          data:JSON.stringify(req),
          type:"post",
          dataType:"JSON",
          contentType:"application/json",
          fail: function(xhr, textStatus, errorThrow){
            console.log(xhr, textStatus, errorThrow);
          }
        })
        .done(function(results){
          console.log(results.userInfo.token);
          localStorage.setItem("token", results.userInfo.token);
        })

        }

        //Example observable
        self.messageText = ko.observable('Hello from Example Component');

        context.props.then(function (propertyMap) {
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
