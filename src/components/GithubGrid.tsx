import { Reveal } from "@/components/ui/Reveal";
import * as cheerio from "cheerio";

interface Day {
  level: number;
  count: number;
  date: string;
}

async function getContributions(username: string): Promise<Day[]> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: 3600 }
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

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 0: return "bg-[#161b22]";
      case 1: return "bg-[#0e4429]";
      case 2: return "bg-[#006d32]";
      case 3: return "bg-[#26a641]";
      case 4: return "bg-[#39d353]";
      default: return "bg-[#161b22]";
    }
  };

  const columns: Day[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    columns.push(cells.slice(i, i + 7));
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-24 md:px-8 flex justify-center">
      <Reveal delay={0.2} direction="up">
        <div className="w-full max-w-[calc(100vw-2rem)] overflow-x-auto overflow-y-visible hide-scrollbar pt-14 pb-4">
          <div className="flex flex-col gap-2 mx-auto w-fit">
            <div className="flex gap-1">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {col.map((day, rowIndex) => {
                    const isLastFew = colIndex > columns.length - 8;
                    const isFirstFew = colIndex < 8;
                    
                    const tooltipAlignClass = isLastFew 
                      ? "right-1/2 translate-x-3" 
                      : isFirstFew 
                        ? "left-1/2 -translate-x-3" 
                        : "left-1/2 -translate-x-1/2";
                    
                    const arrowAlignClass = isLastFew 
                      ? "right-3" 
                      : isFirstFew 
                        ? "left-3" 
                        : "left-1/2 -translate-x-1/2";

                    return (
                      <div key={`${colIndex}-${rowIndex}`} className="group relative">
                        <div
                          className={`h-[10px] w-[10px] rounded-[2px] ${getColor(day.level)} transition-colors hover:ring-1 hover:ring-white/50 cursor-pointer flex-shrink-0`}
                        />
                        <div className={`pointer-events-none absolute bottom-full mb-2 w-max opacity-0 transition-opacity group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium ${tooltipAlignClass}`}>
                          {day.count === 0 ? "No" : day.count} contribution{day.count !== 1 ? "s" : ""} on {day.date}
                          <div className={`absolute top-full border-[5px] border-transparent border-t-foreground ${arrowAlignClass}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
