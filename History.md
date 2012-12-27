# master

# 1.1.1

* Support inspect with 0 depth
* Set jQuery as an AMD dependency

# 1.1.0

* Fix override of 'have' so it only returns the have function when called on a
  non-jQuery object.
* Fix data assertion chaining
* Added `css` and `empty` assertions

# 1.0.0

* Compatibility with chai 1.0.0
* Breaking change: the `contains` assertion now uses jQuery's `:contains`
  selector. The previous behavior of the `contains` assertion is now handled by
  the `have` assertion, corresponding to jQuery's `.has()` function.
