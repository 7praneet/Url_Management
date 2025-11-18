import Url from '../models/Url.js';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();


export const createShortUrl = async (req, res) => {
const userId = req.user.id;
const { longUrl, alias } = req.body;
try {
let shortId;
if (alias) {
const exists = await Url.findOne({ alias });
if (exists) return res.status(400).json({ message: 'Alias already taken' });
shortId = alias;
} else {
shortId = nanoid(8);
}


const url = new Url({ user: userId, longUrl, shortId, alias: alias || null });
await url.save();
res.json(url);
} catch (err) {
console.error('Error in createShortUrl:', err);
res.status(500).json({ message: 'Server error', error: err.message });
}
};


export const getUserUrls = async (req, res) => {
try {
const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });
res.json(urls);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


export const redirectToLong = async (req, res) => {
const { id } = req.params; // shortId
try {
const url = await Url.findOne({ shortId: id });
if (!url) return res.status(404).json({ message: 'URL not found' });


url.clicks += 1;
// update simple clickHistory: today's bucket
const today = new Date();
today.setHours(0,0,0,0);
const last = url.clickHistory[url.clickHistory.length - 1];
if (last && last.date && new Date(last.date).getTime() === today.getTime()) {
last.count += 1;
} else {
url.clickHistory.push({ date: today, count: 1 });
}


await url.save();
return res.redirect(url.longUrl);
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
};


export const deleteUrl = async (req, res) => {
	const { id } = req.params; // url _id
	try {
		const url = await Url.findOneAndDelete({ _id: id, user: req.user.id });
		if (!url) return res.status(404).json({ message: 'URL not found' });
		return res.json({ message: 'URL deleted' });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};

export const getUrlAnalytics = async (req, res) => {
	const { id } = req.params; // url _id
	try {
		const url = await Url.findOne({ _id: id, user: req.user.id });
		if (!url) return res.status(404).json({ message: 'URL not found' });
		return res.json({
			shortId: url.shortId,
			alias: url.alias,
			longUrl: url.longUrl,
			clicks: url.clicks,
			clickHistory: url.clickHistory,
			createdAt: url.createdAt,
		});
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};
