# 1.0.0-rc1

* Compatibility with chai 1.0.0-rc1
* Breaking change: the `contains` assertion now uses jQuery's `:contains`
  selector. The previous behavior of the `contains` assertion is now handled by
  the `have` assertion, corresponding to jQuery's `.has()` function.
