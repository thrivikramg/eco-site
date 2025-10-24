from playwright.sync_api import Page, expect

def test_shop_page(page: Page):
    # 1. Arrange: Go to the shop page.
    page.goto("http://localhost:3000/shop")

    # 2. Assert: Confirm the page has loaded.
    expect(page).to_have_title("Shop All Products | EcoGrow")

    # Add a small delay to ensure the page has loaded
    page.wait_for_timeout(2000)

    # 3. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/shop-page.png")
