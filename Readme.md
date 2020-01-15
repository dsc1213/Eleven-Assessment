# 7BOSS Interview

## Interview code-exercise setup

Create a folder for eleven-Interview
cd eleven-Interview

Install json-server globally using

```shell
  npm install json-server -g
```

create a file "db.json"  -> with following content.

``` db.json
{
  "items": [
    { "id": 1, "itemName": "Coke", "boh": 25, "moh": 54, "ldu": 6, "orderQty": ""},
    { "id": 2, "itemName": "Pepsi", "boh": 12, "moh": 32, "ldu": 12, "orderQty": ""},
    { "id": 3, "itemName": "Water", "boh": 20, "moh": 50, "ldu": 24, "orderQty": ""},
    { "id": 4, "itemName": "Candy", "boh": 15, "moh": 80, "ldu": 1, "orderQty": ""},
    { "id": 5, "itemName": "Donuts", "boh": 2, "moh": 6, "ldu": 1, "orderQty": ""},
    { "id": 6, "itemName": "Milk", "boh": 1, "moh": 6, "ldu": 2, "orderQty": ""}
  ]
}
```

run below to start a mock server, which gives you access to restful api, to consume it in the sample UI.

``` running json-server
    json-server db.json -p 3001

    You can access the server from below url:
    http://localhost:3001/items
```

## Problem to solve

You should use React, Redux, Axios to get the list from server. You are free to use any additional libraries to make things better.

Create React Project

Create component to show item list.

Create a component to show item details when user clicks on item name with a form to enable input,

Item Name -> Display only
BOH -> Balance On Hand -> Numeric, user can modify data. Should only be able to enter numbers, no text or special characters should not be allowed.
MOH -> Minimum on Hand -> Validations shoud be same as above.
LDU -> Least deliverable unit -> Numberic, Display only.
orderQty -> Order Quantity -> Numeric, User shold be able to input positive numbers only, 0 and upto 5 digits. Must be a multiple of LDU.

BOH, MOH and orderQty -> Enter submits data back to server, just updates when user presses enter or the text box loses focus.,
              Important Validation (for BOH and MOH): Make API submit call only when the original value is differnt from new value.
                                                      If user removes and puts back the same value before losing focus or enter, request should not be submitted to server.
                                                      If user refreshes the page, original value should be put back.
                                                      If user changes the value and different from original value, user should be able to submit for saving to server.

Only if time is not sufficient.
  Write a console log to show you are submitting or not submitting, no need for api code implementation for submitting to server.
