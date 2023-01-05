import { UserFilterPipe } from './user-filter.pipe';

describe('UserFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new UserFilterPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('UserFilterPipe', () => {
 
  let pipe: UserFilterPipe;

  beforeEach(()=>{
    pipe = new UserFilterPipe();
  });

  it('return same value if undefined', () => {
    expect(pipe.transform([],null)).toBe([]);
  });

  it('returns a number if ID matches', () => {
  //  const actualValue = pipe.transform(5);

    //expect(pipe.transform(,null)).toBe([]);
  });


});

