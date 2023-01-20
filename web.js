(async () => {
  let query = new URLSearchParams(location.search).get("query");
  displayQuery(query);

  if (query.trim().toLowerCase() == "bing") {
    if (
      confirm(
        "The search term 'Bing' causes issues. Would you like to go to Bing.com?"
      )
    ) {
      location = "//bing.com";
    } else {
      location = "index.html";
    }
  }

  let page = 0;
  let results = await getWebResults(query, page);
  let resultsElement = document.getElementById("results");

  if ("calculated" in results) {
    document.getElementById("calc").append(results.calculated);
    document.getElementById("calc").append(document.createElement("hr"));
  }

  function truncateString(str, n) {
    if (str.length > n) {
      return str.substring(0, n) + "...";
    } else {
      return str;
    }
  }

  if (results.results.length == 0) {
    resultsElement.textContent = "Sorry, there wasn't any results. :C";
    document.getElementById("more-results").setAttribute("disabled", "true");
  }
  async function displayResults(results) {
    results.results.forEach((result) => {
      let li = document.createElement("li");
      let resultTitle = document.createElement("h3");
      let resultInnerTitle = document.createElement("a");
      let resultFavicon = document.createElement("img");
      resultFavicon.src = result.favicon;
      resultFavicon.style.verticalAlign = "middle";
      resultFavicon.style.paddingRight = "10px";
      resultInnerTitle.textContent = result.title;
      resultInnerTitle.insertAdjacentElement("afterbegin", resultFavicon);
      resultInnerTitle.href = result.url;
      resultTitle.style.marginBottom = 0;
      resultTitle.append(resultInnerTitle);
      let url = document.createElement("p");
      url.textContent = truncateString(result.url, 50);
      url.style.paddingTop = "2px";
      let snippet = document.createElement("p");
      snippet.textContent = result.snippet;
      li.append(resultTitle);
      li.append(url);
      li.append(snippet);
      resultsElement.append(li);
    });
  }
  displayResults(results);
  document.getElementById("more-results").removeAttribute("aria-busy");
  document.getElementById("more-results").onclick = async () => {
    document.getElementById("more-results").setAttribute("aria-busy", "true");
    page += 1;
    displayResults(await getWebResults(query, page));
    document.getElementById("more-results").removeAttribute("aria-busy");
  };
})();
