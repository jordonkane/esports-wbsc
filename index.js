const PORT = 7000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const articles = []

// API Homepage

app.get('/', (req, res) => { res.json('E-Sports Web Scraper API') })

app.get('/news', (req, res) => {

    axios.get('#news-source').then((response) => {
        const html = response.data
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

            // Pushes href into an array.

            articles.push ({
                title,
                url
            })
        })

        // Displays articles in browser.

        res.json(articles)
    }).catch((err) => console.log) // Exception handling

})

// Listens to any changes on PORT 7000.

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))