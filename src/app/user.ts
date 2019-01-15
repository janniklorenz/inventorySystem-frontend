export class User {
  id: number;
  firstName: string = "";
  lastName: string = "";

  public static noOwners(): User {
     var user = new User();
     user.id = -1;
     user.firstName = "Ohne Besitzer";
     return user;
   }

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
