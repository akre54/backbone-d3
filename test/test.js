(function() {
  module("Backbone-D3", {

  });

  test("create from string", 2, function() {
    var el = $('<a id="test"></a>');
    equal(el.length, 1);
    equal(el.attr('id'), 'test');
  });

  test("create from element", 2, function() {
    var el = $(document.createElement('a'));
    el.attr('id', 'test');
    equal(el.length, 1);
    equal(el.attr('id'), 'test');
  });

  test("create from selection", 1, function() {
    var el = $('h2');
    equal(el.length, 2);
  });

})();