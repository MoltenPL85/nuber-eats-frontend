describe('Edit Profile', () => {
  const user = cy;

  beforeEach(() => {
    // @ts-ignore
    user.login('maxClient@max.com', '12345');
  });

  it('can go to /edit-profile using the header', () => {
    user.get('a[href="/edit-profile"]').click();
    user.wait(1000);
    user.title().should('eq', 'Edit Profile | Nuber Eats');
  });

  it('can change email', () => {
    user.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      if (req.body?.operationName === 'editProfile') {
        // @ts-ignore
        req.body?.variables?.input?.email = 'maxClient@max.com';
      }
    });
    user.visit('/edit-profile');
    user.findByPlaceholderText(/email/i).clear().type('newMaxClient@max.com');
    user.findByRole('button').click();
  });
});
