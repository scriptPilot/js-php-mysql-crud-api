# JavaScript PHP MySQL CRUD API

This is a minimal JavaScript wrapper for the incredible [PHP CRUD API](https://github.com/mevdschee/php-crud-api) by Maurits van der Schee.

## Usage

1. Install and configure the [PHP CRUD API Script](https://github.com/mevdschee/php-crud-api#installation).

2. Add the [js-php-mysql-crud-api.js](./js-php-mysql-crud-api.js) file to your project.

3. Create a MySQL table:

    ```sql
    create table tableName (
      id int(4) not null auto_increment,
      title varchar(32),
      primary key (id)
    );
    ```

4. Load the API Wrapper and use the methods:

    ```html
    <html>
      <body>
    
        <!-- Use script tag with type = module -->
        <script type="module">
    
          // Import API to your script
          import api from './js-php-mysql-crud-api.js'    
    
          // Use the API methods
          (async () => {
    
            // Add some records to the table
            await api.create('tableName', { title: 'First' })
            await api.create('tableName', { title: 'Second' })        
            await api.create('tableName', { title: 'Third' })
    
            // Retrieve a list of all records
            const records = await api.list('tableName')
    
            // Log them to the console
            console.log(records)
    
          })()
    
        </script>
    
      </body>
    </html>
    ```

**If you use [NPM](https://www.npmjs.com/package/js-php-mysql-crud-api) as a package manager it is even more simpler:**

    ```bash
    npm install js-php-mysql-crud-api
    ```
    
    ```js
    import api from 'js-php-mysql-crud-api'
    
    ...
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
