const PORT = 7000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const newspapers = [
    {
        name: 'The Conversation',
        address: 'https://theconversation.com/us/topics/',
        base: ''
    },
    {
        name: 'Esports.net',
        address: 'https://www.esports.net/news/',
        base: ''
    },
    {
        name: 'Esports Insider',
        address: 'https://esportsinsider.com/category/latest-news/',
        base: ''
    },
    {
        name: 'Wired',
        address: 'https://www.wired.com/tag/esports/',
        base: ''
    },
    {
        name: 'Techspot',
        address: 'https://www.techspot.com/tag/esports/',
        base: ''
    },
    {
        name: 'The Guardian',
        address: 'https://www.theguardian.com/sport/esports',
        base: ''
    },
    {
        name: 'Harvard',
        address: 'https://hir.harvard.edu/',
        base: ''
    },
    {
        name: 'Frontiers',
        address: 'https://www.frontiersin.org/articles?domain=all',
        base: ''
    },
    {
        name: 'The Sport Journal',
        address: 'https://hir.harvard.edu/',
        base: ''
    },
    {
        name: 'IJEsports',
        address: 'https://www.ijesports.org/',
        base: ''
    },
    {
        name: 'Cappex',
        address: 'https://www.cappex.com/articles',
        base: ''
    },
    {
        name: 'Defense.gov',
        address: 'https://www.defense.gov/',
        base: ''
    },
    {
        name: 'ESPN',
        address: 'https://www.espn.com/esports/',
        base: ''
    },
    {
        name: 'Dot Esports',
        address: 'https://dotesports.com/',
        base: ''
    }
]

const articles = []

// Loops through the array of newspapers.

newspapers.forEach(newspaper => {
    
    // Passes URL

    axios.get(newspaper.address).then(response => {

        // Stores "response.data" as variable "html."

        const html = response.data

        // Passes variable into "cheerio.load."

        const $ = cheerio.load(html)

        /*
            Finds elements that have the <a> tag & contain "Esports"
            Function grabs text from each of the <a> tags.
        */

        $('a:contains("esport")', html).each(function () {
            
            // Stores article title.

            const title = $(this).text()

            // Grabs href for every <a> tag.

            const url = $(this).attr('href')

            // Pushes title & URL into "articles."

            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
    })

})

// API Homepage

app.get('/', (req, res) => { res.json('E-Sports Web Scraper API') })

app.get('/news', (req, res) => {
    
    // Displays articles in browser.

    res.json(articles)

}).catch((err) => console.log) // Exception handling

// Endpoint to visit specific newspaper id.

app.get('/news/:newspaperId', async (req, res) => {

    // Stores the desired newspaper

    const newspaperId = req.params.newspaperId

    // Filters array to find newspapers

    newspapers.filter(newspaper => newspaper.name == newspaperId)

    // Pass URL into "axios.get"

    axios.get(newspaperAddress).then(response => {

        // Newspaper to visit

        const newspaperId = red.params.newspaperId

        const newspaperAddress = newspaper.fiter(newspaper => newspaper.name == newspaperId)[0].address



    })

    // Logs request interminal

    console.log(newspaper)

})

// Listens to any changes on PORT 7000.

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))