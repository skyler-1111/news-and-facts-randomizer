
// Keys 
const key1 = 'pub_365e7bad3c8944849df9bc48350c3e41';
const key2 = 'VP8o-hxlvDg1_FjLxuQw-f8JFwyFuIzwFCC-gxu8hmitJ9Im';

const countryDrop = document.getElementById('countryselect');
const newsBtn = document.getElementById('newsbutton');
const factBtn = document.getElementById('factbutton');
const newsbox = document.getElementById('newsdisplay');
const factBox = document.getElementById('factdisplay');

function displaynews(title, text, site) {
    newsbox.innerHTML = `
        <h3>${title}</h3>
        <p>${text || 'No description found.'}</p>
        <small>Source: ${site}</small>
    `;
}
async function getnews() {
    const val = countryDrop.value;
    newsbox.innerHTML = 'Loading news...';

    try {
        const response = await fetch(`https://newsdata.io/api/1/news?apikey=${'pub_365e7bad3c8944849df9bc48350c3e41'}&country=${val}&language=en`);
        const result = await response.json();

        if (result.results && result.results.length > 0) {
            const story = result.results[Math.floor(Math.random() * result.results.length)];
            
            const artCountry = story.country ? story.country[0] : 'unknown';
            if (artCountry === val || val === 'us') {
                displaynews(story.title, story.description, "NewsData.io");
            } else {
                throw "bad country match";
            }
        } else {
            throw "nothing found";
        }
    } catch (e) {
        console.log("NewsData failed (or bad country), trying fallback...");
        // trying the second api if first one dips out
        try {
            const url2 = `https://api.currentsapi.services/v1/latest-news?country=${val}&language=en&apiKey=${'VP8o-hxlvDg1_FjLxuQw-f8JFwyFuIzwFCC-gxu8hmitJ9Im'}`;
            const res2 = await fetch(url2);
            const data2 = await res2.json();

            if (data2.news && data2.news.length > 0) {
                // Currents API also needs a check just in case
                const story2 = data2.news[Math.floor(Math.random() * data2.news.length)];
                displaynews(story2.title, story2.description, "Currents API");
            } else {
                newsbox.innerHTML = "Both sources are dry. No English news for this spot.";
            }
        } catch (err) {
            newsbox.innerHTML = "News machine is fully broken. Go outside?";
        }
    }
}

async function getfacts() {
    factBox.innerHTML = 'Thinking...';
    try {
        const r = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        const d = await r.json();
        factBox.innerHTML = `<strong>ID: ${d.id.split('-')[0]}</strong><p>${d.text}</p>`;
    } catch (err) {
        factBox.innerHTML = 'Fact machine broke.';
    }
}

async function init() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
        const list = await res.json();
        list.sort((a, b) => a.name.common.localeCompare(b.name.common));

        let html = '';
        list.forEach(c => {
            html += `<option value="${c.cca2.toLowerCase()}">${c.name.common}</option>`;
        });
        countryDrop.innerHTML = html;
        countryDrop.value = 'us';
    } catch (e) {
        countryDrop.innerHTML = '<option>L + No Countries</option>';
    }
}

init();
newsBtn.addEventListener('click', getnews);

factBtn.addEventListener('click', getfacts);
