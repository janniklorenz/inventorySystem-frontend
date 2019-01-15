export class Tag {
  id: number;
  name: string;
  color: string = "#000000";

  // search given *tags* array if it contains at least one item from *searchTags*
  public static filter(tags: Tag[], searchTags: Tag[]): boolean {
    var matched = false;
    tags.forEach(tag => {
      if (searchTags.filter(searchTag => searchTag.id == tag.id).length > 0) {
        matched = true;
      }
    });
    return matched;
  }
}
