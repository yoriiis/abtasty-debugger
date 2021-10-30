export interface Condition {
	name?: string
	value: string
	include: Boolean
	condition: number
}

export interface Targeting {
	key: string
	success: Boolean
	conditions: Array<Condition>
}

export interface Result {
	key: string
	name: string
	type: string
	status: string
	targetingMode: string
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
}

export interface Test {
	id: number
	targetingMode: string
	isAsync: string
	parentID: number
	asyncVariationInfoById: Variations
}

export interface Data {
	accountData: {
		tests: {
			[key: string]: {
				targetingMode: string
			}
		}
	}
	results: {
		[key: string]: Result
	}
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
}

export interface FormattedData {
	testsSortedByStatus: TestsSortedByStatus
	targetingsSortedByStatus: TargetingsSortedByStatus
}

export interface Modification {
	id: number
	oldValue: string
	selector: string
	type: string
}

export interface VariationEndpoint {
	id: number
	masterVariationId: number
	modifications: Array<Modification>
	name: string
	trafic: number
	_taginfo: string
}
