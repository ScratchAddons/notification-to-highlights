export const DOLLARS = [
	"$1",
	"$2",
	"$3",
	"$4",
	"$5",
	"$6",
	"$7",
	"$8",
	"$9",
];
export const escapeHTML = (str) => str.replace(/([<>'"&])/g, (_, l) => `&#${l.charCodeAt(0)};`);
export const notifStyle = `
width: 700px;
max-height: 270px;
display: flex;
align-items: center;
padding: 10px;
border-radius: 10px;
background-color: #222;
color: white;
z-index: 99999;
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
text-shadow: none;
line-height: 1em;`

export const generateChromeObject = (localeText) => {
	const locale = JSON.parse(localeText)
	return {
		i18n: {
			getMessage(s) {
				return locale[s]?.message || `[${s}: string missing]`;
			},
			getUILanguage() {
				return "en";
			},
		},
		runtime: {
			getManifest() {
				return {
					version: "1.x.x",
				};
			},
			getURL() {
				return "about:blank";
			},
		},
	};
};