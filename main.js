;(async function () {
  const weatherApiKey = 'API_KEY'

  // Function to get the postcode from the HTML
  function getPostcode() {
    const postcodeElement = document.querySelector('place-postal-address')
    if (postcodeElement) {
      const postcode = postcodeElement.textContent.match(
        /[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}/i
      )
      if (postcode) {
        return postcode[0]
      } else {
        console.error('Postcode not found in the provided HTML element.')
        return null
      }
    } else {
      console.error('Postcode element not found.')
      return null
    }
  }

  // Function to fetch coordinates using the postcode
  async function fetchCoordinates(postcode) {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        postcode
      )}&limit=1&appid=${weatherApiKey}`
    )
    if (!response.ok) {
      console.error('Error fetching coordinates:', response.statusText)
      return null
    }
    const data = await response.json()
    if (data.length > 0) {
      const { lat, lon } = data[0]
      return { latitude: lat, longitude: lon }
    } else {
      console.error('No results found for the given postcode.')
      return null
    }
  }

  // Function to fetch weather data
  async function fetchWeather(latitude, longitude) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
    )
    if (!response.ok) {
      console.error('Error fetching weather data:', response.statusText)
      return null
    }
    return await response.json()
  }

  // Display weather data
  function displayWeather(data) {
    if (!data) return

    const { name } = data
    const { description, icon } = data.weather[0]
    const { temp, feels_like } = data.main
    const { speed } = data.wind
    const { sunset, sunrise } = data.sys

    const weatherContainer = document.createElement('div')
    weatherContainer.style.border = '1px solid #ccc'
    weatherContainer.style.padding = '10px'
    weatherContainer.style.margin = '10px 0'
    weatherContainer.style.backgroundColor = '#f9f9f9'
    weatherContainer.innerHTML = `
      <h3>Weather in ${name}</h3>
      <p><strong>${description.toUpperCase()}</strong></p>
      <p>Temp: ${temp}°C</p>
      <p>Feels Like: ${feels_like}°C</p>
    `

    const mainContent = document.querySelector(
      'PlaceSummarystyle__Summary-sc-uf3onk-0 kKcMe Placestyle__StyledPlaceSummary-sc-7yy3d-2 kKgkNU'
    )
    if (mainContent) {
      mainContent.prepend(weatherContainer)
    } else {
      console.error('Container not found.')
    }
  }

  // Main function to get postcode, fetch coordinates, fetch weather, and display it
  async function main() {
    const postcode = getPostcode()
    if (postcode) {
      const coordinates = await fetchCoordinates(postcode)
      if (coordinates) {
        const weatherData = await fetchWeather(
          coordinates.latitude,
          coordinates.longitude
        )
        displayWeather(weatherData)
      }
    }
  }

  // Run the main function to start the process
  main()
})()
