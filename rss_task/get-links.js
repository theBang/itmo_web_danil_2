const request = require('request-promise');
const { parseStringPromise: parse } = require('xml2js');

module.exports = async () => {
  const XML = await request('https://nodejs.org/en/feed/blog.xml');
  const data = await parse(XML);

  return data.rss.channel[0].item.map(item => new Object({ title: item.title[0], link: item.link[0] }));
};