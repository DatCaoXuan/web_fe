import toApiUrl from "./toApiUrl";

function toDownloadUrl(url) {
	return toApiUrl(`download?file=${url.replaceAll('/', '%2F')}`)
}

export default toDownloadUrl
