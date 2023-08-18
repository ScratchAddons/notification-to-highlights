import { DOLLARS, escapeHTML, notifStyle } from '../../components/shared.js'

export const showBanner = chrome => {
  const makeBr = () => document.createElement("br")

  const notifOuterBody = document.createElement("div")
  const notifInnerBody = Object.assign(document.createElement("div"), {
    id: "sa-notification",
    style: notifStyle,
  })
  // v1.14.0 TODO in line 365
  const notifImage = Object.assign(document.createElement("img"), {
    // alt: chrome.i18n.getMessage("hexColorPickerAlt"),
    src: chrome.runtime.getURL("/images/cs/catblocks.png"),
    style: "height: 150px; border-radius: 5px; padding: 20px",
  })
  const notifText = Object.assign(document.createElement("div"), {
    id: "sa-notification-text",
    style: "margin: 12px;",
  })
  const notifTitle = Object.assign(document.createElement("span"), {
    style: "font-size: 18px; line-height: 24px; display: inline-block; margin-bottom: 12px;",
    textContent: chrome.i18n.getMessage("extensionUpdate"),
  })
  const notifClose = Object.assign(document.createElement("img"), {
    style: `
    float: right;
    cursor: pointer;
    width: 24px;`,
    title: chrome.i18n.getMessage("close"),
    src: chrome.runtime.getURL("../images/cs/close.svg"),
  })
  notifClose.addEventListener("click", () => notifInnerBody.remove(), { once: true })

  const NOTIF_TEXT_STYLE = "display: block; font-size: 14px; color: white !important;"

  const notifInnerText0 = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE + "font-weight: bold;",
    textContent: chrome.i18n
      .getMessage("extensionHasUpdated", DOLLARS)
      .replace(/\$(\d+)/g, (_, i) => [chrome.runtime.getManifest().version][Number(i) - 1]),
  })
  const notifInnerText1 = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE,
    innerHTML: escapeHTML(chrome.i18n.getMessage("extensionUpdateInfo1", DOLLARS)).replace(
      /\$(\d+)/g,
      (_, i) =>
        [
          /*
          Object.assign(document.createElement("b"), { textContent: chrome.i18n.getMessage("newFeature") }).outerHTML,
          Object.assign(document.createElement("b"), { textContent: chrome.i18n.getMessage("newFeatureName") })
            .outerHTML, 
          */
          Object.assign(document.createElement("a"), {
            href: "https://scratch.mit.edu/scratch-addons-extension/settings",
            target: "_blank",
            textContent: chrome.i18n.getMessage("scratchAddonsSettings"),
          }).outerHTML,
        ][Number(i) - 1]
    ),
  })
  const notifInnerText2 = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE,
    innerHTML: escapeHTML(chrome.i18n.getMessage("extensionUpdateInfo2", DOLLARS)).replace(
      "$1",
      Object.assign(document.createElement("a"), {
        href: "https://scratchaddons.com/translate",
        target: "_blank",
        textContent: chrome.i18n.getMessage("helpTranslateScratchAddons"),
      }).outerHTML
    ),
  })
  const notifFooter = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE,
  })
  const notifFooterChangelog = Object.assign(document.createElement("a"), {
    href: `https://scratchaddons.com/changelog?versionname=${chrome.runtime.getManifest().version}-notif`,
    target: "_blank",
    textContent: chrome.i18n.getMessage("notifChangelog"),
  })
  const notifFooterFeedback = Object.assign(document.createElement("a"), {
    href: `https://scratchaddons.com/feedback?version=${chrome.runtime.getManifest().version}-notif`,
    target: "_blank",
    textContent: chrome.i18n.getMessage("feedback"),
  })
  const notifFooterTranslate = Object.assign(document.createElement("a"), {
    href: "https://scratchaddons.com/translate",
    target: "_blank",
    textContent: chrome.i18n.getMessage("translate"),
  })
  const notifFooterLegal = Object.assign(document.createElement("small"), {
    textContent: chrome.i18n.getMessage("notAffiliated"),
  })
  notifFooter.appendChild(notifFooterChangelog)
  notifFooter.appendChild(document.createTextNode(" | "))
  notifFooter.appendChild(notifFooterFeedback)
  notifFooter.appendChild(document.createTextNode(" | "))
  notifFooter.appendChild(notifFooterTranslate)
  notifFooter.appendChild(makeBr())
  notifFooter.appendChild(notifFooterLegal)

  notifText.appendChild(notifTitle)
  notifText.appendChild(notifClose)
  notifText.appendChild(makeBr())
  notifText.appendChild(notifInnerText0)
  notifText.appendChild(makeBr())
  notifText.appendChild(notifInnerText1)
  notifText.appendChild(makeBr())
  notifText.appendChild(notifInnerText2)
  notifText.appendChild(makeBr())
  notifText.appendChild(notifFooter)

  notifInnerBody.appendChild(notifImage)
  notifInnerBody.appendChild(notifText)

  notifOuterBody.appendChild(notifInnerBody)

  return notifInnerBody
}