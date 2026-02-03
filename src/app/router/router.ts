import { routes } from './routes'

function shouldNotIntercept(navigationEvent: NavigateEvent) {
	return (
		// scrolling к контенту.
		navigationEvent.hashChange ||
		!navigationEvent.canIntercept ||
		navigationEvent.downloadRequest ||
		navigationEvent.formData
	)
}

export function initRouter() {
	window.navigation.addEventListener('navigate', navigateEvent => {
		if (shouldNotIntercept(navigateEvent)) return

		const url = new URL(navigateEvent.destination.url)

		navigateEvent.intercept({
			async handler() {
				routes.find(route => route.path === url.pathname)?.render()
			},
		})
	})
}