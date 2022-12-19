export interface Condition {
	name?: string
	value: string
	include: boolean
	condition: number
	url?: string
	operator?: string
	favorite_url_id: string
}

export interface FavoriteUrlScope {
	favoriteUrlScopeConditions: Array<Condition>
	urlScopes: Array<Condition>
}

export interface Targeting {
	key: string
	success: boolean
	conditions?: Array<Condition> | FavoriteUrlScope
	name: string
}

export interface Result {
	key: string
	name: string
	type: string
	status: string
	variationID: number
	variationName: string
	targetings: {
		targetPages: {
			[key: string]: Targeting
		}
		qaParameters: {
			[key: string]: Targeting
		}
		segment: Array<Targeting>
		trigger: Array<Targeting>
	}
}

export interface Variation {
	id: number
	name: string
	traffic: number
}

export interface Variations {
	[key: string]: Variation
}

export interface Tracking {
	name: string
	selector: string
}

export interface Trackings {
	click: Array<Tracking>
	mousedown: Array<Tracking>
	submit: Array<Tracking>
}

export interface Test {
	id: number
	isAsync: string
	parentID: number
	asyncVariationInfoById: Variations
	actionTrackings: Trackings
	traffic: number
}

export interface Results {
	[key: string]: Result
}

export interface Data {
	accountData: {
		tests: {
			[key: string]: any
		}
	}
	results: Results
	debug: boolean
}

export interface TestsSortedByStatus {
	accepted: Array<Result>
	rejected: Array<Result>
}

export interface TargetingItemSortedByStatus {
	accepted: Array<Targeting>
	rejected: Array<Targeting>
}

export interface TargetingsSortedByStatus {
	[key: string]: TargetingItemSortedByStatus
}

export interface CustomEvent {
	detail: object
}

export interface Wording {
	[key: string]: string
}

export interface DetailData {
	testId: string
	identifier: string
	test: Test
	result: Result
	targetingSorted: TargetingItemSortedByStatus
}

export interface ListData {
	testsSortedByStatus: TestsSortedByStatus
	debug: boolean
}

export interface ChangeInfo {
	status: string
}

export interface TrafficAllocation {
	original: number
	untracked: number
}
