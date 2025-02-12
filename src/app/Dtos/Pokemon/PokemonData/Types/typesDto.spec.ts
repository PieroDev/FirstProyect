import { TypesDto } from './typesDto';

describe('Types', () => {
  it('should create an instance', () => {
    expect(new TypesDto('typeName', 'typeUrl')).toBeTruthy();
  });
});
