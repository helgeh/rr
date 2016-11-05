export class Podcast {
  guid: string;
  category: string = "";
  copyright: string = "nocopy";
  description: string = "Some description...";
  image: Object = {};
  item: Array<Object> = [];
  language: string = "en";
  link: string = "";
  title: string = "Title";
  enclosure: Object;
  isActive: boolean = false;
}