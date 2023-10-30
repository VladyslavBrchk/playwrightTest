const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/homePage.page');
const { LoginPage } = require('../pages/loginPage.page');
const { MyPage } = require('../pages/myPage.page');
const { IssuesPage } = require('../pages/issuesPage.page');
const { Page } = require('../pages/page');
const validData = require('../validData.json');
const validURL = require('../validURL.json');
const { faker } = require('@faker-js/faker');

let homePage;
let loginPage;
let issuesPage;
let myPage;
let basePage;
const randomName = faker.internet.userName();
const randomPassword = faker.internet.password();
const randomSubject = faker.hacker.ingverb();
const randomDescription = faker.hacker.phrase();


test.describe('Login testing', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        basePage = new Page(page);
        await homePage.openHomePageUrl();
        await homePage.closeAdd();
        await homePage.clickSignInButton();
    });

    test('Login with valid data', async () => {
        await loginPage.inputLogin(validData.username);
        await loginPage.inputPassword(validData.password);
        await loginPage.clickLogInButton();
        expect(await basePage.getUrl()).toBe(validURL.homePageUrl);
        await expect(await homePage.getLoggedAsUserLabel()).toHaveText(validData.username);
    });

    test('Login with invalid data', async () => {
        await loginPage.inputLogin(randomName);
        await loginPage.inputPassword(randomPassword);
        await loginPage.clickLogInButton();
        expect(await basePage.getUrl()).toBe(validURL.loginPageUrl);
        await expect(await loginPage.getFleshError()).toHaveText(validData.invalidLoginMsg);
    });
});

test.describe('My Page testing', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        myPage = new MyPage(page);
        basePage = new Page(page);
        await homePage.openHomePageUrl();
        await homePage.clickSignInButton();
        await loginPage.inputLogin(validData.username);
        await loginPage.inputPassword(validData.password);
        await loginPage.clickLogInButton();
    });

    test('My Page Adding/Deleting items', async () => {
        await homePage.clickMyPageButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.myPagePageUrl);
        await myPage.clickAddMenu();
        const addMenuLength = await myPage.addMenuLength();
        expect(addMenuLength).toBe(validData.myPageAddMenuLength);
        for (let i = 1; i < addMenuLength; i++) {
            let currentItemName = new RegExp(await myPage.addMenuOptionText(i));
            await myPage.clickAddMenuOption(i);
            expect(await myPage.pageListItemText(0)).toMatch(currentItemName);
            await myPage.clickAddMenu();
        }
        const pageListLength = await myPage.pageListLength();
        for (let i = 0; i < pageListLength; i++) {
            await myPage.closeListItem(0);
            let currentPageListLength = await myPage.pageListLength();
            expect(currentPageListLength).toEqual(pageListLength-i);
        }
    });
});

test.describe('Header testing', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        basePage = new Page(page);
        await homePage.openHomePageUrl();
    });

    test('Top menu links test', async () => {
        await homePage.clickOverviewButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.overviewURL);
        await homePage.clickDownloadButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.downloadURL);
        await homePage.clickActivityButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.activityURL);
        await homePage.clickRoadmapButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.roadmapURL);
        await homePage.clickIssuesButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.issuesURL);
        await homePage.clickNewsButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.newsURL);
        await homePage.clickWikiButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.wikiURL);
        await homePage.clickForumsButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.forumsURL);
        await homePage.clickRepositoryButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.repositryURL);       
    });
});

test.describe('Issues testing', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        issuesPage = new IssuesPage(page);
        basePage = new Page(page);
        await homePage.openHomePageUrl();
        await homePage.openHomePageUrl();
        await homePage.clickSignInButton();
        await loginPage.inputLogin(validData.username);
        await loginPage.inputPassword(validData.password);
        await loginPage.clickLogInButton();
    });
    test('Issue Creation', async () => {
        await homePage.clickIssuesButton();
        await homePage.closeAdd();
        expect(await basePage.getUrl()).toBe(validURL.issuesURL);
        await issuesPage.clickNewIssueButton();
        expect(await basePage.getUrl()).toBe(validURL.newIssueURL);
        await issuesPage.inputSubject(randomSubject);
        await issuesPage.inputDescription(randomDescription);
        await issuesPage.clickCreateButton();
        let validMessage = new RegExp(validData.issueCreatedMessage)
        expect(await issuesPage.getInfoMessageText()).toMatch(validMessage);
    });

});