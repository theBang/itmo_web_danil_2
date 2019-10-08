const request = require('request-promise');
const { parseStringPromise: parse } = require('xml2js');

module.exports = async (n) => {
  const XML = await request('https://nodejs.org/en/feed/blog.xml');
  const data = (await parse(XML)).rss.channel[0].item;
  if (data.length < n) n = data.length;
  return data.slice(0, n).map(item => new Object({ title: item.title[0], link: item.link[0] }));
};