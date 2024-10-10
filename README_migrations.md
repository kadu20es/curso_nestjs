For the sake of simplicity, just make sure you do the following regarding migrations:

Generate a migration whenever there’s a change in your entities: Run: npm run migration:generate src/database/migrations/NameOfTheChange . Make sure you replace NameOfTheChange with a name referring to the change you’ve actually made in your entities. Eg: CreateUsersTable.
Run migrations after every migrations change. Make sure you’ve done npm run build before running migrations. Use the following command to run migrations: npm run migration:run
The above commands just allow you to work faster but you can always manually write your own migrations. To do so, first create an empty migration by running npm run migration:create src/database/migrations/NameOfTheChange , then open the migration generated at src/database/migrations/ .

Inside every migration file there are two functions:

Up: This is where you write the SQL code that applies the change in your database schema.
Down: Here you write the SQL code that reverses whatever is done in the up function.
