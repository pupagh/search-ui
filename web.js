(async () => {
  let query = new URLSearchParams(location.search).get("query");
  displayQuery(query);

  let page = 0;
  let results = await getWebResults(query, page);
  let resultsElement = document.getElementById("results");

  function truncateString(str, n) {
    if (str.length > n) {
      return str.substring(0, n) + "...";
    } else {
      return str;
    }
  }

  if (results.results.length == 0) {
    resultsElement.textContent = "Sorry, there wasn't any results. :C";
  }
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
    li.append(resultTitle);
    li.append(url);
    resultsElement.append(li);
  });
})();
