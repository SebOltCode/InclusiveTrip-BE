# InclusiveTrip-BE

## https://inclusivetrip.onrender.com/

(An English translation can be found at the end of this text.)

Willkommen zu unserem Finalprojekt **InclusiveTrip**, das wir im Rahmen unseres Bootcamps zum Fullstack Web Developer entworfen haben. InclusiveTrip ist die Plattform, die Stadtplanung und Reisen für alle zugänglich macht. Mit einer interaktiven Karte, die auf Ihre persönlichen Bedürfnisse zugeschnitten ist, können Sie mühelos nach Restaurants, Geschäften, Museen und anderen öffentlichen Orten suchen und diese nach ihren Barrierefreiheitsmerkmalen filtern. So sehen Sie nur die Bewertungen und Kommentare, die für Sie relevant sind – sei es der rollstuhlgerechte Zugang, eine blindenfreundliche Beschilderung oder ob das Café eine Kinderspielecke hat.

Unsere Plattform bietet zudem eine lebendige Community, in der Nutzer Erfahrungen teilen, bewerten und neue Orte entdecken können. Ob Sie auf der Suche nach einem geeigneten Ausflugsziel sind oder einfach nur wissen wollen, wo Sie einen stressfreien Tag verbringen können – InclusiveTrip ist Ihr verlässlicher Begleiter.

Lassen Sie uns gemeinsam Städte zugänglicher und inklusiver gestalten – für alle, die sie erleben möchten!

## Mitarbeiter

- **Adnan Abdalrahmen - adnanabdalrahman on github**
- **Ahmed Mohamad - AhmedMohamad7 on github**
- **Julia Löw - JuliaLoew on github**
- **Sebastian Olthoff - SebOltCode on github**

## Dauer

- **Projektlaufzeit:** 2 Wochen

## Technologien

- **Frontend:** HTML, CSS, TailwindCSS, DaisyUI, JavaScript, React
- **Backend:** NodeJS, Express
- **Datenbank:** PostgreSQL
- **Versionierung:** Git, GitHub
- **APIs:** Leaflet API

## Features

- **Interaktive Karte:** Suchen und Filtern von Orten nach Barrierefreiheitsmerkmalen.
- **Personalisierte Benutzererfahrung:** Anzeigen von relevanten Bewertungen und Kommentaren basierend auf den persönlichen Bedürfnissen.
- **Community-Plattform:** Teilen, Bewerten und Entdecken von neuen Orten durch die Nutzer.
- **Benutzerfreundliches Design:** Intuitive Benutzeroberfläche, die leicht zugänglich ist.

## Danksagungen

Wir möchten uns bei unseren Mentoren und Kommilitonen für die Unterstützung und wertvollen Ratschläge bedanken, die dieses Projekt möglich gemacht haben.

# English:

# InclusiveTrip

## https://inclusivetrip.onrender.com

Welcome to our final project **InclusiveTrip**, which we developed as part of our Fullstack Web Developer Bootcamp. InclusiveTrip is the platform that makes urban planning and travel accessible to everyone. With an interactive map tailored to your personal needs, you can effortlessly search for restaurants, shops, museums, and other public places, filtering them by their accessibility features. This way, you only see reviews and comments relevant to you—whether it's wheelchair accessibility, braille signage, or if the café has a play area for children with special needs, such as ADHD.

Our platform also offers a vibrant community where users can share experiences, rate places, and discover new locations. Whether you're looking for a suitable excursion or simply want to know where you can spend a stress-free day, InclusiveTrip is your reliable companion.

Let’s work together to make cities more accessible and inclusive—for everyone who wants to experience them!

## Team Members

- **Adnan Abdalrahmen - adnanabdalrahman on github**
- **Ahmed Mohamad - AhmedMohamad7 on github**
- **Julia Löw - JuliaLoew on github**
- **Sebastian Olthoff - SebOltCode on github**

## Duration

- **Project duration:** 2 weeks

## Technologies

- **Frontend:** HTML, CSS, TailwindCSS, DaisyUI, JavaScript, React
- **Backend:** NodeJS, Express
- **Database:** PostgreSQL
- **Version Control:** Git, GitHub
- **Deployment:** Docker, Heroku
- **APIs:** Google Maps API

## Features

- **Interactive Map:** Search and filter places by accessibility features.
- **Personalized User Experience:** Display relevant reviews and comments based on personal needs.
- **Community Platform:** Share, rate, and discover new places through the community.
- **User-Friendly Design:** Intuitive user interface that is easy to navigate.

## Acknowledgments

We would like to thank our mentors and fellow students for their support and valuable advice that made this project possible.

## API Endpoints

The following endpoints are available:

### Users

- **POST /users** Create a new user.
- **GET /users** Get all users.
- **GET /users/count** Get the count of the users.
- **GET /users/:id** Get a single user by id.
- **PUT /users/:id** Update an existing user by id.
- **DELETE /users/:id** Delete an user by id.

### Reviews

- **POST /reviews** Create a new review.
- **GET /reviews** Get all reviews.
- **GET /reviews/count** Get the count of reviews.
- **GET /reviews/user** Get all reviews for the signed in user.
- **GET /reviews/:placeId** Get a single review by placeId.
- **PUT /reviews/:placeId** Update an existing review by placeId.
- **DELETE /reviews/:placeId** Delete an review by placeId.

### Auth

- **POST /auth/register** Register a new user.
- **POST /auth/signin** Authenticates the user.
- **GET /auth/me** Get the logged-in user.
- **DELETE /auth/signout** Logging out the logged in user.

### PlaceCategories

- **POST /placeCategories** Create a new placeCategory.
- **GET /placeCategories** Get all placeCategories.
- **GET /placeCategories/selected** Get all selected placecategories.
- **GET /placeCategories/:name** Get a single placeCategory by name.
- **PUT /placeCategories/:id** Update an existing placeCategory by id.
- **DELETE /placeCategories/:id** Delete an placeCategory by id.

### Roles

- **POST /roles** Create a new role.
- **GET /roles** Get all roles.
- **GET /roles/:id** Get a single role by id.
- **PUT /roles/:id** Update an existing role by id.
- **DELETE /roles/:id** Delete an role by id.

### Barriers

- **POST /barriers** Create a new barrier.
- **GET /barriers** Get all Barriers.
- **GET /barriers/selected** Get all selected Barriers.
- **GET /barriers/:name** Get a single barrier by name.
- **PUT /barriers/:name** Update an existing barrier by name.
- **DELETE /barriers/:name** Delete an barrier by name.

### BarriersReviews

- **POST /barriersReviews** Create a new barriersReview.
- **GET /barriersReviews** Get all barriersReviews.
- **GET /barriersReviews/:id** Get a single barriersReview by id.
- **PUT /barriersReviews/:id** Update an existing barriersReview by id.
- **DELETE /barriersReviews/:id** Delete an barriersReview by id.

### FileUploads

- **POST /file-upload** Create a new FileUpload.
- **GET /file-upload** Get all FileUploads.
- **GET /file-upload/:filename** Get a single FileUpload by filename.
- **PUT /file-upload/:filename** Update an existing FileUpload by filename.
- **DELETE /file-upload/:filename** Delete an FileUpload by filename.

### ProfilePhotos

- **POST /profilePhotos** Create a new profilePhoto.
- **GET /profilePhotos/:userid** Get a single profilePhoto by userid.
- **PUT /profilePhotos/:userid** Update an existing profilePhoto by userid.
- **DELETE /profilePhotos/:userid** Delete an profilePhoto by userid.
