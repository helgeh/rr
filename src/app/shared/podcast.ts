export class Podcast {
  description: string = "";
  enclosure: any;
  guid: any;
  pubDate: string = "";
  title: string = "";

    // TODO Not working! Casting objects doesn't include methods?
  // getUrl() {
  //   return this.enclosure['@attributes'].url;
  // }
}
