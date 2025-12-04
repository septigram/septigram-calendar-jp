import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import CalendarJp from './index.js';

describe('CalendarJp', () => {
  let calendar: CalendarJp;

  beforeEach(() => {
    calendar = new CalendarJp();
  });

  describe('getHoliday', () => {
    it('元日を正しく取得できる', () => {
      expect(calendar.getHoliday('1948-01-01')).toBe('元日');
      expect(calendar.getHoliday('2025-01-01')).toBe('元日');
      expect(calendar.getHoliday('2099-01-01')).toBe('元日');
    });

    it('祝日でない日付の場合はundefinedを返す', () => {
      expect(calendar.getHoliday('1947-01-01')).toBeUndefined();
      expect(calendar.getHoliday('2024-12-31')).toBeUndefined();
      expect(calendar.getHoliday('2024-07-16')).toBeUndefined();
    });

    it('無効な日付形式でもエラーを投げない', () => {
      expect(() => calendar.getHoliday('invalid-date')).not.toThrow();
      expect(calendar.getHoliday('invalid-date')).toBeUndefined();
    });

    it('空文字列でもエラーを投げない', () => {
      expect(() => calendar.getHoliday('')).not.toThrow();
      expect(calendar.getHoliday('')).toBeUndefined();
    });

    it('2008-05-06が振替休日であることを確認', () => {
      expect(calendar.getHoliday('2008-05-06')).toBe('振替休日');
    });
  });

  describe('CSVファイルとの整合性チェック', () => {
    it('shukujitu.csvの全データが正しく取得できる', () => {
      // プロジェクトルートから相対パスで指定
      const csvPath = resolve(process.cwd(), 'src', 'shukujitu.csv');
      const csvContent = readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim() !== '');

      // ヘッダー行をスキップ
      const dataLines = lines.slice(1);

      let successCount = 0;
      let failureCount = 0;
      const failures: Array<{ date: string; expected: string; actual: string | undefined }> = [];

      for (const line of dataLines) {
        const [dateStr, holidayName] = line.split(',');
        if (!dateStr || !holidayName) continue;

        // 日付形式を YYYY/M/D から YYYY-MM-DD に変換
        const [year, month, day] = dateStr.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        const result = calendar.getHoliday(formattedDate);

        // 「休日」は振替休日または国民の休日として扱う
        if (holidayName === '休日') {
          if (result === '振替休日' || result === '国民の休日') {
            successCount++;
          } else {
            failureCount++;
            failures.push({ date: formattedDate, expected: holidayName, actual: result });
          }
        } else if (result && holidayName) {
          successCount++;
        } else {
          failureCount++;
          failures.push({ date: formattedDate, expected: holidayName, actual: result });
        }
      }

      // 失敗したケースの詳細を出力
      if (failures.length > 0) {
        console.log(`\n失敗したケース (${failures.length}件):`);
        failures.slice(0, 20).forEach(f => {
          console.log(`  日付: ${f.date}, 期待値: ${f.expected}, 実際の値: ${f.actual}`);
        });
        if (failures.length > 20) {
          console.log(`  ... 他 ${failures.length - 20} 件`);
        }
      }

      console.log(`\n成功: ${successCount}件, 失敗: ${failureCount}件, 合計: ${dataLines.length}件`);
      expect(failureCount).toBe(0);
    });
  });
});

