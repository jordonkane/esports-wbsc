# Esports Web Scaper API
The Esports Web Scraper API searches and displays esports-related articles from a list of news websites.
## Overview
The API searches each of the listed news sourcesfor article tags containing `esports`. The API then stores the title and URL of each related article into an array which can be accessed with the endpoints `/news` and `/news{id}`.

## Usage
| Endpoint | Description |
| --- | --- |
| `/news` | Displays esports-related articles from all sites. |
| `/news/{id}` | Displays esports-related articles from a *specific* site. 
## News Sites
| Id | URL |
| --- | --- |
| `theconversation` | https://theconversation.com/us/topics/ |
| `esportsnet` | https://www.esports.net/news/ |
| `esportsinsider` | hhttps://esportsinsider.com/category/latest-news/ |
| `wired` | https://www.techspot.com/tag/esports/ |
| `techspot` | https://www.wired.com/tag/esports/ |
| `theguardian` | https://www.theguardian.com/sport/esports |
| `harvard` | https://hir.harvard.edu/ |
| `frontiers` | https://www.frontiersin.org/articles?domain=all |
| `thesportjournal` | https://www.thesportjournal.org/ |
| `ijesports` | https://www.ijesports.org/ |
| `cappex` | https://www.cappex.com/articles |
| `defensegov` | https://www.defense.gov/ |
| `espn` | https://www.espn.com/esports/ |
| `dotesports` | https://dotesports.com/ |
## Author Info
- Website: [LinkedIn - Jordon Kane](https://www.linkedin.com/in/jordonkane/)
