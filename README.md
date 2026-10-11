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
- **Deployment:** Render
- **APIs:** Leaflet, OpenStreetMap, Overpass API

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
- **Deployment:** Render
- **APIs:** Leaflet, OpenStreetMap, Overpass API

## Features

- **Interactive Map:** Search and filter places by accessibility features.
- **Personalized User Experience:** Display relevant reviews and comments based on personal needs.
- **Community Platform:** Share, rate, and discover new places through the community.
- **User-Friendly Design:** Intuitive user interface that is easy to navigate.

## Acknowledgments

We would like to thank our mentors and fellow students for their support and valuable advice that made this project possible.

## Setup

1. Copy `example-ENV-file` to `.env` and fill in `PG_URI`, `JWT_SECRET`, `FRONTEND_URL` and `BASE_URL` (public URL of this backend, used for upload links).
2. `npm install` and `npm run dev`.
3. On start the tables are created and – only if they are empty – seeded with roles (`1 admin`, `2 moderator`, `3 user`), barriers and place categories. Their IDs match the translation keys of the frontend.
4. To get an admin, set `roleId` of a user to `1` in the database. Admins can manage users, roles, barriers and place categories.

Authentication uses an `httpOnly` cookie named `token` (set by `/auth/signin`). Clients must send requests with credentials.

## API Endpoints

Legend: 🌐 public · 🔑 signed in · 👤 signed in and owner (or the user themselves) · 🛡️ admin

### Auth

- 🌐 **POST /auth/register** Register a new user (`firstName`, `lastName`, `email`, `password` ≥ 8 chars).
- 🌐 **POST /auth/signin** Sign in, sets the auth cookie.
- 🔑 **GET /auth/me** Get the signed-in user.
- 🌐 **DELETE /auth/signout** Sign out, clears the auth cookie.

### Users

- 🛡️ **POST /users** Create a new user.
- 🛡️ **GET /users** Get all users.
- 🌐 **GET /users/count** Get the number of users (`{ count }`).
- 👤 **GET /users/:id** Get a single user.
- 👤 **PUT /users/:id** Update a user (partial). Only admins may change `roleId` and `blocked`.
- 👤 **DELETE /users/:id** Delete a user including their reviews and photos.

Passwords are always stored hashed and never returned.

### Reviews

- 🔑 **POST /reviews** Create a new review.
- 🌐 **GET /reviews** Get all reviews.
- 🌐 **GET /reviews/count** Get the number of reviews (`{ count }`).
- 🔑 **GET /reviews/user** Get all reviews of the signed-in user.
- 🌐 **GET /reviews/place/:placeId** Get all reviews of a place.
- 🌐 **GET /reviews/place/:placeId/summary** Average rating per barrier and overall for a place.
- 🌐 **GET /reviews/reviewid/:reviewId** Get a single review.
- 🌐 **GET /reviews/filtered?placeId=&barrierId=** Get barrier ratings of a place for one barrier.
- 👤 **PUT /reviews/:reviewId** Update a review.
- 👤 **DELETE /reviews/:reviewId** Delete a review including barrier ratings and photos.

### BarriersReviews

- 👤 **POST /barriersReviews** Create a barrier rating (1–5) for an own review.
- 🌐 **GET /barriersReviews** Get all barrier ratings.
- 🌐 **GET /barriersReviews/:id** Get a single barrier rating.
- 🌐 **GET /barriersReviews/review/:reviewId** Get all barrier ratings of a review.
- 👤 **PUT /barriersReviews/:id** Update a barrier rating.
- 👤 **DELETE /barriersReviews/:id** Delete a barrier rating.
- 👤 **DELETE /barriersReviews/review/:reviewId** Delete all barrier ratings of a review.

### FileUploads

- 👤 **POST /file-upload** Upload up to 5 JPEG/PNG images (max. 5 MB each, field `files`) for an own review (`reviewId`).
- 🌐 **GET /file-upload** Get all files.
- 🌐 **GET /file-upload/:filename** Get a single file.
- 🛡️ **PUT /file-upload/:filename** Update file metadata.
- 👤 **DELETE /file-upload/:filename** Delete a file of an own review.

### ProfilePhotos

- 👤 **POST /profilePhotos/:userid** Upload the own profile photo (field `file`, JPEG/PNG, max. 5 MB).
- 🌐 **GET /profilePhotos/:userid** Get the profile photo URL of a user.
- 👤 **PUT /profilePhotos/:userid** Set the own profile photo to an already uploaded photo URL.
- 👤 **DELETE /profilePhotos/:userid** Delete the own profile photo.

### PlaceCategories

- 🛡️ **POST /placeCategories** Create a new place category (`tag`/`searchName` must be OSM identifiers).
- 🌐 **GET /placeCategories** Get all place categories.
- 🌐 **GET /placeCategories/selected** Get all selected place categories.
- 🌐 **GET /placeCategories/:name** Get a single place category by name.
- 🛡️ **PUT /placeCategories/:id** Update a place category.
- 🛡️ **DELETE /placeCategories/:id** Delete a place category.

### Roles

- 🛡️ **POST /roles** Create a new role.
- 🌐 **GET /roles** Get all roles.
- 🌐 **GET /roles/:id** Get a single role.
- 🛡️ **PUT /roles/:id** Update a role.
- 🛡️ **DELETE /roles/:id** Delete a role.

### Barriers

- 🛡️ **POST /barriers** Create a new barrier.
- 🌐 **GET /barriers** Get all barriers.
- 🌐 **GET /barriers/selected** Get all selected barriers.
- 🌐 **GET /barriers/:name** Get a single barrier by name.
- 🛡️ **PUT /barriers/:name** Update a barrier.
- 🛡️ **DELETE /barriers/:name** Delete a barrier.

### RSS

- 🌐 **GET /rss/rss-feed** Blog posts of barrierefrei-aufgerollt.at.
