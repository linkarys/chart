'use strict';

describe('Controller: ScaleCtrl', function () {

  // load the controller's module
  beforeEach(module('yoApp'));

  var ScaleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScaleCtrl = $controller('ScaleCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
