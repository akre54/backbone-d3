Backbone D3 is an adapter for using Backbone with the D3 framework. The basic
idea behind it is to use the jQuery API as a wrapper to D3 calls to allow us to
seamlessly use Backbone.js without changing its internals.

## Usage

To use backbone-d3 just include it on your page after d3 and before backbone.js:

For example:

    <script src="http://www.yourwebsite.com/d3-3.3.3.js>
    <script src="http://www.yourwebsite.com/d3-adapter.js"></script>
    <script src="http://www.yourwebsite.com/backbone.js"></script>

Note: backbone-D3 does not remap the $ object. It only remaps the jQuery object.

## Limitations

The d3-backbone Adapter currently doesn't support attaching multiple views to a single
element. Ajax and history support are work-in-progress, and not yet fully implemented.
Because of these limitations the following Backbone unit tests are expected to fail on
Backbone 1.0.0:

 * Backbone.View: View: delegateEvents
 * Backbone.View: View: undelegateEvents
 * Backbone.View: Any tests with complex $el.is() tests
 * All Backbone.Router and Backbone.History

## Contributors
 * Adam Krebs ([@akre54](http://sberkmada.com))

 From the original Backbone-MooTools project:
 * Avi Itskovich ([@aitskovi](http://www.twitter.com/aitskovi))
 * Dimitar Christoff ([@D_mitar](http://www.twitter.com/D_mitar))

## Supported Libraries

This library is designed to be used with the backbone project, which is linked to in a
submodule. All the details on backbone and its license can be found at
[http://documentcloud.github.com/backbone](http://documentcloud.github.com/backbone).

## Copyright and License

Copyright 2013 Adam Krebs

Copyright 2011 Inkling Systems, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

