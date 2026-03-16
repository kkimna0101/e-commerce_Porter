export const createAuthSlice = (set, get) => ({
  users: [],
  user: null,
  isLoggedIn: false,
  error: null,

  login: (credentials) => {
    const { email, password } = credentials;
    const { users } = get();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Exclude password in session
      const { password: _, ...userSession } = foundUser;
      set({ user: userSession, isLoggedIn: true, error: null });
      return true;
    } else {
      set({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' });
      return false;
    }
  },

  loginAsTestUser: (onlyRegister = false) => {
    const { users } = get();
    const testEmail = 'test@ffashion.com';
    const testPassword = 'testpassword123';
    
    let testUser = users.find(u => u.email === testEmail);
    let newUsers = [...users];

    if (!testUser) {
      testUser = {
        id: `USR_${Date.now()}`,
        email: testEmail,
        password: testPassword,
        name: '테스트유저',
        phone: '010-1234-5678',
        address: '서울시 강남구 테헤란로 123',
        createdAt: new Date().toISOString()
      };
      newUsers.push(testUser);
      set({ users: newUsers });
    }

    if (!onlyRegister) {
      const { password: _, ...userSession } = testUser;
      set({ user: userSession, isLoggedIn: true, error: null });
      return true;
    }
  },

  signup: (userData) => {
    const { users } = get();
    const { email, password, name } = userData;
    
    if (users.some(u => u.email === email)) {
      set({ error: '이미 가입된 이메일입니다.' });
      return false;
    }

    const newUser = {
      id: `USR_${Date.now()}`,
      email,
      password,
      name,
      createdAt: new Date().toISOString()
    };

    set({ users: [...users, newUser], error: null });
    return true;
  },

  logout: () => {
    set({ user: null, isLoggedIn: false });
  },

  updateUserAddress: (userId, phone, fullAddress) => {
    const { users, user } = get();
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, phone, address: fullAddress } : u
    );
    
    if (user && user.id === userId) {
      set({ user: { ...user, phone, address: fullAddress } });
    }
    
    set({ users: updatedUsers });
  },

  findEmail: (name, phone) => {
    const { users } = get();
    const found = users.find(u => u.name === name && u.phone === phone);
    return found ? found.email : null;
  },

  findPassword: (email, name) => {
    const { users } = get();
    const found = users.find(u => u.email === email && u.name === name);
    return !!found;
  },

  resetPassword: (email, newPassword) => {
    const { users } = get();
    const updatedUsers = users.map(u => 
      u.email === email ? { ...u, password: newPassword } : u
    );
    set({ users: updatedUsers });
  }
});
