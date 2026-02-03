export { }

declare global {
	interface Window {
		navigation: Navigation
	}

	interface Navigation extends EventTarget {
		readonly activation: NavigationActivation
		readonly canGoBack: boolean
		readonly canGoForward: boolean
		readonly currentEntry: NavigationHistoryEntry
		readonly transition: NavigationTransition | null

		back(): NavigationNavigateResult
		forward(): NavigationNavigateResult
		entries(): NavigationHistoryEntry[]
		navigate(
			url: string | URL,
			options?: NavigationNavigateOptions
		): NavigationNavigateResult
		reload(options?: NavigationReloadOptions): NavigationNavigateResult
		traverseTo(key: string): NavigationNavigateResult
		updateCurrentEntry(options: NavigationUpdateCurrentEntryOptions): void

		// Events (you can add specific handler props if needed)
		addEventListener(
			type: "currententrychange",
			listener: (event: NavigationCurrentEntryChangeEvent) => void,
			options?: boolean | AddEventListenerOptions
		): void

		addEventListener(
			type: "navigate",
			listener: (event: NavigateEvent) => void,
			options?: boolean | AddEventListenerOptions
		): void

		// …plus other Navigation events like "navigateerror" & "navigatesuccess"
	}

	interface NavigationActivation {
		readonly entry: NavigationHistoryEntry
		readonly from: NavigationHistoryEntry
		readonly navigationType: string
	}

	interface NavigationHistoryEntry {
		readonly id: string
		readonly key: string
		readonly index: number
		readonly url: string
	}

	interface NavigationTransition {
		readonly finished: Promise<void>
		readonly info: any // (could be typed more strictly later)
	}

	interface NavigationNavigateResult {
		readonly finished: Promise<void>
	}

	interface NavigationNavigateOptions {
		state?: any
		info?: any
		history?: "push" | "replace"
	}

	interface NavigationReloadOptions {
		state?: any
	}

	interface NavigationUpdateCurrentEntryOptions {
		state: any
	}

	interface NavigationCurrentEntryChangeEvent extends Event {
		readonly type: "currententrychange"
	}

	type NavigationType = "push" | "reload" | "replace" | "traverse"

	interface NavigateEvent extends Event {
		/** true, если навигацию можно перехватить (не cross-origin и т.п.) */
		readonly canIntercept: boolean // :contentReference[oaicite:1]{index=1}

		/** объект назначения навигации */
		readonly destination: NavigationDestination // :contentReference[oaicite:2]{index=2}

		/** имя файла для download-навигации (<a download>), иначе null */
		readonly downloadRequest: string | null // :contentReference[oaicite:3]{index=3}

		/** FormData при POST submit, иначе null */
		readonly formData: FormData | null // :contentReference[oaicite:4]{index=4}

		/** true, если это переход по #fragment */
		readonly hashChange: boolean // :contentReference[oaicite:5]{index=5}

		/** true, если UA сделал визуальный переход до dispatch события */
		readonly hasUAVisualTransition: boolean // :contentReference[oaicite:6]{index=6}

		/** info, переданный в navigation.navigate/back/forward/... либо undefined */
		readonly info: unknown // :contentReference[oaicite:7]{index=7}

		/** тип навигации: push | reload | replace | traverse */
		readonly navigationType: NavigationType // :contentReference[oaicite:8]{index=8}

		/** abortится если навигация отменена */
		readonly signal: AbortSignal // :contentReference[oaicite:9]{index=9}

		/** элемент-инициатор (ссылка/форма/кнопка), иначе null */
		readonly sourceElement: Element | null // :contentReference[oaicite:10]{index=10}

		/** true, если инициировано пользователем */
		readonly userInitiated: boolean // :contentReference[oaicite:11]{index=11}

		/**
		 * Перехват навигации: превращает её в same-document к destination.url,
		 * позволяет задать handler + опции скролла/фокуса.
		 */
		intercept(options?: NavigateEventInterceptOptions): void // :contentReference[oaicite:12]{index=12}

		/** вручную запустить browser-driven scroll, если нужно раньше окончания handler */
		scroll(): void // :contentReference[oaicite:13]{index=13}
	}

	interface NavigateEventInterceptOptions {
		handler?: () => void | Promise<void>
		focusReset?: "after-transition" | "manual"
		scroll?: "after-transition" | "manual"
	}

	interface NavigationDestination {
		readonly id: string
		readonly index: number
		readonly key: string
		readonly sameDocument: boolean
		readonly url: string
		getState(): unknown
	}

	interface NavigationDestination {
		readonly id: string
		readonly index: number
		readonly key: string
		readonly sameDocument: boolean
		readonly url: string
		getState(): any
	}
}
