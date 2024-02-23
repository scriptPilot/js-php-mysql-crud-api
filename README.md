# JavaScript PHP MySQL CRUD API

This is a minimal JavaScript wrapper for the incredible [PHP CRUD API](https://github.com/mevdschee/php-crud-api) by Maurits van der Schee.

## Installation

1. Install [Docker](https://www.docker.com/) and [Node.js](https://nodejs.org/)

2. Create a new app project:

    ```bash
    npm create vite
    ```

3. Add a PHP backend:

    ```bash
    npx add-php-backend
    ```
    
4. Install this module:

    ```bash
    npm install js-php-mysql-crud-api
    ```

## Usage

```js
import useAPI from 'js-php-mysql-crud-api'

const api = useAPI()

(async () => {

  // Add some records to the table
  await api.create('tasks', { title: 'First' })
  await api.create('tasks', { title: 'Second' })        
  await api.create('tasks', { title: 'Third' })

  // Retrieve a list of all records
  const records = await api.list('tasks')

  // Log them to the console
  console.log(records)

})()
```

## Methods

Change the API endpoint if required (default `/api.php`):

- `setEndpoint(endpoint)`

According to the [CRUD + List](https://github.com/mevdschee/php-crud-api#crud--list) operations:

- `create(table, item)`        
- `read(table, key)`
- `update(table, key, item)`
- `delete(table, key)`
- `list(path)`

According to the [Database Authentication](https://github.com/mevdschee/php-crud-api#database-authentication) operations:

- `me()`
- `register(username, password)`   
- `login(username, password)`
- `password(username, password, newPassword)`
- `logout()`

Request function for [Custom Controller](https://github.com/mevdschee/php-crud-api#custom-controller):

- `request(path, options = {})`
