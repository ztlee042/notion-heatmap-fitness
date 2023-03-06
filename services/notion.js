const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

// init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const database_id = process.env.NOTION_DATABASE_ID
const today = new Date().toISOString().slice(0, 10)

module.exports = async function getPomo() {

  const { results } = await notion.databases.query({
    database_id: `${database_id}`,
    filter: {
      "and": [
        {
          "property": "Date",
          "date": {
            "is_not_empty": true,
            "before": today
          }
        },
        {
          "property": "Status",
          "status": {
            "equals": 'Done'
          }
        },]
    },
    sorts: [{
      "property": "Date",
      "direction": "ascending"
    }]
  })


  const rawPomos = results.map(page => {
    return {
      "date": page.properties.Date.date.start,
      "pomos": page.properties['Actual🍅'].number
    }
  })

  // const groupByKey = (data, key) => Object.values(
  //   data.reduce((res, item) => {
  //     const value = item[key] // date
  //     const existing = res[value] || { [key]: value, cumPomos: 0 }
  //     return {
  //       ...res,
  //       [value]: {
  //         ...existing,
  //         cumPomos: existing.cumPomos + item.pomos
  //       }
  //     }
  //   }, {})
  // )

  // const groupedPomos = groupByKey(rawPomos, 'date')

  return rawPomos
}