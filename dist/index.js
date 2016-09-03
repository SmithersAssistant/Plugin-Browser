'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = require('electron');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var BROWSER_COMPONENT = 'com.robinmalfait.browser';

exports.default = function (robot) {
    var React = robot.dependencies.React;
    var Full = robot.cards.Full;
    var _robot$UI = robot.UI;
    var Webview = _robot$UI.Webview;
    var StyleSheet = _robot$UI.StyleSheet;
    var css = _robot$UI.css;


    var styles = StyleSheet.create({
        window: {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        faviconStyles: {
            margin: '0 5px',
            lineHeight: '48px',
            verticalAlign: 'middle'
        }
    });

    var renderTitle = function renderTitle(url) {
        return React.createElement(
            'span',
            null,
            React.createElement('img', { className: css(styles.faviconStyles), src: robot.faviconUrl(url) }),
            'Browsing: ',
            url
        );
    };

    var Browser = function Browser(_ref) {
        var url = _ref.url;

        var other = _objectWithoutProperties(_ref, ['url']);

        return React.createElement(
            Full,
            _extends({}, other, {
                title: renderTitle(url),
                actions: [{
                    type: 'divider'
                }, {
                    label: 'Open in browser',
                    onClick: function onClick() {
                        return _electron.shell.openExternal(url);
                    }
                }]
            }),
            React.createElement(Webview, { className: css(styles.window), src: url })
        );
    };

    robot.registerComponent(Browser, BROWSER_COMPONENT);

    robot.listen(/^browse (.*)$/, {
        description: "Browse a website",
        usage: 'browse <url>'
    }, function (res) {
        var url = robot.formatURL(res.matches[1]);

        robot.addCard(BROWSER_COMPONENT, { url: url });
    });
};