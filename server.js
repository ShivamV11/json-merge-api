const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Function to load JSON files
const loadJSON = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
        return [];
    }
};

// Load and parse JSON files
const locations = loadJSON("location.json");
const metadata = loadJSON("metadata.json");

// Convert locations array to a dictionary for fast lookup
const locationsDict = {};
locations.forEach((loc) => {
    locationsDict[loc.id] = { ...loc };
});

// Merge metadata into locations
metadata.forEach((meta) => {
    if (locationsDict[meta.id]) {
        locationsDict[meta.id] = { ...locationsDict[meta.id], ...meta };
    }
});

// Convert merged data back to an array
const mergedData = Object.values(locationsDict);

// Query Functions

// Count valid locations per type
const countLocationsByType = () => {
    const typeCount = {};
    mergedData.forEach((loc) => {
        if (loc.type) {
            typeCount[loc.type] = (typeCount[loc.type] || 0) + 1;
        }
    });
    return typeCount;
};

// Calculate average rating per type
const averageRatingByType = () => {
    const ratingSum = {};
    const ratingCount = {};

    mergedData.forEach((loc) => {
        if (loc.type && loc.rating) {
            ratingSum[loc.type] = (ratingSum[loc.type] || 0) + loc.rating;
            ratingCount[loc.type] = (ratingCount[loc.type] || 0) + 1;
        }
    });

    const avgRating = {};
    for (const type in ratingSum) {
        avgRating[type] = ratingSum[type] / ratingCount[type];
    }

    return avgRating;
};

// Find the location with the highest reviews
const highestReviewedLocation = () => {
    return mergedData.reduce((max, loc) => {
        return loc.reviews && (!max || loc.reviews > max.reviews) ? loc : max;
    }, null);
};

// Identify locations with incomplete data
const incompleteLocations = () => {
    return mergedData.filter((loc) => !loc.type || !loc.rating || !loc.reviews).map((loc) => loc.id);
};

// Express Routes
app.get("/", (req, res) => {
    res.send("Welcome to the JSON Analysis API!");
});

app.get("/count-by-type", (req, res) => {
    res.json(countLocationsByType());
});

app.get("/average-rating", (req, res) => {
    res.json(averageRatingByType());
});

app.get("/highest-reviewed", (req, res) => {
    const result = highestReviewedLocation();
    res.json(result ? result : { message: "No data available" });
});

app.get("/incomplete-data", (req, res) => {
    res.json({ incompleteLocations: incompleteLocations() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
