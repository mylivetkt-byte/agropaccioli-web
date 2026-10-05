const ytSearch = require('yt-search');

async function search() {
  const queries = [
    "riego por goteo preparacion",
    "riego por goteo instalacion",
    "riego por goteo mantenimiento agricola",
    "riego por goteo resultados"
  ];
  for (let q of queries) {
    const r = await ytSearch(q);
    console.log(`--- Query: ${q} ---`);
    if(r.videos.length > 0) {
      console.log(r.videos[0].title);
      console.log(r.videos[0].videoId);
    }
  }
}
search();
