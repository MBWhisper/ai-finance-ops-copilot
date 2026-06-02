import asyncio
from playwright.async_api import async_playwright

async def check():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto('http://localhost:3000/')
        await page.wait_for_load_state('domcontentloaded')
        links = await page.eval_on_selector_all('header a', 'els => els.map(e => ({text: e.textContent.trim(), href: e.getAttribute("href")}))')
        print('HEADER LINKS:', links)
        title = await page.title()
        print('TITLE:', title)
        await browser.close()

asyncio.run(check())
