import type { ROUTE_PATH_NAMES } from './routes'

type Params = Record<string, string>

export type RouteContext = Partial<{
	url: URL
	params: Params
	query: URLSearchParams
	nav: Navigation
	event: NavigateEvent
}>

export type Route = {
	path: string
	name?: string

	// Глобальные/маршрутные хуки
	beforeEnter?: (ctx?: RouteContext) => boolean | Promise<boolean>
	render: (ctx?: RouteContext & { data?: unknown }) => void | Promise<void>
	beforeLeave?: (ctx?: RouteContext) => boolean | Promise<boolean>
}


