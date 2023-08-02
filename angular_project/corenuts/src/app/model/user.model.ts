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

export class Reset {
  constructor(public confirmPassword: string, public newPassword: string) {}
}
// export class Otp {
//   constructor(public message: string, public Secretkey: number) {}
// }
