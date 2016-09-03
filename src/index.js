import {shell} from 'electron'

const BROWSER_COMPONENT = 'com.robinmalfait.browser';

export default robot => {
    const {React} = robot.dependencies;
    const {Full} = robot.cards
    const {Webview, StyleSheet, css} = robot.UI

    const styles = StyleSheet.create({
      window: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      },
      faviconStyles: {
          margin: '0 5px',
          lineHeight: '48px',
          verticalAlign: 'middle'
      }
    })

    const renderTitle = (url) => (
        <span>
            <img className={css(styles.faviconStyles)} src={robot.faviconUrl(url)}/>
            Browsing: {url}
        </span>
    )

    const Browser = ({url, ...other}) => (
        <Full
            {...other}
            title={renderTitle(url)}
            actions={[{
                type: 'divider'
            }, {
                label: 'Open in browser',
                onClick: () => shell.openExternal(url)
            }]}
        >
            <Webview className={css(styles.window)} src={url}/>
        </Full>
    )

    robot.registerComponent(Browser, BROWSER_COMPONENT)

    robot.listen(/^browse (.*)$/, {
      description: "Browse a website",
      usage: 'browse <url>'
    }, (res) => {
        const url = robot.formatURL(res.matches[1]);

        robot.addCard(BROWSER_COMPONENT, { url })
    })
}
