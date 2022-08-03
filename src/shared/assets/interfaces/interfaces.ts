export interface Condition {
	name?: string
	value: string
	include: Boolean
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
	success: Boolean
	conditions: Array<Condition> | FavoriteUrlScope
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
	}
}

export interface Variations {
	[key: string]: Variation
}

export interface Variation {
	id: number
	name: string
	traffic: number
}

export interface Test {
	id: number
	isAsync: string
	parentID: number
	asyncVariationInfoById: Variations
	actionTrackings: Trackings
	traffic: number
}

export interface Data {
	accountData: {
		tests: {
			[key: string]: {}
		}
	}
	results: Results
}

export interface Results {
	[key: string]: Result
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

export interface DynamicSegments {
	[key: string]: string
}

export interface ListData {
	testsSortedByStatus: TestsSortedByStatus
	debug: boolean
}

export interface FormattedData {
	testsSortedByStatus: TestsSortedByStatus
	targetingsSortedByStatus: TargetingsSortedByStatus
}

export interface ChangeInfo {
	status: string
}

export interface Trackings {
	click: Array<Tracking>
	mousedown: Array<Tracking>
	submit: Array<Tracking>
}

export interface Tracking {
	name: string
	selector: string
}

export interface TrafficAllocation {
	original: number
	untracked: number
}
