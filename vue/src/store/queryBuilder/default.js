export default {
  "id": "1",
  "rules": [
    {
      "id": "1",
      "field": "Address",
      "value": "",
      "operator": "="
    },
    {
      "id": "2",
      "rules": [
        {
          "id": "1",
          "field": "Twitter",
          "value": "",
          "operator": "<"
        },
      ],
      "combinator": "or"
    },
    {
      "id": "3",
      "field": "Twitter",
      "value": "",
      "operator": "!="
    }
  ],
  "combinator": "AND"
}