from playwright.sync_api import Page, expect

def test_seller_page(page: Page):
    # 1. Arrange: Go to the login page.
    page.goto("http://localhost:3000/api/auth/signin")

    # 2. Act: Log in as the dummy seller.
    page.get_by_label("Email").fill("seller@example.com")
    page.get_by_label("Password").fill("password123")
    page.get_by_role("button", name="Sign in").click()

    # 3. Act: Navigate to the seller page.
    page.goto("http://localhost:3000/sell")

    # 4. Assert: Confirm the navigation was successful.
    expect(page).to_have_title("Seller Dashboard")

    # Add a small delay to ensure the page has loaded
    page.wait_for_timeout(2000)

    # 5. Screenshot: Capture the final result for visual verification.
    page.screenshot(path="jules-scratch/verification/seller-page.png")
