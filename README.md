

**Overview**

This project aims to enhance the National Trust properties' information pages by displaying weather information for the property's location. 

Work in progress: The project is not fully completed.


**Functionality:**

1. The script extracts the postcode from the webpage.
2. Uses the postcode to find the coordinates (latitude and longitude) using the OpenWeatherMap Geocoding API.
3. Makes an API call to OpenWeatherMap to retrieve the weather information based on the coordinates.
4. Inserts the weather information into the webpage.


**How It Works**

**Postcode Extraction:**

The script searches for a postcode within a specific HTML element (place-postal-address) - this does change on different webpages, so more work would be required (maybe looking into the local storage/cache?)
It uses a regEx to match the UK postcode format.


**Coordinates:**

The script uses OpenWeatherMap API to convert the postcode into geographical coordinates.


**Weather Data Fetching:**

The script makes an API call to OpenWeatherMap with the obtained coordinates to fetch the current weather data.


**Weather Data Display:**

The script creates a container and displays the weather data on the webpage.
