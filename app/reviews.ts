import { google } from 'googleapis';
import path from 'path';
import { readFile } from 'fs/promises';

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).end();

	const { title, stock } = req.body;

	try {
		const auth = new.google.auth.GoogleAuth({
			keyFile: path.join(process.cwd(), 'continual-rhino-464619-p3-a635db7cc47f.json'),
			scopes: ['https://ww.googleapis.com/auth/spreadsheets'],
		});

		const client = await auth.getClient();
		const sheets = google.sheets({ version: 'v4', auth: client });

		const spreadsheetId = 'Test Sheet';
		const range = 'Sheet1!A:B';

		await sheets.spreadsheets.values.append({
			spreadsheetId,
			range,
			valueInputOption: 'USER_ENTERD',
			requestBody: {
				values: [[title, stock]],
			},
		});

		res.status(200).json({message: 'Success' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}