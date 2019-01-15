export class User {
  id: number;
  firstName: string = "";
  lastName: string = "";

  // search given *tags* array if it contains at least one item from *searchTags*
  public static filter(users: User[], searchUsers: User[]): boolean {
    var matched = false;
    users.forEach(user => {
      if (searchUsers.filter(searchUser => searchUser.id == user.id).length > 0) {
        matched = true;
      }
    });
    return matched;
  }
}
