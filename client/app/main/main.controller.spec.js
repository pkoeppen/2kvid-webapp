'use strict';

describe('Component: mainComponent', function() {

  // load the controller's module
  beforeEach(module('2kvidWebApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('socketMock'));

  var scope,
      mainComponent,
      state,
      $httpBackend;

  // initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state,
    socket) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/vrf')
      .respond([
        { title: 'VrfNumberOne' }, 
        { title: 'VrfNumberTwo' }, 
        { title: 'VrfNumberThree' }
      ]);

    scope = $rootScope.$new();
    state = $state;
    mainComponent = $componentController('main', {
      $http: $http,
      $scope: scope,
      socket: socket
    });
  }));

  it('should attach a list of VRF objects to the controller', function() {
    mainComponent.$onInit();
    $httpBackend.flush();
    expect(mainComponent.Vrfs.length)
      .to.equal(3);
  });
});
