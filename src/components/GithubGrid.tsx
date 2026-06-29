import * as cheerio from "cheerio";
import GithubGridClient, { Day } from "./GithubGridClient";

async function getContributions(username: string): Promise<Day[]> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      cache: 'no-store'
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const days: Day[] = [];
    $('td.ContributionCalendar-day').each((i, el) => {
      const levelStr = $(el).attr('data-level');
      const date = $(el).attr('data-date');
      const id = $(el).attr('id');
      
      if (levelStr !== undefined && date && id) {
        const text = $('tool-tip[for="' + id + '"]').text().trim();
        let count = 0;
        if (text) {
          const firstWord = text.split(' ')[0];
          count = firstWord.toLowerCase() === 'no' ? 0 : parseInt(firstWord, 10);
          if (isNaN(count)) count = 0;
        }
        days.push({ level: parseInt(levelStr, 10), count, date });
      }
    });
    return days;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
}

export default async function GithubGrid() {
  let cells = await getContributions("vishwas-11");
  
  if (cells.length === 0) {
    cells = Array.from({ length: 52 * 7 }).map(() => ({ level: 0, count: 0, date: "" }));
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:px-8 flex justify-center">
      <GithubGridClient cells={cells} />
    </section>
  );
}
