export interface Condition {
    name?: string;
    value: string;
    include: Boolean;
    condition: Number;
}

export interface Targeting {
	key: string;
	success: Boolean;
	conditions: Array<Condition>;
}

export interface Result {
	key: string;
	name: string;
	type: string;
	status: string;
    targetingMode: string;
    variationID: Number;
    variationName: string;
	targetings: {
		targetPages: {
			[key: string]: Targeting;
		};
		qaParameters: {
			[key: string]: Targeting;
		};
	}
}

export interface Test {
	id: Number;
    targetingMode: string;
    parentID: Number;
}

export interface Data {
    accountData: {
        tests:{
            [key: string]: {
                targetingMode: string;
            };
        }
    };
	results: {
		[key: string]: Result;
	}
}

export interface TestsSortedByStatus {
	accepted: Array<Result>;
	rejected: Array<Result>;
}

export interface TargetingItemSortedByStatus {
    accepted: Array<Targeting>;
    rejected: Array<Targeting>;
}

export interface TargetingsSortedByStatus {
	[key: string]: TargetingItemSortedByStatus
}

export interface CustomEvent {
    detail: Object;
}

export interface Wording {
    [key: string]: string;
}

export interface DetailData {
    testId: string;
    test: Test;
    result: Result;
    targetingSorted: TargetingItemSortedByStatus;
    targetingMode: string
}

export interface DynamicSegments {
    [key: string]: string;
}

export interface ListData {
    testsSortedByStatus: TestsSortedByStatus;
}

export interface FormattedData {
    testsSortedByStatus: TestsSortedByStatus;
    targetingsSortedByStatus: TargetingsSortedByStatus;
}
