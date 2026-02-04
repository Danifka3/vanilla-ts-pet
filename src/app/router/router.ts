import { ROUTE_PATHS, routes } from './routes'

let currentRoute: { route: any; context: any } | null = null

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
	window.navigation.addEventListener('navigate', (navigateEvent) => {
		if (shouldNotIntercept(navigateEvent)) return

		const url = new URL(navigateEvent.destination.url)
		const matchedRoute = matchRoute(url)

		navigateEvent.intercept({
			async handler() {
				const context = {
					url: url,
					params: matchedRoute?.params,
					query: matchedRoute?.query,
					event: navigateEvent
				}

				if (currentRoute?.route?.beforeLeave) {
					const ok = await currentRoute.route.beforeLeave(currentRoute.context)
					if (!ok) {
						window.navigation.reload()
						return
					}
				}

				const lastPage = currentRoute?.route.render(context)
				lastPage?.unmount()

				const nextRoute = matchedRoute?.route ?? routes.find(r => r.path === ROUTE_PATHS.NO_SUCH_PAGE)
				if (!nextRoute) return

				if (matchedRoute?.route?.beforeEnter) {
					const ok = await matchedRoute?.route.beforeEnter(context)
					if (!ok) {
						window.navigation.reload()
						return
					}
				}

				const renderPage = nextRoute.render(context)
				renderPage?.mount()

				currentRoute = { route: nextRoute, context }
			},
		})
	})
}