'use strict';

describe('Service: mdu', function () {

  // load the service's module
  beforeEach(module('yoApp'));

  // instantiate service
  var mdu;
  beforeEach(inject(function (_mdu_) {
    mdu = _mdu_;
  }));

  it('should do something', function () {
    expect(!!mdu).toBe(true);
  });

});
