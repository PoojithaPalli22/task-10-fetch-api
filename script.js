const button = document.getElementById("fetchBtn");
const input = document.getElementById("countryInput");
const result = document.getElementById("result");
const loading = document.getElementById("loading");

button.addEventListener("click", () => {
    const countryName = input.value.trim();

    if (countryName === "") {
        result.innerHTML = "Please enter a country name";
        return;
    }

    loading.textContent = "Loading...";
    result.innerHTML = "";

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(data => {
            // Try to find exact match, otherwise take first result
            const country =
                data.find(
                    c => c.name.common.toLowerCase() === countryName.toLowerCase()
                ) || data[0];

            result.innerHTML = `
                <h3>${country.name.common}</h3>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Population:</strong> ${country.population}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <img src="${country.flags.png}" width="120">
            `;
        })
        .catch(error => {
            result.innerHTML = error.message;
        })
        .finally(() => {
            loading.textContent = "";
        });
});