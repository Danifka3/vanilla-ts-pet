type Params = Record<string, string>

export type RouteContext = Partial<{
	url: URL
	params: Params
	query: URLSearchParams
	nav: Navigation
	event: NavigateEvent
}>

export type PageInstance = {
	mount(): void | Promise<void>
	unmount(): void | Promise<void>
}

export type Route = {
	path: string
	name?: string

	// Глобальные/маршрутные хуки
	beforeEnter?: (ctx?: RouteContext) => boolean | Promise<boolean>
	render: (ctx?: RouteContext & { data?: unknown }) => PageInstance
	beforeLeave?: (ctx?: RouteContext) => boolean | Promise<boolean>
}


