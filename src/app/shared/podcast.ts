export class Podcast {
  description: string = "";
  enclosure: Object = {};
  guid: string = "";
  pubDate: string = "";
  title: string = "";

    // TODO Not working! Casting objects doesn't include methods?
  // getUrl() {
  //   return this.enclosure['@attributes'].url;
  // }
}
