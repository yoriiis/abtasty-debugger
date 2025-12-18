import { expect, test } from '@playwright/test'

test.describe('List Page', () => {
	const expectedList = [
		{
			name: 'Test with darkmode button on the header',
			status: 'accepted',
			route: '/detail/100002'
		},
		{ name: 'Test with the menu button on the left', status: 'rejected', route: '/detail/100001' },
		{ name: 'Scenario satisfaction survey', status: 'pending', route: '/detail/100004' }
	]
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/#/list')
	})

	test('should display the main list container', async ({ page }) => {
		const list = page.locator('.list')
		await expect(list).toBeVisible()
	})

	test('should display the navigation buttons', async ({ page }) => {
		const resetButton = page.locator('.list-navItemButton.clearCookies')
		const debugCheckbox = page.locator('input#debugMode')

		await expect(resetButton).toBeVisible()
		await expect(resetButton).toHaveText(/Reset cookies/i)
		await expect(debugCheckbox).toBeVisible()
	})

	test('should match list items with expected data', async ({ page }) => {
		const statusClassMap: Record<string, string> = {
			accepted: 'green',
			rejected: 'red',
			pending: 'red'
		}

		const items = page.locator('.list-item')
		const count = await items.count()

		expect(count).toBe(expectedList.length)

		for (let i = 0; i < count; i++) {
			const item = items.nth(i)
			const button = item.locator('button.list-link')
			const name = await item.locator('.list-name').textContent()
			const badge = item.locator('.badge')
			const badgeClass = await badge.getAttribute('class')
			const route = await button.getAttribute('data-route')

			expect(name?.trim()).toBe(expectedList[i].name)
			expect(badgeClass).toContain(statusClassMap[expectedList[i].status])
			expect(route).toBe(expectedList[i].route)
		}
	})

	test('should navigate correctly for all list items', async ({ page }) => {
		const items = page.locator('.list-item')
		const count = await items.count()

		for (let i = 0; i < count; i++) {
			const item = items.nth(i)
			const button = item.locator('button.list-link')
			const expectedRoute = expectedList[i].route

			await button.click()
			await expect(page).toHaveURL(new RegExp(`${expectedRoute}$`))

			// Go back to list
			await page.goto('http://localhost:3000/#/list')
		}
	})
})
