const PORT = 7000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

// Store news sources

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
        address: 'https://www.thesportjournal.org/',
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

// Create an empty array for newspapers.

const articles = []

// Loop through the array of newspapers.

newspapers.forEach(newspaper => {
    
    // Pass URL into variable:

    axios.get(newspaper.address).then(response => {

        // Store "response.data" as variable "html."

        const html = response.data

        // Pass variable into "cheerio.load."

        const $ = cheerio.load(html)

        /*
            Find elements that have the <a> tag & contain "Esports."
            The function grabs text from each of the <a> tags.
        */

        $('a:contains("esport")', html).each(function () {
            
            // Store article title.

            const title = $(this).text()

            // Grab href for every <a> tag.

            const url = $(this).attr('href')

            // Push title & URL into "articles."

            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name
            })
        })
    })

})

// API Homepage:

app.get('/', (req, res) => { 

    // Display API Title

    res.json('E-Sports Web Scraper API') 

})

app.get('/news', (req, res) => {
    
    // Display articles in browser.

    res.json(articles)

})

// Endpoint to visit specific newspaper id:

app.get('/news/:newspaperId', (req, res) => {

    // Store the desired newspaper.

    const newspaperId = req.params.newspaperId

    // Filter array to find newspapers.

    const newspaperAddress = newspaper.filter(newspaper => newspaper.name == newspaperId)[0].address

    // Filter array to find newspaper base.
    
    const newspaperBase = newspaper.filter(newspaper => newspaper.name == newspaperId)[0].base

    // Pass URL into "axios.get"

    axios.get(newspaperAddress).then(response => {
       
        // Store "response.data" as variable "html."

        const html = response.data

        // Pass variable into "cheerio.load."

        const $ = cheerio.load(html)

        // Create an empty array for specific newspapers.

        const specificArticles = []
        
         /*
            Finds elements that have the <a> tag & contain "Esports."
            The function grabs text from each of the <a> tags.
        */

        $('a:contains("esport")', html).each(function () {
            
            // Store article title.

            const title = $(this).text()

            // Grab href for every <a> tag.

            const url = $(this).attr('href')

            // Push title & URL into "articles."

            specificArticles.push({
                title,
                url: newspaperBase + url,
                source: newspaperId
            })
        })

        // Display output in browser.

        res.json(specificArticles)
        
    }).catch(err => console.log(err)) // Exception Handling

})

// Listen to any changes on PORT 7000.

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
