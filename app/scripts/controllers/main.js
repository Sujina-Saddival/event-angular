'use strict';

/**
 * @ngdoc function
 * @name eventAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the eventAngularApp
 */
 angular.module('eventAngularApp')
 .controller('MainCtrl', function ($scope,$location,mainService,$timeout,signinService,$window) {
  var vm = this;
  var flag;
  var flag_registered;
  vm.flag = true;
  vm.flag_registered = true;

  vm.close = function(){
    vm.first_name = '';
    vm.last_name = '';
    vm.email = '';
    vm.password = '';
    vm.password_confirmation = '';
    location.reload();
  }

  vm.submit_signup = function(){
    var params = {
      user: {
      first_name: vm.first_name,
      last_name: vm.last_name,
      email: vm.email,
      password: vm.password,
      password_confirmation: vm.password_confirmation
      }
    }

    mainService.postData(params).then(function(response) {
      if (response.data.status === 200){
        vm.first_name = '';
        vm.last_name = '';
        vm.email = '';
        vm.password = '';
        vm.password_confirmation = '';
        vm.message = response.data.message;
        vm.flag_registered = false;
        $timeout(function () { vm.flag_registered = "true"; }, 4000);
        $location.path('/');
      }
      else {
        vm.flag = false;
        vm.flash = response.data.message;
        $timeout(function () { vm.flag = "true"; }, 3000);
      }
    });
  }

  vm.submit_signin = function(){
    var params = {
      user: {
      email: vm.email,
      password: vm.password
      }
    }

    signinService.postData(params).then(function(response) {
      if (response.data.status === 200){
        $location.path('/event')
      }
      else {
        vm.message_signin = response.data.message;
        vm.alert = true;
        $timeout(function () { vm.alert = false; }, 3000);
      }
    });
  }
 });
