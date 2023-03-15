# 中文

这个可视化不仅限于追踪运动，基本上所有按照单选类别记录的活动都可以用它进行可视化。

1. 图表标题由 Notion 数据库的描述决定。
2. 数据库必须包含两个 Property （属性）。
    1. Name （名称）这一栏不要修改叫法，这一属性下存储 “YYYY-MM-DD” 格式的日期，如 “2023-03-14”。
    2. 有一栏专门用来存放你想要进行可视化的项目，举例为 “Sports”，需设置为单选。如你想要对类别名称进行修改，需对应修改 `notion.js` 中的类别名称。

    ```JavaScript
    // services/notion.js
    filter: {
      "and": [
        {
          "property": "Sports", // <- 如更改对应属性的名称，记得同步修改这里
          "select": {
            "is_not_empty": true
          }
        },
        {
          // ...
        }
      ]
    }
    ```

## 部署到 Vercel
1. Fork 我这个 仓库。
2. 然后在 Vercel 上登录你的 GitHub 账号，导入你 Fork 的仓库。
3. 设置环境变量，注意一定不要修改环境变量的名字！
    1. `NOTION_TOKEN`: 这是你在创建 Internal Integration （内部集成）时获取的API令牌。不要忘记把它添加到你的数据库中。
    2. `NOTION_DATABASE_ID`: 你可以在数据库页面的网址中得到这个信息。

# English

This visualization is not limited to tracking sports, basically all activities recorded by single-choice category can be visualized with it.

1. The heading is determined by the description of the Notion database.
2. The database must contain two properties.
    1. "Name" field: Do not change the name in this field, and this property stores the date in "YYYY-MM-DD" format, e.g. "2023-03-14". This can be entered manually, or set up some automation using tool like make.com.
    2. "Sports" field: There is a column dedicated to the item you want to visualize, for example `Sports`, which type needs to be set to `Select`. If you want to change the field name, you need to also change the category name in `notion.js`.

    ```JavaScript
    // services/notion.js
    filter: {
      "and": [
        {
          "property": "Sports", // <- change here
          "select": {
            "is_not_empty": true
          }
        },
        {
          // ...
        }
      ]
    }
    ```

## Deploy to vercel
1. Fork this repo。
2. Login vercel with your Github account, then import and deploy the repo you forked。
3. Don't forget to set two environment variables! There are two variables to set, and do not change their names!
    1. `NOTION_TOKEN`: This is the API token you retrieved when create the internal integration. Don't forget to add it to your database.
    2. `NOTION_DATABASE_ID`: You can get this in the url of the database page.
