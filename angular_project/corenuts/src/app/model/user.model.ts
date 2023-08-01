export class Login {
  constructor(public email: string, public password: string) {}
}
export class User {
  public id: number = 0;
  constructor(
    public username: string,
    public email: string,
    public phonenumber: number,
    public password: string,
    public roles: string[]
  ) {}
}
