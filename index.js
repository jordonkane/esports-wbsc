const PORT = 7000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

// News sources

const newspapers = [
    {
        name: 'theconversation',
        address: 'https://theconversation.com/us/topics/',
        base: ''
    },
    {
        name: 'esportsnet',
        address: 'https://www.esports.net/news/',
        base: ''
    },
    {
        name: 'esportsinsider',
        address: 'https://esportsinsider.com/category/latest-news/',
        base: ''
    },
    {
        name: 'wired',
        address: 'https://www.wired.com/tag/esports/',
        base: ''
    },
    {
        name: 'techspot',
        address: 'https://www.techspot.com/tag/esports/',
        base: ''
    },
    {
        name: 'theguardian',
        address: 'https://www.theguardian.com/sport/esports',
        base: ''
    },
    {
        name: 'harvard',
        address: 'https://hir.harvard.edu/',
        base: ''
    },
    {
        name: 'frontiers',
        address: 'https://www.frontiersin.org/articles?domain=all',
        base: ''
    },
    {
        name: 'thesportjournal',
        address: 'https://hir.harvard.edu/',
        base: ''
    },
    {
        name: 'ijesports',
        address: 'https://www.ijesports.org/',
        base: ''
    },
    {
        name: 'cappex',
        address: 'https://www.cappex.com/articles',
        base: ''
    },
    {
        name: 'defensegov',
        address: 'https://www.defense.gov/',
        base: ''
    },
    {
        name: 'espn',
        address: 'https://www.espn.com/esports/',
        base: ''
    },
    {
        name: 'dotesports',
        address: 'https://dotesports.com/',
        base: ''
    }
]

// Array of newspapers

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

app.get('/', (req, res) => { 

    // API Title

    res.json('E-Sports Web Scraper API') 

})

app.get('/news', (req, res) => {
    
    // Displays articles in browser.

    res.json(articles)

})

// Endpoint to visit specific newspaper id.

app.get('/news/:newspaperId', (req, res) => {

    // Stores the desired newspaper.

    const newspaperId = req.params.newspaperId

    // Filters array to find newspapers.

    const newspaperAddress = newspaper.filter(newspaper => newspaper.name == newspaperId)[0].address

    // Filters array to find newspaper base.
    
    const newspaperBase = newspaper.filter(newspaper => newspaper.name == newspaperId)[0].base

    // Pass URL into "axios.get"

    axios.get(newspaperAddress).then(response => {
       
        // Stores "response.data" as variable "html."

        const html = response.data

        // Passes variable into "cheerio.load."

        const $ = cheerio.load(html)

        // Array of specific newspapers.

        const specificArticles = []
        
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

            specificArticles.push({
                title,
                url: newspaperBase + url,
                source: newspaperId
            })
        })

        // Displays output in browser.

        res.json(specificArticles)
        
    }).catch(err => console.log(err)) // Exception Handling

})

// Listens to any changes on PORT 7000.

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))