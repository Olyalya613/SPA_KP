import { FilterByFieldPipe } from './filter-by-field.pipe';

describe('FilterByFieldPipe', () => {
  it('filters by field value (case-insensitive)', () => {
    const pipe = new FilterByFieldPipe();
    const items = [{ brand:'Apple' }, { brand:'Samsung' }, { brand:'apple' }];
    const out = pipe.transform(items as any, 'brand', 'app');
    expect(out.length).toBe(2);
  });
});
