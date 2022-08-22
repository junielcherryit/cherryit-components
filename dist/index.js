function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

var React = require('react');

var JoditEditor = React.lazy(function () {
  return new Promise(function (resolve) { resolve(_interopNamespace(require('jodit-react'))); });
});
var Editor = React.forwardRef(function (props, ref) {
  if (typeof window === 'undefined') {
    return null;
  }

  return React.createElement(React.Suspense, {
    fallback: React.createElement("div", null, "Loading")
  }, React.createElement(JoditEditor, Object.assign({
    ref: ref
  }, props)));
});

var PreviewHtml = function PreviewHtml(_ref) {
  var content = _ref.content;
  return React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: content
    }
  });
};

var domToPdf = require('dom-to-pdf');

var toPdf = function toPdf(ref, options, cb) {
  return domToPdf(ref, options, cb);
};

var Pdf = {
  toPdf: toPdf
};

exports.Editor = Editor;
exports.Pdf = Pdf;
exports.PreviewHtml = PreviewHtml;
//# sourceMappingURL=index.js.map
