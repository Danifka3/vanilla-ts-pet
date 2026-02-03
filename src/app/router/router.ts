import { routes } from './routes'

const mappedRoutes = routes.map(route => ({
	route: route,
	pattern: new URLPattern({ pathname: route.path })
}))

function matchRoute(url: string | URL) {
	for (const route of mappedRoutes) {
		const result = route.pattern.exec(url)
		if (!result) continue

		return {
			route: route.route,
			params: result.pathname.groups ?? {},
			query: result.search.groups ?? {},
		}
	}

	return null
}

function shouldNotIntercept(navigationEvent: NavigateEvent) {
	return !navigationEvent.canIntercept ||
		navigationEvent.hashChange ||
		navigationEvent.downloadRequest ||
		navigationEvent.formData
}

export function initRouter() {
	window.navigation.addEventListener('navigate', navigateEvent => {
		if (shouldNotIntercept(navigateEvent)) return

		const url = new URL(navigateEvent.destination.url)

		navigateEvent.intercept({
			async handler() {
				console.log(matchRoute(url))
			},
		})
	})
}