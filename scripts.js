/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"eiR4tFD3sDZEcxXH","label":"~/Social","bookmarks":[{"id":"1KpkdNCShHp1EjUJ","label":"> Instagram","url":"instagram.com/"},{"id":"l0ELu3gC6aYqIlt4","label":"> Twitter","url":"https://twitter.com/home"},{"id":"5RVZHP0xYJBjQUCw","label":"> WhatsApp","url":"https://web.whatsapp.com/"},{"id":"OOi19xOPE1iUrpWf","label":"> Discord","url":"https://discord.com/channels/@me"}]},{"id":"yu2RWcjHHbYRhQQN","label":"~/Media","bookmarks":[{"id":"koa2d1jxVpvcNY4W","label":"> YouTube","url":"https://www.youtube.com/"},{"id":"xb9c9lxOiXq9UtKQ","label":"> Spotify","url":"https://open.spotify.com/"},{"id":"yTtCByFBZrBaXncV","label":"> Twitch","url":"https://www.twitch.tv/?lang=es"},{"id":"h2PMusIP8pPnnGOf","label":"> Drive","url":"https://drive.google.com/drive/"}]},{"id":"q0Ap66cCH0D8ZCM3","label":"~/General","bookmarks":[{"id":"VARGcUiwrWmBC7A3","label":"> Reddit","url":"https://www.reddit.com/"},{"id":"hBD1mJ2KCCLaEduU","label":"> Github","url":"https://github.com/"},{"id":"KwApd8s4EDiO21wH","label":"> Crunchypobre","url":"https://www3.animeflv.net/"},{"id":"lQTTa82ZTvvwwAo5","label":"> Duolingo","url":"https://es.duolingo.com/learn"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
