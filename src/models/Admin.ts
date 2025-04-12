interface Admin {
    _id?: string;
    username: string;
    password: string; // Will be stored hashed
    name: string;
    createdAt: Date;
  }
  