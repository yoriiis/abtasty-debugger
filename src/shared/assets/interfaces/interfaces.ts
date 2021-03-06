export interface Condition {
    name: string;
    value: string;
    include: Boolean;
    condition: Number;
}

export interface Targeting {
	key: string;
	success: Boolean;
	conditions: Array<Condition>;
}
export interface Test {
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

export interface Data {
    accountData: {
        tests:{
            [key: string]: Test;
        }
    };
	results: {
		[key: string]: Test
	}
}

export interface TestsSortedByStatus {
	accepted: Array<Test>;
	rejected: Array<Test>;
}

export interface TargetingItemSortedByStatus {
    accepted: Array<Targeting>;
    rejected: Array<Targeting>;
}

export interface TargetingsSortedByStatus {
	[key: string]: TargetingItemSortedByStatus
}

export interface Event {
    target: Element;
    detail: Object;
    oldURL: string;
}

export interface Wording {
    [key: string]: string;
}

export interface ChromePort {
    name: string;
    onMessage: {
        addListener: Function
    };
}

export interface ChromeMessage {
    ABTastyData: string;
}

export interface ChromeTabs {
    [index: number]: {
        id?: Number;
    };
}

export interface ChromeStorage {
    [key: string]: any;
}
