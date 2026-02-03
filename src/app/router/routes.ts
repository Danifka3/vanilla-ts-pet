import type { Route } from './types'
import { setupCounter } from '../../counter.ts'

export const ROUTE_PATHS: Record<string, string> = {
	HOME_URL: '/',
	CONTENT: '/content',
	NO_SUCH_PAGE: '/404',
} as const



export const routes: Route[] = [
	{
		path: ROUTE_PATHS.HOME_URL,
		name: 'HOME_URL',

		render: () => {
			document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
				<div>
					Домашняя страница
					
					<a href="/content">Контент</a>
				</div>
				`
		}
	},
	{
		path: ROUTE_PATHS.CONTENT,
		name: 'CONTENT',

		render: () => {
			document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
				<div>
					<button id="counter" class="counter" type="button"></button>
				</div>
				`

			setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
		}
	}
]
