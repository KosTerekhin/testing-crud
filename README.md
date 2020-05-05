# testing-crud
Tech stack: 
1. React - contextAPI, hooks
2. Node.js - express, multer(file upload)
3. MongoDB and Cloudinary (file storage)

Fucntionality:
1. Main/Landing page:
  a. Body:
    -Displays list of superheroes. Only nickname and 1 page fetched.
    -View more button -> redirect to superheros' details
  b. Navbar:
    -Logo -> redirects to '/'
    -Add new SupeHero button -> redirect '/add'
  c. Pangiantion:   
    -Set to display 5 per page. Quantity per page ca be changed in Main.js
    -Works dependin on the total quantity and will not redirect to non-existing page(i.e index of -1 or beyond total quantity) 

2. Add page:
  -Posts new superhero to DB and image is being saved to Cloudinary
  
3. Superhero page:
  a. Upload:
   -Multi file upload. Send all data as a bundle and saves links to DB and files into Cloudinary. Accepts only JPEG/PNG/JPG.
  b. Image delete:
   -Removes files from DB and Cloudinary
  c. Delete Superhero:
   -Removes the entire superhero from DB
  d. Update Bio:
   -Updates all text fiels. Nickname must be unique. 
  
