const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID
const today = new Date().toISOString().slice(0, 10)

async function getSports() {

  const { results } = await notion.databases.query({
    database_id: `${database_id}`,
    filter: {
      "and": [
        {
          "property": "Sports",
          "select": {
            "is_not_empty": true
          }
        },
        {
          "or": [
            {
              "property": "Name",
              "rich_text": {
                "starts_with": '2023'
              }
            },
            {
              "property": "Name",
              "rich_text": {
                "starts_with": '2022'
              }
            }
          ]
        }
      ]
    }
  })


  const rawData = results.map(page => {
    return {
      "date": new Date(page.properties.Name.title[0].text.content),
      "sport": page.properties.Sports.select.name
    }
  })

  return rawData
}

async function getTitle() {

  const response = await notion.databases.retrieve({
    database_id: `${database_id}`
  })
  const title = response.description[0].text.content

  return title
}

module.exports = {
  getSports: getSports,
  getTitle: getTitle
}
