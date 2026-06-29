import * as cheerio from "cheerio";

export async function getGithubStats(username: string) {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: 3600 }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Find the text like "425 contributions in the last year"
    const heading = $('h2.f4.text-normal.mb-2').text().trim();
    const match = heading.match(/([\d,]+)\s+contributions/);
    if (match) {
      return match[1]; // e.g. "425"
    }
    return "0";
  } catch (error) {
    console.error("Error fetching github stats:", error);
    return "0";
  }
}
