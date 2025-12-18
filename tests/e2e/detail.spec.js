import { expect, test } from '@playwright/test'

const detailExpected = {
	id: '100002',
	name: 'Test with darkmode button on the header',
	status: 'accepted',
	type: 'ab',
	async: true,
	traffic: '40%',
	variations: [
		{
			name: 'Variation one',
			value: '200001',
			traffic: '11%',
			checked: true,
			link: 'https://try.abtasty.com/3d09baddc21a365b7da5ae4d0aa5cb95/100002.200001.json'
		},
		{
			name: 'Variation two',
			value: '200002',
			traffic: '9%',
			checked: false,
			link: 'https://try.abtasty.com/3d09baddc21a365b7da5ae4d0aa5cb95/100002.200002.json'
		},
		{
			name: 'Variation three',
			value: '200003',
			traffic: '37%',
			checked: false,
			link: 'https://try.abtasty.com/3d09baddc21a365b7da5ae4d0aa5cb95/100002.200003.json'
		},
		{ name: 'Original', value: '0', traffic: '37%', checked: false },
		{ name: 'Untracked', value: '-1', traffic: '6%', checked: false, disabled: true }
	],
	trackings: [
		{
			type: 'click',
			actions: [
				{ name: 'Click breadcrumb', selector: '.breadcrumbs' },
				{ name: 'Click channel', selector: '.channel' }
			]
		},
		{
			type: 'mousedown',
			actions: [{ name: 'Mousedown on logo', selector: '.logo' }]
		}
	]
}

test.describe('Detail Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/#/detail/100002')
	})

	test('should display correct title and general info', async ({ page }) => {
		const title = await page.locator('.detail-title').textContent()
		expect(title?.trim()).toBe(detailExpected.name)

		const generalHeader = page.locator('.collapse-headerButton:has-text("General")')
		await generalHeader.click()
		const generalList = page.locator('.detail-list')
		await expect(generalList).toBeVisible()

		const generalItems = await generalList.locator('li').allTextContents()
		expect(generalItems).toContain(`ID: ${detailExpected.id}`)
		expect(generalItems).toContain(`Status: ${detailExpected.status}`)
		expect(generalItems).toContain(`Type: ${detailExpected.type}`)
		expect(generalItems).toContain(`Async: ${detailExpected.async}`)
		expect(generalItems).toContain(`Traffic: ${detailExpected.traffic}`)
	})

	test('should display all variations correctly', async ({ page }) => {
		const variationItems = page.locator('.variation-listItem')
		const count = await variationItems.count()
		expect(count).toBe(detailExpected.variations.length)

		for (let i = 0; i < count; i++) {
			const variation = detailExpected.variations[i]
			const item = variationItems.nth(i)

			const name = await item.locator('.variation-name').textContent()
			const traffic = await item.locator('.variation-traffic').textContent()
			const input = item.locator('input.variation-inputRadio')

			expect(name?.trim()).toBe(variation.name)
			expect(traffic?.trim()).toBe(variation.traffic)
			expect(await input.isChecked()).toBe(variation.checked || false)
			if (variation.disabled) {
				expect(await input.isDisabled()).toBe(true)
			}
		}
	})

	test('should display trackings correctly', async ({ page }) => {
		const trackingHeader = page.locator('.collapse-headerButton:has-text("Trackings")')
		await trackingHeader.click()

		for (const tracking of detailExpected.trackings) {
			const trackingSection = page.locator(`.tracking-listItem:has-text("${tracking.type}")`)
			await expect(trackingSection).toBeVisible()

			for (const action of tracking.actions) {
				const row = trackingSection.locator(`tr:has(.tracking-name:has-text("${action.name}"))`)
				await expect(row).toBeVisible()

				const selectorValue = await row.locator('.tracking-selector input').inputValue()
				expect(selectorValue).toBe(action.selector)
			}
		}
	})

	test('should toggle collapsible sections', async ({ page }) => {
		const headers = page.locator('.collapse-headerButton')
		const count = await headers.count()

		for (let i = 0; i < count; i++) {
			const header = headers.nth(i)
			const section = header.locator('xpath=ancestor::section')
			const sectionContent = section.locator(':scope > .collapse-content')

			// Some sections have no content (headerOnly)
			if ((await sectionContent.count()) === 0) continue

			// Default close
			expect(await sectionContent.isVisible()).toBe(false)

			// Open
			await header.click()
			await expect(sectionContent).toBeVisible()

			// Close
			await header.click()
			await expect(sectionContent).toBeHidden()
		}
	})

	test('variation links open correct URLs', async ({ page, context }) => {
		const variationHeader = page.locator('.collapse-headerButton:has-text("Variations")')
		await variationHeader.click() // Open section

		const variationItems = page.locator('.variation-listItem')
		for (let i = 0; i < detailExpected.variations.length; i++) {
			const variation = detailExpected.variations[i]
			if (!variation.link) continue // Original / Untracked has no link

			const link = variationItems.nth(i).locator('.variation-link')
			const href = await link.getAttribute('href')
			expect(href).toContain(variation.link)

			const [newPage] = await Promise.all([context.waitForEvent('page'), link.click()])
			await expect(newPage.url()).toContain(variation.link)
			await newPage.close()
		}
	})

	test('back button returns to list', async ({ page }) => {
		const backButton = page.locator('.detail-navItem.back button')
		await backButton.click()
		await expect(page).toHaveURL(/#\/list$/)
	})

	test('should display nav buttons', async ({ page }) => {
		await expect(page.locator('.detail-navItem.back button')).toBeVisible()
		await expect(page.locator('.detail-navItem.editor a')).toHaveAttribute('href', /editor/)
		await expect(page.locator('.detail-navItem.report a')).toHaveAttribute('href', /report/)
	})
})
