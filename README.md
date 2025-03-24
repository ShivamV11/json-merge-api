# JSON Merge API

## Overview
This Node.js + Express API merges location data from two JSON files and provides useful analytics, such as:
- Merging location and metadata.
- Counting valid points per type (restaurants, hotels, cafes, etc.).
- Calculating the average rating per type.
- Identifying the location with the highest number of reviews.
- Finding locations with incomplete data.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/json-merge-api.git
   cd json-merge-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### 1. **Get Merged Locations**
**Endpoint:** `GET /locations`
- Merges location JSON with metadata JSON.
- Returns a list of merged location data.

**Response Example:**
```json
[
  {
    "id": "loc_01",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "type": "restaurant",
    "rating": 4.5,
    "reviews": 120
  },
  ...
]
```

---

### 2. **Count Locations Per Type**
**Endpoint:** `GET /count-by-type`
- Counts valid locations for each type (e.g., restaurant, hotel, cafe, etc.).

**Response Example:**
```json
{
  "restaurant": 3,
  "hotel": 3,
  "cafe": 2
}
```

---

### 3. **Get Average Ratings Per Type**
**Endpoint:** `GET /average-ratings`
- Calculates the average rating for each location type.

**Response Example:**
```json
{
  "restaurant": 4.1,
  "hotel": 3.4,
  "cafe": 4.6
}
```

---

### 4. **Get Location with Most Reviews**
**Endpoint:** `GET /top-reviewed`
- Finds the location with the highest number of reviews.

**Response Example:**
```json
{
  "id": "loc_07",
  "type": "hotel",
  "reviews": 900
}
```

---

### 5. **Get Locations with Incomplete Data**
**Endpoint:** `GET /incomplete-locations`
- Identifies locations with missing metadata.

**Response Example:**
```json
[
  {
    "id": "loc_08",
    "latitude": 24.0522,
    "longitude": -168.2197
  }
]
```

## Technologies Used
- **Node.js**
- **Express.js**
- **JavaScript**
- **JSON Data Handling**

---

Now you can test the API using Postman or a browser. 🚀

