const cheerio = require('cheerio');

fetch('https://github.com/users/vishwas-11/contributions')
  .then(r => r.text())
  .then(html => {
    const $ = cheerio.load(html);
    $('td.ContributionCalendar-day').slice(0, 5).each((i, el) => {
      const id = $(el).attr('id');
      const text = $('tool-tip[for="' + id + '"]').text().trim();
      const level = $(el).attr('data-level');
      console.log({ id, level, text });
    });
  });
