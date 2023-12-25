# OCR Application

This OCR (Optical Character Recognition) application extracts information from Thai ID cards and stores the data in a MongoDB database later we can perform CRUD operations.

## Setup Instructions

1. **Clone the Repository:**

    ```bash
    https://github.com/anujatiwari/ocr-assignment.git
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Configure MongoDB:**

    - Create a MongoDB database and obtain the connection URI.
    - Update the MongoDB connection URI in `server.js`.

4. **Run the Application:**

    ```bash
    cd src
    npm start
    ```

    The server will start on [http://localhost:3001](http://localhost:3001).

## Dependencies

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web framework for building the server.
- **Mongoose:** MongoDB object modeling for Node.js.
- **Tesseract.js:** OCR library for recognizing text from images.
- **axios:** HTTP client for making requests to the OCR API.

## Architecture Overview

The OCR application follows a client-server architecture:

- **Frontend:** Built with React.js, it provides a user interface for uploading ID card images and displays the extracted information.
  
- **Backend:** Developed with Node.js and Express, the backend server handles file uploads, OCR processing, and data storage in MongoDB.

- **Database:** MongoDB is used to store OCR data. The OCR model defines the schema for storing identification numbers, names, last names, date of birth, and timestamps.

- **OCR Processing:** Tesseract.js is used for OCR processing. The backend sends the uploaded image to Tesseract.js, extracts text, processes the information, and stores it in the database.

## Contributing

If you would like to contribute to the development of this OCR application, please follow the [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).



