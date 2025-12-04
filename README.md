# 日本の休日ライブラリ

「国民の祝日に関する法律」をロジック化することで休日リストの更新が不要なカレンダーを提供するライブラリ。西暦1948年以降2099年までに対応。

## 使い方

```typescript
import CalendarJp from 'septigram-calendar-jp';

// カレンダーインスタンスを作成
const calendar = new CalendarJp();

// 特定の日付が祝日かどうかを確認し、祝日名を取得
const holidayName = calendar.getHoliday('2024-01-01');
console.log(holidayName); // "元日"

// 祝日でない場合は undefined を返す
const notHoliday = calendar.getHoliday('2024-01-02');
console.log(notHoliday); // undefined

// 年ごとの祝日マップを取得（yyyy-MM-dd => 祝日名）
const holidayMap = calendar.getHolidayMap(2024);
console.log(holidayMap['2024-01-01']); // "元日"
console.log(holidayMap['2024-05-03']); // "憲法記念日"
console.log(holidayMap['2024-05-06']); // "振替休日"

// 祝日ルールの追加
import { type HolidayRule } from 'septigram-calendar-jp';
const newRule: HolidayRule = {
  name: 'テスト祝日',
  title: 'テスト祝日',
  yearRange: { begin: 2025, end: 2025 },
  month: 6,
  date: 15
};
calendar.addRule(newRule);
console.log(calendar.getHoliday('2025-06-15')); // "テスト祝日"

// 祝日ルールの更新
const updatedRule: HolidayRule = {
  name: 'テスト祝日',
  title: 'テスト祝日（更新）',
  yearRange: { begin: 2025, end: 2025 },
  month: 6,
  date: 16
};
calendar.updateRule(updatedRule);
console.log(calendar.getHoliday('2025-06-16')); // "テスト祝日"

// 祝日ルールの削除
calendar.removeRule('テスト祝日');
console.log(calendar.getHoliday('2025-06-16')); // undefined

// 祝日ルールの一覧取得
const rules = calendar.listRules();
console.log(rules.length); // ルールの総数
```

### 日付フォーマット

日付は `yyyy-MM-dd` 形式（例: `2024-01-01`）で指定してください。

### メソッド

#### `getHoliday(date: string): string | undefined`

指定した日付の祝日名を取得します。祝日でない場合は `undefined` を返します。

- `date`: `yyyy-MM-dd` 形式の日付文字列

#### `getHolidayMap(year: number): Record<string, string>`

指定した年のすべての祝日マップを取得します。戻り値は日付文字列（`yyyy-MM-dd`）をキー、祝日名を値とするオブジェクトです。

- `year`: 年（1948年から2099年まで対応）

#### `addRule(rule: HolidayRule): void`

新しい祝日ルールを追加します。既に同じ`name`のルールが存在する場合はエラーが発生します。ルール追加後、内部の祝日マップがクリアされ、次回の取得時に再計算されます。

- `rule`: 追加する祝日ルール（`HolidayRule`型）

#### `removeRule(ruleName: string): void`

指定した名前の祝日ルールを削除します。同じ`name`を持つルールが複数存在する場合、すべて削除されます。ルール削除後、内部の祝日マップがクリアされ、次回の取得時に再計算されます。

- `ruleName`: 削除するルールの名前

#### `updateRule(rule: HolidayRule): void`

既存の祝日ルールを更新します。指定した`name`のルールが存在する場合、そのルールを新しいルールで置き換えます。存在しない場合は何も行いません（新規追加はされません）。ルール更新後、内部の祝日マップがクリアされ、次回の取得時に再計算されます。

- `rule`: 更新する祝日ルール（`HolidayRule`型）

#### `listRules(): HolidayRule[]`

現在登録されているすべての祝日ルールの一覧を取得します。

- 戻り値: 祝日ルールの配列


## 祝日ルールの型定義

`HolidayRule`型は以下のプロパティを持ちます：

```typescript
type HolidayRule = {
  name: string;           // 祝日名（必須、一意である必要がある）
  title: string;          // 祝日のタイトル（必須）
  yearRange: {            // 適用年範囲（必須）
    begin: number;        // 開始年
    end: number;          // 終了年
  };
  month?: number;         // 対象月（1-12）
  date?: number;         // 対象日（1-31、dateRangeと同時指定不可）
  dateRange?: {           // 対象日の範囲
    begin: number;       // 開始日
    end: number;         // 終了日
  };
  weekday?: string;       // 対象曜日（'sunday', 'monday', ..., 'saturday'）
  logic?: string;        // 特殊ロジック（'Vernal Equinox Day', 'Autumnal Equinox Day', 'Natinal Holiday', 'Holiday in lieu', 'Holiday in lieu(2007)'）
}
```

### バリデーションルール

- `name`と`title`, `yearRange`は必須です
- `yearRange.begin`と`yearRange.end`は1以上9999以下である必要があります
- `yearRange.begin`は`yearRange.end`以下である必要があります
- `month`は1から12の範囲である必要があります
- `date`は1から31の範囲である必要があります
- `dateRange.begin`と`dateRange.end`は1から31の範囲である必要があります
- `dateRange.begin`は`dateRange.end`以下である必要があります
- `date`と`dateRange`は同時に指定できません
- `date`と`weekday`は同時に指定できません
- `weekday`は小文字の曜日名（'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'）である必要があります
- `logic`は指定された値のいずれかである必要があります
