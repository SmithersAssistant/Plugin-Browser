'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = require('electron');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BROWSER_COMPONENT = 'com.robinmalfait.browser';

exports.default = function (robot) {
  var React = robot.dependencies.React;
  var Full = robot.cards.Full;
  var Webview = robot.UI.Webview;
  var enhance = robot.enhance;
  var withStyles = robot.withStyles;


  var renderTitle = function renderTitle(styles, url) {
    return React.createElement(
      'span',
      null,
      React.createElement('img', { className: styles.faviconStyles, src: robot.faviconUrl(url) }),
      'Browsing: ',
      url
    );
  };

  var Browser = function Browser(_ref) {
    var styles = _ref.styles;
    var url = _ref.url;

    var other = _objectWithoutProperties(_ref, ['styles', 'url']);

    return React.createElement(
      Full,
      _extends({}, other, {
        title: renderTitle(styles, url),
        actions: [{
          type: 'divider'
        }, {
          label: 'Open in browser',
          onClick: function onClick() {
            return _electron.shell.openExternal(url);
          }
        }]
      }),
      React.createElement(Webview, { className: styles.window, src: url })
    );
  };

  robot.registerComponent(enhance(Browser, [withStyles(_styles2.default)]), BROWSER_COMPONENT);

  robot.listen(/^browse (.*)$/, {
    description: "Browse a website",
    usage: 'browse <url>'
  }, function (res) {
    var url = robot.formatURL(res.matches[1]);

    robot.addCard(BROWSER_COMPONENT, { url: url });
  });
};