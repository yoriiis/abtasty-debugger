export type Condition = {
	name?: string
	value: string
	include: boolean
	condition: number
	url?: string
	operator?: string
	favorite_url_id: string
}

export type FavoriteUrlScope = {
	favoriteUrlScopeConditions: Condition[]
	urlScopes: Condition[]
}

export type Targeting = {
	key: string
	success: boolean
	conditions?: Condition[] | FavoriteUrlScope
	name: string
}

export type Result = {
	key: string
	name: string
	type: string
	status: string
	variationID: number
	variationName: string
	targetings: {
		targetPages: Record<string, Targeting>
		qaParameters: Record<string, Targeting>
		segment: Targeting[]
		trigger: Targeting[]
	}
}

export type Variation = {
	id: number
	name: string
	traffic: number
}

export type Variations = Record<string, Variation>

export type Tracking = {
	name: string
	selector: string
}

export type Trackings = {
	click: Tracking[]
	mousedown: Tracking[]
	submit: Tracking[]
}

export type Test = {
	id: number
	isAsync: string
	parentID: number
	asyncVariationInfoById: Variations
	actionTrackings: Trackings
	traffic: number
}

export type Results = Record<string, Result>

export type Data = {
	accountData: {
		tests: Record<string, any>
	}
	results: Results
	debug: boolean
}

export type TestsSortedByStatus = {
	accepted: Result[]
	rejected: Result[]
}

export type TargetingItemSortedByStatus = {
	accepted: Targeting[]
	rejected: Targeting[]
}

export type TargetingsSortedByStatus = Record<string, TargetingItemSortedByStatus>

export type CustomEvent = {
	detail: object
}

export type Wording = Record<string, string>

export type DetailData = {
	testId: string
	identifier: string
	test: Test
	result: Result
	targetingSorted: TargetingItemSortedByStatus
}

export type ListData = {
	testsSortedByStatus: TestsSortedByStatus
	debug: boolean
}

export type ChangeInfo = {
	status: string
}

export type TrafficAllocation = {
	original: number
	untracked: number
}
