import getTrafficAllocation from '../get-traffic-allocation'

describe('getTrafficAllocation', () => {
	it('Should call the getTrafficAllocation function with the traffic equal to 100', () => {
		const result = getTrafficAllocation({
			959322: {
				traffic: 25
			},
			959341: {
				traffic: 25
			},
			963938: {
				traffic: 25
			}
		})

		expect(result).toStrictEqual({
			original: 25,
			untracked: 0
		})
	})

	it('Should call the getTrafficAllocation function with the traffic over 100', () => {
		const result = getTrafficAllocation({
			959322: {
				traffic: 25
			},
			959341: {
				traffic: 40
			},
			963938: {
				traffic: 25
			}
		})

		expect(result).toStrictEqual({
			original: 10,
			untracked: 0
		})
	})

	it('Should call the getTrafficAllocation function with the traffic under 100', () => {
		const result = getTrafficAllocation({
			959322: {
				traffic: 20
			},
			959341: {
				traffic: 10
			},
			963938: {
				traffic: 25
			}
		})

		expect(result).toStrictEqual({
			original: 25,
			untracked: 20
		})
	})

	it('Should call the getTrafficAllocation function when none of the conditions are valid', () => {
		const result = getTrafficAllocation({
			959322: {
				traffic: NaN
			},
			959341: {
				traffic: 10
			},
			963938: {
				traffic: 25
			}
		})

		expect(result).toStrictEqual({
			original: -1,
			untracked: -1
		})
	})
})
