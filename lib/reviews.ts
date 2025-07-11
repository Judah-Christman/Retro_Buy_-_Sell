export async function getReviews() {
  const res = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFXt1iuB-aSRgVjfbvYNrzI9RiUUtcxPi_013UWAKUOoQ8drwM6eQss_uDDUSonemmDzxSsWMzrrBx/pub?output=csv"
  );
  const csvText = await res.text();

  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");

  const reviews = lines.slice(1).map((line) => {
    const values = line.split(",");
    const entry: Record<string, string> = {};
    headers.forEach((header, i) => {
      entry[header.trim()] = values[i]?.trim();
    });
    return {
      name: entry.name,
      rating: parseInt(entry.rating),
      text: entry.text,
    };
  });

  return reviews;
}
