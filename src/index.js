import { shell } from 'electron'
import styles from './styles'

const BROWSER_COMPONENT = 'com.robinmalfait.browser';

export default robot => {
  const { React } = robot.dependencies;
  const { Full } = robot.cards
  const { Webview } = robot.UI
  const { enhance, withStyles } = robot

  const renderTitle = (styles, url) => (
    <span>
        <img className={styles.faviconStyles} src={robot.faviconUrl(url)}/>
        Browsing: {url}
    </span>
  )

  const Browser = ({ styles, url, ...other }) => (
    <Full
      {...other}
      title={renderTitle(styles, url)}
      actions={[{
          label: 'Open in browser',
          onClick: () => shell.openExternal(url)
      }]}
    >
      <Webview className={styles.window} src={url}/>
    </Full>
  )

  robot.registerComponent(enhance(Browser, [
    withStyles(styles)
  ]), BROWSER_COMPONENT)

  robot.listen(/^browse (.*)$/, {
    description: "Browse a website",
    usage: 'browse <url>'
  }, (res) => {
    const url = robot.formatURL(res.matches[ 1 ]);

    robot.addCard(BROWSER_COMPONENT, { url })
  })
}
