# news-and-facts-randomizer

 A simple web news (global) and facts generator. Uses digital brutalism style.

 **APIs used**
+ NewsData.Io API
+ Cureents News API
+ Useless Fun Fact API (https://uselessfacts.jsph.pl/)
+ RestCountries API

**Features**
+ Dual-API Fallback: If NewsData.io (Plan A) is down or hits a rate limit, the app automatically switches to Currents API (Plan B). No "Blackouts" unless things are truly broken.
+ Country Sync: Uses the RestCountries API to dynamically load the "Atlas."
+ Fact Machine: Pulls random, verified useless facts because world news can be heavy.

 The website: https://skyler-1111.github.io/news-and-facts-randomizer/
