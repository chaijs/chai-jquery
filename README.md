# chai-jquery

chai-jquery is an extension to the [chai](http://chaijs.com/) assertion library that
provides a set of jQuery-specific assertions.

## Usage

Include `chai-jquery.js` in your test file, after `chai.js` (version 1.0.0-rc1 or later):

    <script src="chai-jquery.js"></script>

Use the assertions with chai's `expect` or `should` assertions.

## Assertions

### `attr(name[, value])`
Assert that the first element of the selection has the given attribute, using [`.attr()`](http://api.jquery.com/attr/).
Optionally, assert a particular value as well. The return value is available for chaining.

    $('#header').should.have.attr('foo');
    expect($('body')).to.have.attr('foo', 'bar');
    expect($('body')).to.have.attr('foo').match(/bar/);

### `css(name[, value])`
Assert that the first element of the selection has the given CSS property, using [`.css()`](http://api.jquery.com/css/).
Optionally, assert a particular value as well. The return value is available for chaining.

    $('#header').should.have.css('background');
    expect($('body')).to.have.css('background-color', '#ffffff');
    expect($('body')).to.have.css('font-family').match(/sans-serif/);

### `data(name[, value])`
Assert that the first element of the selection has the given data value, using [`.data()`](http://api.jquery.com/data/).
Optionally, assert a particular value as well. The return value is available for chaining.

    $('#header').should.have.data('foo');
    expect($('body')).to.have.data('foo', 'bar');
    expect($('body')).to.have.data('foo').match(/bar/);

### `class(className)`
Assert that the first element of the selection has the given class, using [`.hasClass()`](http://api.jquery.com/hasClass/).

    $('#header').should.have.class('foo');
    expect($('body')).to.have.class('foo');

### `id(id)`
Assert that the first element of the selection has the given id, using `.attr('id')`.

    $('.header').should.have.id('#main');
    expect($('body')).to.have.id('foo');

### `html(html)`
Assert that the first element of the selection has the given html, using [`.html()`](http://api.jquery.com/html/).

    $('.name').should.have.html('<em>John Doe</em>');
    expect($('#title')).to.have.html('Chai Tea');

### `text(text)`
Assert that the first element of the selection has the given text, using [`.text()`](http://api.jquery.com/text/).

    $('.name').should.have.text('John Doe');
    expect($('#title')).to.have.text('Chai Tea');

### `value(value)`
Assert that the first element of the selection has the given value, using [`.val()`](http://api.jquery.com/val/).

    $('.name').should.have.value('John Doe');
    expect($('.year')).to.have.value('2012');

### `visible`
Assert that at least one element of the selection is visible, using [`.is(':visible')`](http://api.jquery.com/:visible/).

    $('.name').should.be.visible;
    expect($('.year')).to.be.visible;

### `hidden`
Assert that at least one element of the selection is hidden, using [`.is(':hidden')`](http://api.jquery.com/:hidden/).

    $('.name').should.be.hidden;
    expect($('.year')).to.be.hidden;

### `selected`
Assert that at least one element of the selection is selected, using [`.is(':selected')`](http://api.jquery.com/:selected/).

    $('option').should.be.selected;
    expect($('option')).not.to.be.selected;

### `checked`
Assert that at least one element of the selection is checked, using [`.is(':checked')`](http://api.jquery.com/:checked/).

    $('.checked').should.be.checked;
    expect($('input')).not.to.be.checked;

### `disabled`
Assert that at least one element of the selection is disabled, using [`.is(':disabled')`](http://api.jquery.com/:disabled/).

    $('.disabled').should.be.disabled;
    expect($('input')).not.to.be.disabled;

### `empty`
Assert that at least one element of the selection is empty, using [`.is(':empty')`](http://api.jquery.com/empty-selector/).
If the object asserted against is not a jQuery object, the original implementation will be called.

    $('.empty').should.be.empty;
    expect($('body')).not.to.be.empty;

### `exist`
Assert that the selection is not empty. Note that this overrides the built-in chai assertion. If the object asserted
against is not a jQuery object, the original implementation will be called.

    $('#exists').should.exist;
    expect($('#nonexistent')).not.to.exist;

### `match(selector)` / `be(selector)`
Assert that the selection matches a given selector, using [`.is()`](http://api.jquery.com/is/). Note that the
built-in behavior of the `match` function and `be` property is preserved -- if the object asserted against is
not a jQuery object, or if `be` is not called as a function, the original implementation will be called. Otherwise,
`match` and `be` are synonyms -- use whichever one reads better.

    $('input').should.match('#foo');
    expect($('#empty')).to.be(':empty');

### `contain(selector)`
Assert that the selection contains the given text, using [`:contains()`](http://api.jquery.com/contains-selector/).
If the object asserted against is not a jQuery object, or if `contain` is not called as a function, the original
implementation will be called.

    $('body').should.contain('text');
    expect($('#content')).to.contain('text');

### `have(selector)`
Assert that the selection contains at least one element which has a descendant matching the given selector,
using [`.has()`](http://api.jquery.com/has/). If the object asserted against is not a jQuery object, or if `have`
is not called as a function, the original implementation will be called.

    $('body').should.have('h1');
    expect($('#content')).to.have('div');

## Contributing

To run the test suite, run `npm install` (requires
[Node.js](http://nodejs.org/) to be installed on your system), and open
`test/index.html` in your web browser.

## License

Copyright (c) 2012 John Firebaugh

MIT License (see the LICENSE file)
