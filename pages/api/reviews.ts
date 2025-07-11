import type { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_fTTyHO6z7DDWnr2oYFkkKiy4OjXTihTm2gTrR7di7KPFr3tMR3ue3p7vPjaD_TgCHeqhlbuc7fp2/pub?output=csv";

  try {
    const response = await fetch(url);
    const text = await response.text();

    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");

    const reviews = lines.slice(1).map((line) => {
      const values = line.split(",");
      const entry: Record<string, string> = {};
      headers.forEach((header, i) => {
        entry[header.trim()] = values[i]?.trim();
      });
      return {
        name: values[1]?.trim(),
        rating: parseInt(values[2]),
        text: values[3]?.trim(),
      };
    });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch or parse data." });
  }
}
