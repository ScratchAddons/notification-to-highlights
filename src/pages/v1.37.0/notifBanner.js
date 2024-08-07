import { DOLLARS, escapeHTML, notifStyle } from '../../components/shared.js'

export const showBanner = chrome => {
  const makeBr = () => document.createElement("br")

  const notifInnerBody = Object.assign(document.createElement("div"), {
    id: "sa-notification",
    style: notifStyle,
  })
  /*
  const notifImageLink = Object.assign(document.createElement("a"), {
    href: "https://www.youtube.com/watch?v=oRo0tMWEpiA",
    target: "_blank",
    rel: "noopener",
    referrerPolicy: "strict-origin-when-cross-origin",
  });
  // Thumbnails were 100px height
  */
  const notifImage = Object.assign(document.createElement("img"), {
    // alt: chrome.i18n.getMessage("hexColorPickerAlt"),
    src: chrome.runtime.getURL("/images/cs/icon.png"),
    style: "height: 150px; border-radius: 5px; padding: 20px",
  })
  const notifText = Object.assign(document.createElement("div"), {
    id: "sa-notification-text",
    style: "margin: 12px;",
  })
  const notifTitle = Object.assign(document.createElement("span"), {
    style: "font-size: 18px; line-height: normal; display: inline-block; margin-bottom: 12px;",
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

  const NOTIF_TEXT_STYLE = "display: block; color: white !important;"
  const NOTIF_LINK_STYLE = "color: #1aa0d8; font-weight: normal; text-decoration: underline;"

  const notifInnerText0 = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE + "font-weight: bold;",
    textContent: chrome.i18n
      .getMessage("extensionHasUpdated", DOLLARS)
      .replace(/\$(\d+)/g, (_, i) => [chrome.runtime.getManifest().version][Number(i) - 1]),
  })
  const notifInnerText1 = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE,
    innerHTML: escapeHTML(chrome.i18n.getMessage("extensionUpdateInfo1_v1_37", DOLLARS)).replace(
      /\$(\d+)/g,
      (_, i) =>
        [
          /*
          Object.assign(document.createElement("b"), { textContent: chrome.i18n.getMessage("newFeature") }).outerHTML,
          Object.assign(document.createElement("b"), { textContent: chrome.i18n.getMessage("newFeatureName") })
            .outerHTML,
          */
          Object.assign(document.createElement("a"), {
            href: "https://scratch.mit.edu/scratch-addons-extension/settings?source=updatenotif",
            target: "_blank",
            style: NOTIF_LINK_STYLE,
            textContent: chrome.i18n.getMessage("scratchAddonsSettings"),
          }).outerHTML,
        ][Number(i) - 1]
    ),
  })
  const notifInnerText2 = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE,
    textContent: chrome.i18n.getMessage("extensionUpdateInfo2_v1_37"),
  })
  const notifFooter = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE,
  })
  const uiLanguage = chrome.i18n.getUILanguage()
  const localeSlash = uiLanguage.startsWith("en") ? "" : `${uiLanguage.split("-")[0]}/`
  const utm = `utm_source=extension&utm_medium=updatenotification&utm_campaign=v${chrome.runtime.getManifest().version
    }`
  const notifFooterChangelog = Object.assign(document.createElement("a"), {
    href: `https://scratchaddons.com/${localeSlash}changelog?${utm}`,
    target: "_blank",
    style: NOTIF_LINK_STYLE,
    textContent: chrome.i18n.getMessage("notifChangelog"),
  })
  const notifFooterFeedback = Object.assign(document.createElement("a"), {
    href: `https://scratchaddons.com/${localeSlash}feedback/?ext_version=${chrome.runtime.getManifest().version
      }&${utm}`,
    target: "_blank",
    style: NOTIF_LINK_STYLE,
    textContent: chrome.i18n.getMessage("feedback"),
  })
  const notifFooterTranslate = Object.assign(document.createElement("a"), {
    href: "https://scratchaddons.com/translate",
    target: "_blank",
    style: NOTIF_LINK_STYLE,
    textContent: chrome.i18n.getMessage("translate"),
  })
  const notifFooterLegal = Object.assign(document.createElement("span"), {
    style: NOTIF_TEXT_STYLE + "font-size: 12px;",
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

  // notifImageLink.appendChild(notifImage);

  notifInnerBody.appendChild(notifImage)
  notifInnerBody.appendChild(notifText)

  return notifInnerBody
}
