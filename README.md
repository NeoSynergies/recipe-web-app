----> This is the RECIPE WEB APP created by Joan Pol Cosp as a coding challenge

Steps to initalize the project:
    - npm install
    - ionic serve

If you want to test the authentication:

    - Go to the auth.service

    - Change the user id (per default: aijsndiusad) of the endpoint 'http://localhost:3000/users/aijsndiusad'

    - If you don't create a user in the backend db you will see the web as a non authenticated user
    

Some considerations:

    - The only thing changed in the backend is that I added the CORS package. I fixed some typing errors.

    - The project is developed under the condition of not editing the REST (because I didn't know that I could change it)
        so some things are not done in the best way. For example, the ZIP (rxjs) done for the search functionality
        in a normal project I would have a search endpoint and there I would do the logic, but here i did on the frontend

    - It is supposed that the ingredients are private and only the user can see his/her owns, so the search functionality only
        shows the user's ingredients.

    - The recipes however are public

    - Non authenticated users cannot: create recipe, edit or remove recipes and every action related to the shopping list isn't possible

    - When creating a recipe you can attach a pic but it won't be uploaded to the server because there is no backend functionality to do that
        so it assigns the dummy.jpg on every new recipe


If anything is not clear, talk to me and we can discuss it.

Thank you!