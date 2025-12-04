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


## ルール設定ファイル (holiday_rule_jp.json)

要素|説明
-|-
name|休日名の文字列
yearRange|ルールを適用するか判別する年。`begin: [開始年]`, `end: [終了年]`を要素に持つオブジェクト。
month|ルールを適用するか判別する月。単独の`[対象月]`の形式の数値。
date|ルールを適用するか判別する日。単独の`[対象日]`の数値。
dateRange|ルールを適用するか判別する日。範囲を示す`begin: [開始日]`, `end: [終了日]`を要素に持つオブジェクト。
weekday|ルールを適用する曜日。`Sunday`, `Monday`, ... `Saturday`のいずれかの文字列。date要素で指定された範囲で対象の曜日に適用する。
logic|適用するロジックの名称。`Vernal Equinox Day`あるいは`Autumnal Equinox Day`、`Natinal Holiday`、`Holiday in lieu`, `Holiday in lieu(2008)`のいずれかの文字列。

```json
{
  "locale": "japan",
  "rules": [
    {
      "name": "元日",
      "yearRange": { "begin": 1948, "end":9999 },
      "month": 1,
      "date": 1
    },
    {
      "name": "成人の日",
      "yearRange": { "begin": 1948, "end": 1999 },
      "month": 1,
      "date": 15
    },
    {
      "name": "成人の日",
      "yearRange": { "begin": 2000, "end": 9999 },
      "month": 1,
      "dateRange": { "begin": 8, "end": 14 },
      "weekday": "Monday"
    },
    {
      "name": "建国記念の日",
      "yearRange": { "begin": 1966, "end": 9999 },
      "month": 2,
      "date": 11
    },
    {
      "name": "春分の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 3,
      "logic": "Vernal Equinox Day"
    },
    {
      "name": "天皇誕生日",
      "yearRange": { "begin": 1948, "end": 1988 },
      "month": 4,
      "date": 29
    },
    {
      "name": "みどりの日",
      "yearRange": { "begin": 1989, "end": 2006 },
      "month": 4,
      "date": 29
    },
    {
      "name": "昭和の日",
      "yearRange": { "begin": 2007, "end": 9999 },
      "month": 4,
      "date": 29
    },
    {
      "name": "憲法記念日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 5,
      "date": 3
    },
    {
      "name": "みどりの日",
      "yearRange": { "begin": 2007, "end": 9999 },
      "month": 5,
      "date": 4
    },
    {
      "name": "こどもの日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 5,
      "date": 5
    },
    {
      "name": "海の日",
      "yearRange": { "begin": 1948, "end": 2002 },
      "month": 7,
      "date": 20
    },
    {
      "name": "海の日",
      "yearRange": { "begin": 2003, "end": 2019 },
      "month": 7,
      "dateRange": { "begin": 15, "end": 21 },
      "weekday": "Monday"
    },
    {
      "name": "海の日",
      "yearRange": { "begin": 2020, "end": 2020 },
      "month": 7,
      "date": 23
    },
    {
      "name": "海の日",
      "yearRange": { "begin": 2021, "end": 2021 },
      "month": 7,
      "date": 22
    },
    {
      "name": "海の日",
      "yearRange": { "begin": 2022, "end": 9999 },
      "month": 7,
      "dateRange": { "begin": 15, "end": 21 },
      "weekday": "Monday"
    },
    {
      "name": "山の日",
      "yearRange": { "begin": 2016, "end": 2019 },
      "month": 8,
      "date": 11
    },
    { 
      "name": "山の日",
      "yearRange": { "begin": 2020, "end": 2020 },
      "month": 8,
      "date": 10
    },
    {
      "name": "山の日",
      "yearRange": { "begin": 2021, "end": 2021 },
      "month": 8,
      "date": 8
    },
    {
      "name": "山の日",
      "yearRange": { "begin": 2022, "end": 9999 },
      "month": 8,
      "date": 11
    },
    {
      "name": "敬老の日",
      "yearRange": { "begin": 1966, "end": 2002 },
      "month": 9,
      "date": 15
    },
    {
      "name": "敬老の日",
      "yearRange": { "begin": 2003, "end": 9999 },
      "month": 9,
      "dateRange": { "begin": 15, "end": 21 },
      "weekday": "Monday"
    },
    {
      "name": "秋分の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 9,
      "logic": "Autumnal Equinox Day"
    },
    {
      "name": "体育の日",
      "yearRange": { "begin": 1966, "end": 1999 },
      "month": 10,
      "date": 10
    },
    {
      "name": "体育の日",
      "yearRange": { "begin": 2000, "end": 2019 },
      "month": 10,
      "dateRange": { "begin": 8, "end": 14 },
      "weekday": "Monday"
    },
    {
      "name": "スポーツの日",
      "yearRange": { "begin": 2020, "end": 2020 },
      "month": 7,
      "date": 24
    },
    {
      "name": "スポーツの日",
      "yearRange": { "begin": 2021, "end": 2021 },
      "month": 7,
      "date": 23
    },
    {
      "name": "スポーツの日",
      "yearRange": { "begin": 2022, "end": 9999 },
      "month": 10,
      "dateRange": { "begin": 8, "end": 14 },
      "weekday": "Monday"
    },
    {
      "name": "文化の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 11,
      "date": 3
    },
    {
      "name": "勤労感謝の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 11,
      "date": 23
    },
    {
      "name": "天皇誕生日",
      "yearRange": { "begin": 1989, "end": 2018 },
      "month": 12,
      "date": 23
    },
    {
      "name": "天皇誕生日",
      "yearRange": { "begin": 2020, "end": 9999 },
      "month": 2,
      "date": 23
    },
    {
      "name": "皇太子明仁親王の結婚の儀",
      "yearRange": { "begin": 1959, "end": 1959 },
      "month": 4,
      "date": 10
    },
    {
      "name": "昭和天皇の大喪の礼",
      "yearRange": { "begin": 1989, "end": 1989 },
      "month": 2,
      "date": 24
    },
    {
      "name": "即位礼正殿の儀",
      "yearRange": { "begin": 1990, "end": 1990 },
      "month": 11,
      "date": 12
    },
    {
      "name": "皇太子徳仁親王の結婚の儀",
      "yearRange": { "begin": 1993, "end": 1993 },
      "month": 6,
      "date": 9
    },
    {
      "name": "国民の休日",
      "yearRange": { "begin": 1985, "end": 9999 },
      "logic": "Natinal Holiday"
    },
    {
      "name": "振替休日",
      "yearRange": { "begin": 1973, "end": 2007 },
      "logic": "Holiday in lieu"
    },
    {
      "name": "振替休日",
      "yearRange": { "begin": 2007, "end": 9999 },
      "logic": "Holiday in lieu(2007)"
    },
    {
      "name": "天皇の即位の日",
      "yearRange": { "begin": 2019, "end": 2019 },
      "month": 5,
      "date": 1
    },
    {
      "name": "即位礼正殿の儀",
      "yearRange": { "begin": 2019, "end": 2019 },
      "month": 10,
      "date": 22
    }
  ]
}


```

## ロジック

### `Vernal Equinox Day`

春分の日。

### `Autumnal Equinox Day`

秋分の日。

### `Natinal Holiday`

第三条３項のルール。

> 第三条　「国民の祝日」は、休日とする。  
> ２　「国民の祝日」が日曜日に当たるときは、その日後においてその日に最も近い「国民の祝日」でない日を休日とする。  
> ３　その前日及び翌日が「国民の祝日」である日（「国民の祝日」でない日に限る。）は、休日とする。

### `Holiday in lieu`

連続した祝日の扱いが規程されない振替休日のルール。

### `Holiday in lieu(2007)`

第三条２項の振替休日のルール。
