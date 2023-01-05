import { UserFilterPipe } from './user-filter.pipe';

describe('UserFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new UserFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('UserFilterPipe - Positive Test Scenarios', () => {
 
  let pipe: UserFilterPipe;
  beforeEach(()=>{
    pipe = new UserFilterPipe();
  });
  const user = [
    {
      "id":1,
      "displayName":"John One",
      "givenName":"John",
      "mail":"John@one.com",
      "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    },
    {
      "id":2,
      "displayName":"John Two",
      "givenName":"John",
      "mail":"John@two.com",
      "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    }]

  it('return [] if user list is empty', () => {
    expect(pipe.transform([],null)).toBe([]);
  });

  it('return same value if argument is null', () => {
    expect(pipe.transform(user,null)).toBe(user);
  });

  it('returns a filtered value if ID matches', () => {
   const actualValue = pipe.transform(user,2);
    expect(actualValue).toBe([{
      "id":2,
      "displayName":"John Two",
      "givenName":"John",
      "mail":"John@two.com",
      "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
    }]);
  });

  it('returns a filtered value if ID matches', () => {
    const actualValue = pipe.transform(user,2);
     expect(actualValue).toBe([{
       "id":2,
       "displayName":"John Two",
       "givenName":"John",
       "mail":"John@two.com",
       "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
     }]);
   });

   it('returns a filtered value if given name matches', () => {
    const actualValue = pipe.transform(user,'john');
     expect(actualValue).toBe([{
       "id":2,
       "displayName":"John Two",
       "givenName":"John",
       "mail":"John@two.com",
       "details":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum. Dolor."
     }]);
   });


});

