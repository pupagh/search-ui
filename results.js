function displayQuery(query) {
  document.title = query;
  document.getElementById("query").value = query;
}

async function getWebResults(query, page) {
  let results = await fetch(
    `${instanceUrl}/web?query=${encodeURIComponent(query)}&page=${page}`
  );
  results = await results.json();
  return results;
}
