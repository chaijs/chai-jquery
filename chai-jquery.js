(function (chaiJquery) {
  // Module systems magic dance.
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = chaiJquery;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return chaiJquery;
    });
  } else {
    // Other environment (usually <script> tag): pass into global chai
    var global = (false || eval)("this");
    global.chai.use(chaiJquery);
  }
}(function (chai, utils) {
  var inspect = utils.inspect,
      flag = utils.flag;

  jQuery.fn.inspect = function (depth) {
    var el = jQuery('<div />').append(this.clone());
    if (depth) {
      var children = el.children();
      while (depth-- > 0)
        children = children.children();
      children.html('...');
    }
    return el.html();
  };

  utils.addMethod(chai.Assertion, 'attr', function (name, val) {
    var actual = flag(this, 'object').attr(name);

    if (!flag(this, 'negate') || undefined === val) {
      this.assert(
          undefined !== actual
        , 'expected #{this} to have a #{exp} attribute'
        , 'expected #{this} not to have a #{exp} attribute'
        , name
      );
    }

    if (undefined !== val) {
      this.assert(
          val === actual
        , 'expected #{this} to have a ' + inspect(name) + ' attribute with the value #{exp}, but the value was #{act}'
        , 'expected #{this} not to have a ' + inspect(name) + ' attribute with the value #{act}'
        , val
        , actual
      );
    }

    flag(this, 'object', actual);
  });

  utils.addMethod(chai.Assertion, 'data', function (name, val) {
    // Work around a chai bug (https://github.com/logicalparadox/chai/issues/16)
    if (flag(this, 'negate') && undefined !== val && undefined === flag(this, 'object').data(name)) {
      return;
    }

    var assertion = new chai.Assertion(flag(this, 'object').data());
    if (flag(this, 'negate'))
      assertion = assertion.not;
    assertion.property(name, val);
  });

  utils.addMethod(chai.Assertion, 'class', function (className) {
    this.assert(
        flag(this, 'object').hasClass(className)
      , 'expected #{this} to have class #{exp}'
      , 'expected #{this} not to have class #{exp}'
      , className
    );
  });

  utils.addMethod(chai.Assertion, 'id', function (id) {
    this.assert(
        flag(this, 'object').attr('id') === id
      , 'expected #{this} to have id #{exp}'
      , 'expected #{this} not to have id #{exp}'
      , id
    );
  });

  utils.addMethod(chai.Assertion, 'html', function (html) {
    this.assert(
        flag(this, 'object').html() === html
      , 'expected #{this} to have HTML #{exp}'
      , 'expected #{this} not to have HTML #{exp}'
      , html
    );
  });

  utils.addMethod(chai.Assertion, 'text', function (text) {
    this.assert(
        flag(this, 'object').text() === text
      , 'expected #{this} to have text #{exp}'
      , 'expected #{this} not to have text #{exp}'
      , text
    );
  });

  utils.addMethod(chai.Assertion, 'value', function (value) {
    this.assert(
        flag(this, 'object').val() === value
      , 'expected #{this} to have value #{exp}'
      , 'expected #{this} not to have value #{exp}'
      , value
    );
  });

  jQuery.each(['visible', 'hidden', 'selected', 'checked', 'disabled'], function (i, attr) {
    utils.addProperty(chai.Assertion, attr, function () {
      this.assert(
          flag(this, 'object').is(':' + attr)
        , 'expected #{this} to be ' + attr
        , 'expected #{this} not to be ' + attr);
    });
  });

  utils.overwriteProperty(chai.Assertion, 'exist', function (_super) {
    return function () {
      var obj = flag(this, 'object');
      if (obj instanceof jQuery) {
        this.assert(
            obj.length > 0
          , 'expected ' + inspect(obj.selector) + ' to exist'
          , 'expected ' + inspect(obj.selector) + ' not to exist');
      } else {
        _super.apply(this, arguments);
      }
    };
  });

  utils.overwriteProperty(chai.Assertion, 'be', function (_super) {
    return function () {
      var be = function (selector) {
        var obj = flag(this, 'object');
        if (obj instanceof jQuery) {
          this.assert(
              obj.is(selector)
            , 'expected #{this} to be #{exp}'
            , 'expected #{this} not to be #{exp}'
            , selector
          );
        } else {
          _super.apply(this, arguments);
        }
      };
      be.__proto__ = this;
      return be;
    }
  });

  utils.overwriteMethod(chai.Assertion, 'match', function (_super) {
    return function (selector) {
      var obj = flag(this, 'object');
      if (obj instanceof jQuery) {
        this.assert(
            obj.is(selector)
          , 'expected #{this} to match #{exp}'
          , 'expected #{this} not to match #{exp}'
          , selector
        );
      } else {
        _super.apply(this, arguments);
      }
    }
  });

  utils.overwriteProperty(chai.Assertion, 'contain', function (_super) {
    return function () {
      _super.apply(this, arguments);
      var contain = function (text) {
        var obj = flag(this, 'object');
        if (obj instanceof jQuery) {
          this.assert(
              obj.is(':contains(\'' + text + '\')')
            , 'expected #{this} to contain #{exp}'
            , 'expected #{this} not to contain #{exp}'
            , text
          );
        }
      };
      contain.__proto__ = this;
      return contain;
    }
  });

  utils.overwriteProperty(chai.Assertion, 'have', function (_super) {
    return function () {
      _super.apply(this, arguments);
      var have = function (selector) {
        var obj = flag(this, 'object');
        if (obj instanceof jQuery) {
          this.assert(
              // Using find() rather than has() to work around a jQuery bug:
              //   http://bugs.jquery.com/ticket/11706
              obj.find(selector).length > 0
            , 'expected #{this} to have #{exp}'
            , 'expected #{this} not to have #{exp}'
            , selector
          );
        }
      };
      have.__proto__ = this;
      return have;
    }
  });
}));
