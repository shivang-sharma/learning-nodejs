var assert = require('assert')
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 if value is not present', function() {
            assert.equal([10, 20, 30].indexOf(4), -1)
        });
    });
});