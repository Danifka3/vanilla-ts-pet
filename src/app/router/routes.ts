import type { Route, RouteContext } from './types'
import { setupCounter } from '../../counter.ts'

export const ROUTE_PATHS: Record<string, string> = {
	HOME_URL: '/',
	BOOKS: '/books',
	BOOK_PAGE: '/books/:id',
	CONTENT: '/content',
	NO_SUCH_PAGE: '/404',
} as const

export const routes: Route[] = [
	{
		path: ROUTE_PATHS.HOME_URL,
		name: 'HOME_URL',

		render: () => ({
			mount() {
				document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
						<div>
							Домашняя страница
							
							<a href="/content">Контент</a>
						</div>
						`
			},
			unmount() { }
		})
	},
	{
		path: ROUTE_PATHS.BOOKS,
		name: 'BOOKS',

		render: () => ({
			mount() {
				document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
					<div>
						Книги
						
						<a href="/content">Контент</a>
					</div>
					`
			},
			unmount() { }
		})

	},
	{
		path: ROUTE_PATHS.CONTENT,
		name: 'CONTENT',

		render: () => ({
			mount() {
				document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
				<div>
					<button id="counter" class="counter" type="button"></button>
				</div>
				`

				setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
			},
			unmount() { }
		})
	},

	{
		path: ROUTE_PATHS.NO_SUCH_PAGE,
		name: 'NO_SUCH_PAGE',

		render: () => ({
			mount() {
				document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
					<div>
						404
					</div> 
					`
			},
			unmount() { }
		})

	},
]
