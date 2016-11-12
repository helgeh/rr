import { Podcast } from './podcast';

export class Channel {
    category: string = "";
    copyright: string = "nocopy";
    description: string = "";
    image: Object;
    item: Podcast[];
    language: string = "no";
    link: string = "";
    title: string = "";
}
