import { FormatNumberPipe } from './format-number.pipe';

describe('FormatNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatNumberPipe();
    expect(pipe).toBeTruthy();
  });
  it('should format numbers correctly', () => {
    const pipe = new FormatNumberPipe();
    expect(pipe.transform(123)).toBe('123');
    expect(pipe.transform(1234)).toBe('1.2K');
    expect(pipe.transform(1234567)).toBe('1.2M');
    expect(pipe.transform(1234567890)).toBe('1.2B');
  });

  it('should handle edge cases', () => {
    const pipe = new FormatNumberPipe();
    expect(pipe.transform(0)).toBe('0');
    expect(pipe.transform(-1000)).toBe('-1000');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });
});
