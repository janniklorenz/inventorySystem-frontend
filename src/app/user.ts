export class User {
  id: number;
  firstName: string = "";
  lastName: string = "";

  constructor(id: number, firstName: string, lastName: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static noOwners: User = new User(-1, "Ohne Besitzer", "");

  // search given *users* array if it contains at least one item from *searchUsers*
  public static filter(users: User[], searchUsers: User[]): boolean {
    var matched = false;
    if (users.length == 0) {
      return searchUsers.filter(user => user.id == -1).length > 0;
    }
    else {
      users.forEach(user => {
        if (searchUsers.filter(searchUser => searchUser.id == user.id).length > 0) {
          matched = true;
        }
      });
    }
    return matched;
  }
}
