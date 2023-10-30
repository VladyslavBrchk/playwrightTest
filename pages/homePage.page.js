const { Page } = require('./page');

const signInButton = '.login'
const loggedAsUser = 'div[id="loggedas"]>a'
const myPageButton = '#top-menu>ul>li>.my-page'
const projectsButton = '#top-menu>ul>li>.projects'
const overviewButton = 'li>.overview'
const downloadButton = 'li>.download'
const activityButton = 'li>.activity'
const roadmapButton = 'li>.roadmap'
const issuesButton = 'li>.issues'
const newsButton = 'li>.news'
const wikiButton = 'li>.wiki'
const forumsButton = 'li>.boards'
const repositoryButton = 'li>.repository'
const addURL = 'https://www.redmine.org/#google_vignette'

class HomePage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async openHomePageUrl() {
        await super.openUrl('https://www.redmine.org/')
    }

    async clickSignInButton() {
        await super.clickElement(signInButton);
    }

    async clickMyPageButton() {
        await super.clickElement(myPageButton);
    }

    async clickProjectsButton() {
        await super.clickElement(projectsButton);
    }

    async getLoggedAsUserLabel() {
        return await super.getElement(loggedAsUser)
    }

    async closeAdd(){
        if(await super.getUrl() === addURL){
            let frame = await this.page.frameLocator('#aswift_2').frameLocator('#ad_iframe').getByText("Close"); 
            if (await frame.isVisible()) { await frame.click(); }
        }
    }

    async clickOverviewButton() {
        await super.clickElement(overviewButton);
    }

    async clickDownloadButton() {
        await super.clickElement(downloadButton);
    }

    async clickActivityButton() {
        await super.clickElement(activityButton);
    }

    async clickRoadmapButton() {
        await super.clickElement(roadmapButton);
    }

    async clickIssuesButton() {
        await super.clickElement(issuesButton);
    }
    
    async clickNewsButton() {
        await super.clickElement(newsButton);
    }

    async clickWikiButton() {
        await super.clickElement(wikiButton);
    }

    async clickForumsButton() {
        await super.clickElement(forumsButton);
    }

    async clickRepositoryButton() {
        await super.clickElement(repositoryButton);
    }
}

module.exports = { HomePage };