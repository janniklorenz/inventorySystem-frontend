export class Tag {
  id: number;
  name: string;
  color: string = "#000000";

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public static noTag: Tag = new Tag(-1, "Ohne Tag");

  // search given *tags* array if it contains at least one item from *searchTags*
  public static filter(tags: Tag[], searchTags: Tag[]): boolean {
    var matched = false;
    if (tags.length == 0) {
      return searchTags.filter(tag => tag.id == -1).length > 0;
    }
    else {
      tags.forEach(tag => {
        if (searchTags.filter(searchTag => searchTag.id == tag.id).length > 0) {
          matched = true;
        }
      });
    }

    return matched;
  }
}
