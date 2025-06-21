# Hello! 
# This is Jamil's practice TypeScript + Playwright test automation project!


# To Run Tests through terminal or Command prompt run the following commands

##1. npm init playwright@latest > Select TypeScript + Github actions
##2. Git clone repo or download repo and extract file
##3. npx playwright test jam.spec.ts --headed --ui 


# Project Name: jam.spec.ts

## 1. Page structure
- BasePage
- LoginPage
- InventoryPage
- CartPage
- CheckoutPage
- CheckoutCompletePage

## 2. Test Cases
- TC#1: Add product to Cart 
- TC#2: Sort product order
- TC#3: Add multiple products to Cart 
- TC#4: Remove a product from Cart
- TC#5: Data-driven tests where firstname, last name and zipcode are from a spreadsheet

## 3. Setup & Teardown
- Login to the application using the credentials provided above.
- Take screenshot of current page 
- Reset cart status to 0 items
- Logout 

## 4. Test Data
        CSV file for Firstname, Lastname, Zipcode (/data/test-data.csv)
        Accepted usernames are:
        standard_user
        locked_out_user
        problem_user
        performance_glitch_user
        error_user
        visual_user


## Password for all users:
    secret_sauce

## 5. Test Environment
- BaseURL : https://www.saucedemo.com/

## 6. Test Executions
- Run tests in headed mode
- Generate HTML report
- Upload report to GitHub

## 7. ENJOY!                         
