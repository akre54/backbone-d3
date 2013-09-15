/**
 * D3 Adapter 0.1
 * For all details and documentation:
 * http://github.com/akre54/backbone-d3
 *
 * Based on the Backbone Mootools Adapter:
 * http://github.com/inkling/backbone-mootools
 *
 * Copyright 2013 Adam Krebs
 * Copyright 2011 Inkling Systems, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This file provides a basic jQuery to d3 Adapter. It allows us to run Backbone.js
 * with minimal modifications.
 */
(function(window) {
  'use strict'

  var D3Adapter = function(elements) {
    switch(Object.prototype.toString.call(elements)) {
      case "[object NodeList]":
      case "[object Array]":
      case "[object String]":
        this.d3Selection = d3.selectAll(elements);
        break;
      default:
        if (elements.nodeType){
          this.d3Selection = d3.select(elements);
        } else {
          this.d3Selection = d3.selectAll(elements);
        }
        break;
    }

    this.length = this.d3Selection.length;
    this.d3Selection[0].forEach(function(el, i) {
      this[i] = el;
    }, this);
  };

  _.extend(D3Adapter.prototype, {

    length: 0,
    d3Selection: null,

    /**
     * Set the attributes of the element defined by the D3Adapter.
     *
     * @param map:Object literal map definining the attributes and the values to which
     *     they should be set.
     *
     * @return D3Adapter The object on which this method was called.
     */
    attr: function(map) {
      this.d3Selection.attr(map);
      return this;
    },

    /**
     * Iterate over the set of elements, running a callback function on them
     *
     * @param cb:Function the callback
     */
    each: function(cb) {
      var elements = this.toArray();
      for (var i = 0, l = this.length; i < l; i++) {
        cb(this[i], i, elements);
      };
    },

    /**
     * Find all elements that match a given selector which are descendants of the
     * elements selected the D3Adapter.
     *
     * @param selector:String - A css3 selector;
     *
     * @return D3Adapter A D3Adapter containing the selected
     *     elements.
     */
    find: function(selector) {
      return new D3Adapter(this.d3Selection.selectAll(selector)[0]);
    },

    /**
     * Return the element at the specified index on the D3Adapter.
     * Equivalent to D3Adapter[index].
     *
     * @param index:Number a numerical index.
     *
     * @return HTMLElement An HTML element from the D3Adapter. Returns undefined
     *     if an element at that index does not exist.
     */
    get: function(index) {
      return index == null ?

        // Return a 'clean' array
        this.toArray() :

        // Return just the object
        (index < 0 ? this[this.d3Selection.length + index] : this[index]);
    },

    /**
     * Set the HTML contents of the elements contained by the D3Adapter.
     *
     * @param htmlString:String A string of HTML text.
     *
     * @return D3Adapter The object the method was called on or html string
     */
    html: function(htmlString) {
      if (htmlString) {
        this.d3Selection.html(htmlString);
        return this;
      } else {
        return this.d3Selection.html();
      }
    },

    /**
     * Determines if the passed selector matches the current set of elements
     * Currently *very* basic. Compares tagNames
     *
     * @param selector:String to check against
     *
     * @return Boolean
     */
    is: function(selector) {
      return this[0].tagName.toLowerCase() == selector.toLowerCase();
    },

    /**
     * Bind the elements on the D3Adapter to call the specific method for the specific
     * event.
     *
     * @param eventName:String The name of the event.
     * @param selector:String (optional) The selector of a child element to attach
     *     events onto
     * @param method:Function The callback to apply when the event is fired.
     *
     * @return D3Adapter The object the method was called on.
     */
    on: function(eventName, selector, method) {
      var adapter = selector ? this.find(selector) : this;
      adapter.d3Selection.on(eventName, function() {
        method(d3.event);
      });
      return this;
    },

    /**
     * Unbind the bound events for the element.
     */
    off: function(eventName) {
      this.d3Selection.on(eventName, null);
      return this;
    },

     /**
      * Removes from the DOM all the elements selected by the D3Adapter.
      */
    remove: function() {
      this.d3Selection.remove();
      return this;
    },

    /**
     * Add a callback for when the element (usually document) is ready.
     *
     * @param callback:function
     */
    ready: function(callback) {
      this.d3Selection.each(function() {
        if (this.readyState == 'complete') callback();
        var event = this === document ? 'DOMContentLoaded' : 'ready';
        this.addEventListener(event, callback, false);
      });
    },

    /**
     * Return the text content of all the elements selected by the D3Adapter.
     * The text of the different elements is seperated by a space.
     *
     * @return String The text contents of all the elements selected by the D3Adapter.
     */
    text: function(text) {
      return this.d3Selection.text(text);
    },

    /**
    * Retrieve all the DOM elements contained in the jQuery set, as an array.
    *
    * @return
    */
    toArray: function() {
      return [].slice.call(this);
    },

    /**
     * Fire a specific event on the elements selected by the D3Adapter.
     *
     * @param trigger:
     */
    trigger: function(eventName) {
      this.each(function(el) {
        var method = el[eventName];
        method && method.call(el);
      });
      return this;
    }
  });

  /**
   * JQuery Selector Methods
   *
   * jQuery(html) - Returns an HTML element wrapped in a D3Adapter.
   * jQuery(expression) - Returns a D3Adapter containing an element set corresponding the
   *     elements selected by the expression.
   * jQuery(expression, context) - Returns a D3Adapter containing an element set corresponding
   *     to applying the expression in the specified context.
   * jQuery(element) - Wraps the provided element in a D3Adapter and returns it.
   *
   * @return D3Adapter an adapter element containing the selected/constructed
   *     elements.
   */
  window.jQuery = window.$ = function(expression, context) {
    var elements;

    // Handle jQuery(html).
    if (typeof expression === 'string') {
      if (expression.charAt(0) === '<' && expression.charAt(expression.length - 1) === '>') {
        var container = document.createElement('div');
        container.innerHTML = expression;
        elements = container.childNodes;

        // handle $('<div>', {attrs})
        _.each(elements, function(el) {
          if (_.isObject(context)) _.extend(el, context);
        });
      } else {
        // selector
        elements = expression;
      }
      return new D3Adapter(elements);
    } else if (typeof expression == 'object') {
      if (expression instanceof D3Adapter) {
        // Handle jQuery(D3Adapter)
        return expression;
      } else {
        // Handle jQuery(element).
        return new D3Adapter(expression);
      }
    }

    // Handle jQuery(expression) and jQuery(expression, context).
    context = context || document;
    elements = d3.select(context).selectAll(expression);
    return new D3Adapter(elements);
  };

  /*
   * jQuery.ajax
   *
   * Maps a jQuery ajax request to a d3.json and sends it.
   */
  window.jQuery.ajax = function(params) {
    params = _.defaults(params, {
      error: _.identity,
      success: _.identity
    });

    var parameters = {
      url: params.url,
      method: params.type,
      data: data,
      emulation: emulation,
      onSuccess: function(responseText) {
          params.success(JSON.parse(responseText));
      },
      onFailure: params.error,
      headers: { 'Content-Type': params.contentType }
    };

    return d3.json(params.url, function(error, json) {
      if (error) {
        params.error(error);
      } else {
        params.success(json);
      }
    });
  };

})(window);