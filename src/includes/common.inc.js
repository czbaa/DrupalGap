/**
 * Get or set a drupalgap configuration setting.
 * @param name
 * @returns {*}
 */
dg.config = function(name) {
  var value = typeof arguments[1] !== 'undefined' ? arguments[1] : null;
  if (value) {
    dg.settings[name] = value;
    return;
  }
  return dg.settings[name];
};

// Mode.

/**
 *
 * @returns {*}
 */
dg.getMode = function() { return this.config('mode'); };

/**
 *
 * @param mode
 */
dg.setMode = function(mode) { this.config('mode', mode); };

/**
 *
 * @returns {*}
 */
dg.getFrontPagePath = function() {
  var front = dg.config('front');
  if (front == null) { front = 'dg'; }
  return front;
};

/**
 * Gets the current page title.
 * @returns {*}
 */
dg.getTitle = function() { return dg._title; };

/**
 * Sets the current page title.
 * @param title
 */
dg.setTitle = function(title) {
  title = !title ? '' : title;
  if (typeof title === 'object') { title = title._title ? title._title : ''; }
  dg._title = title;
};

/**
 * Gets the current document title.
 * @returns {*}
 */
dg.getDocumentTitle = function() { return document.title; };

/**
 * Sets the current document title.
 * @param title
 */
dg.setDocumentTitle = function(title) {
  title = !title ? dg.config('title') : title;
  document.title = dg.theme('document_title', { _title: dg.t(title) });
};

/**
 *
 * @param attributes
 * @returns {string}
 */
dg.attributes = function(attributes) {
  var attrs = '';
  if (attributes) {
    for (var name in attributes) {
      if (!attributes.hasOwnProperty(name)) { continue; }
      var value = attributes[name];
      if (Array.isArray(value) && value.length) {
        attrs += name + '="' + value.join(' ') + '" ';
      }
      else if (value != '') {
        // @todo - if someone passes in a value with double quotes, this
        // will break. e.g.
        // 'onclick':'_drupalgap_form_submit("' + form.id + "');'
        // will break, but
        // 'onclick':'_drupalgap_form_submit(\'' + form.id + '\');'
        // will work.
        attrs += name + '="' + value + '" ';
      }
      else {
        // The value was empty, just place the attribute name on the
        // element, unless it was an empty class.
        if (name != 'class') { attrs += name + ' '; }
      }
    }
  }
  return attrs;
};

/**
 *
 * @param constructor
 * @param argArray
 * @returns {*}
 * @credit http://stackoverflow.com/a/14378462/763010
 */
dg.applyToConstructor = function(constructor, argArray) {
  var args = [null].concat(argArray);
  var factoryFunction = constructor.bind.apply(constructor, args);
  return new factoryFunction();
};

/**
 *
 * @param id
 * @returns {string}
 */
dg.cleanCssIdentifier = function(id) {
  return id.replace(/_/g, '-').toLowerCase();
};

/**
 * Given a string separated by underscores or hyphens, this will return the
 * camel case version of a string. For example, given "foo_bar" or "foo-bar",
 * this will return "fooBar".
 * @see http://stackoverflow.com/a/2970667/763010
 */
dg.getCamelCase = function(str) {
  return str.replace(/[-_]([a-z])/g, function (g) { return g[1].toUpperCase(); });
};

/**
 *
 * @param str
 * @param separator
 * @returns {string}
 */
dg.killCamelCase = function(str, separator) {
  return jDrupal.lcfirst(str).replace(/([A-Z])/g, separator + '$1').toLowerCase();
};

/**
 * Given a drupal image file uri, this will return the path to the image on the Drupal site.
 * @param uri
 * @returns {*}
 */
dg.imagePath = function(uri) {
  var src = dg.restPath() + uri;
  if (src.indexOf('public://') != -1) {
    src = src.replace('public://', dg.config('files').publicPath + '/');
  }
  else if (src.indexOf('private://') != -1) {
    src = src.replace('private://', dg.config('files').privatePath + '/');
  }
  return src;
};

/**
 * Returns html for a simple link.
 * @param text
 * @param path
 * @param options
 * @returns {String}
 */
dg.l = function(text, path, options) {
  if (!options) { options = {}; }
  if (!options._text) { options._text = text; }
  if (!options._path) { options._path = path; }
  return dg.theme('link', options);
};

/**
 * Returns html for a button link.
 * @param text
 * @param path
 * @param options
 * @returns {String}
 */
dg.bl = function(text, path, options) { return this.l.apply(this, arguments); };

/**
 * Given an id, this will remove its element from the DOM.
 * @param id
 */
dg.removeElement = function(id) {
  var elem = document.getElementById(id);
  elem.parentElement.removeChild(elem);
};

/**
 *
 * @param text
 * @returns {*}
 */
dg.t = function(text) { return text; };
