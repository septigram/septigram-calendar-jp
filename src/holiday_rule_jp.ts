/**
 * 日本の祝日ルール定義
 * 
 * 要素|説明
 * -|-
 * name|休日ルールの識別文字列
 * title|休日のタイトルの文字列
 * yearRange|ルールを適用するか判別する年。`begin: [開始年]`, `end: [終了年]`を要素に持つオブジェクト。
 * month|ルールを適用するか判別する月。単独の`[対象月]`の形式の数値。
 * date|ルールを適用するか判別する日。単独の`[対象日]`の数値。
 * dateRange|ルールを適用するか判別する日。範囲を示す`begin: [開始日]`, `end: [終了日]`を要素に持つオブジェクト。
 * weekday|ルールを適用する曜日。`Sunday`, `Monday`, ... `Saturday`のいずれかの文字列。date要素で指定された範囲で対象の曜日に適用する。
 * logic|適用するロジックの名称。`Vernal Equinox Day`あるいは`Autumnal Equinox Day`、`Natinal Holiday`、`Holiday in lieu`, `Holiday in lieu(2008)`のいずれかの文字列。
 */
const holidayRuleJp: {
  locale: string;
  rules: Array<{
    name: string;
    title: string;
    yearRange: { begin: number; end: number };
    month?: number;
    date?: number;
    dateRange?: { begin: number; end: number };
    weekday?: string;
    logic?: string;
  }>;
} = {
  "locale": "japan",
  "rules": [
    {
      "name": "元日",
      "title": "元日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 1,
      "date": 1
    },
    {
      "name": "成人の日",
      "title": "成人の日",
      "yearRange": { "begin": 1948, "end": 1999 },
      "month": 1,
      "date": 15
    },
    {
      "name": "成人の日",
      "title": "成人の日",
      "yearRange": { "begin": 2000, "end": 9999 },
      "month": 1,
      "dateRange": { "begin": 8, "end": 14 },
      "weekday": "Monday"
    },
    {
      "name": "建国記念の日",
      "title": "建国記念の日",
      "yearRange": { "begin": 1966, "end": 9999 },
      "month": 2,
      "date": 11
    },
    {
      "name": "春分の日",
      "title": "春分の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 3,
      "logic": "Vernal Equinox Day"
    },
    {
      "name": "天皇誕生日",
      "title": "天皇誕生日",
      "yearRange": { "begin": 1948, "end": 1988 },
      "month": 4,
      "date": 29
    },
    {
      "name": "みどりの日",
      "title": "みどりの日",
      "yearRange": { "begin": 1989, "end": 2006 },
      "month": 4,
      "date": 29
    },
    {
      "name": "昭和の日",
      "title": "昭和の日",
      "yearRange": { "begin": 2007, "end": 9999 },
      "month": 4,
      "date": 29
    },
    {
      "name": "憲法記念日",
      "title": "憲法記念日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 5,
      "date": 3
    },
    {
      "name": "みどりの日",
      "title": "みどりの日",
      "yearRange": { "begin": 2007, "end": 9999 },
      "month": 5,
      "date": 4
    },
    {
      "name": "こどもの日",
      "title": "こどもの日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 5,
      "date": 5
    },
    {
      "name": "海の日",
      "title": "海の日",
      "yearRange": { "begin": 1948, "end": 2002 },
      "month": 7,
      "date": 20
    },
    {
      "name": "海の日2003",
      "title": "海の日",
      "yearRange": { "begin": 2003, "end": 2019 },
      "month": 7,
      "dateRange": { "begin": 15, "end": 21 },
      "weekday": "Monday"
    },
    {
      "name": "海の日2020",
      "title": "海の日",
      "yearRange": { "begin": 2020, "end": 2020 },
      "month": 7,
      "date": 23
    },
    {
      "name": "海の日2021",
      "title": "海の日",
      "yearRange": { "begin": 2021, "end": 2021 },
      "month": 7,
      "date": 22
    },
    {
      "name": "海の日2022",
      "title": "海の日",
      "yearRange": { "begin": 2022, "end": 9999 },
      "month": 7,
      "dateRange": { "begin": 15, "end": 21 },
      "weekday": "Monday"
    },
    {
      "name": "山の日",
      "title": "山の日",
      "yearRange": { "begin": 2016, "end": 2019 },
      "month": 8,
      "date": 11
    },
    { 
      "name": "山の日2020",
      "title": "山の日",
      "yearRange": { "begin": 2020, "end": 2020 },
      "month": 8,
      "date": 10
    },
    {
      "name": "山の日2021",
      "title": "山の日",
      "yearRange": { "begin": 2021, "end": 2021 },
      "month": 8,
      "date": 8
    },
    {
      "name": "山の日2022",
      "title": "山の日",
      "yearRange": { "begin": 2022, "end": 9999 },
      "month": 8,
      "date": 11
    },
    {
      "name": "敬老の日",
      "title": "敬老の日",
      "yearRange": { "begin": 1966, "end": 2002 },
      "month": 9,
      "date": 15
    },
    {
      "name": "敬老の日2003",
      "title": "敬老の日",
      "yearRange": { "begin": 2003, "end": 9999 },
      "month": 9,
      "dateRange": { "begin": 15, "end": 21 },
      "weekday": "Monday"
    },
    {
      "name": "秋分の日",
      "title": "秋分の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 9,
      "logic": "Autumnal Equinox Day"
    },
    {
      "name": "体育の日",
      "title": "体育の日",
      "yearRange": { "begin": 1966, "end": 1999 },
      "month": 10,
      "date": 10
    },
    {
      "name": "体育の日2000",
      "title": "体育の日",
      "yearRange": { "begin": 2000, "end": 2018 },
      "month": 10,
      "dateRange": { "begin": 8, "end": 14 },
      "weekday": "Monday"
    },
    {
        "name": "体育の日2019",
        "title": "体育の日（スポーツの日）",
        "yearRange": { "begin": 2019, "end": 2019 },
        "month": 10,
        "dateRange": { "begin": 8, "end": 14 },
        "weekday": "Monday"
      },
      {
      "name": "スポーツの日",
      "title": "スポーツの日",
      "yearRange": { "begin": 2020, "end": 2020 },
      "month": 7,
      "date": 24
    },
    {
      "name": "スポーツの日2021",
      "title": "スポーツの日",
      "yearRange": { "begin": 2021, "end": 2021 },
      "month": 7,
      "date": 23
    },
    {
      "name": "スポーツの日2022",
      "title": "スポーツの日",
      "yearRange": { "begin": 2022, "end": 9999 },
      "month": 10,
      "dateRange": { "begin": 8, "end": 14 },
      "weekday": "Monday"
    },
    {
      "name": "文化の日",
      "title": "文化の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 11,
      "date": 3
    },
    {
      "name": "勤労感謝の日",
      "title": "勤労感謝の日",
      "yearRange": { "begin": 1948, "end": 9999 },
      "month": 11,
      "date": 23
    },
    {
      "name": "天皇誕生日",
      "title": "天皇誕生日",
      "yearRange": { "begin": 1989, "end": 2018 },
      "month": 12,
      "date": 23
    },
    {
      "name": "天皇誕生日2020",
      "title": "天皇誕生日",
      "yearRange": { "begin": 2020, "end": 9999 },
      "month": 2,
      "date": 23
    },
    {
      "name": "皇太子明仁親王の結婚の儀",
      "title": "結婚の儀",
      "yearRange": { "begin": 1959, "end": 1959 },
      "month": 4,
      "date": 10
    },
    {
      "name": "昭和天皇の大喪の礼",
      "title": "大喪の礼",
      "yearRange": { "begin": 1989, "end": 1989 },
      "month": 2,
      "date": 24
    },
    {
      "name": "即位礼正殿の儀",
      "title": "即位礼正殿の儀",
      "yearRange": { "begin": 1990, "end": 1990 },
      "month": 11,
      "date": 12
    },
    {
      "name": "皇太子徳仁親王の結婚の儀",
      "title": "結婚の儀",
      "yearRange": { "begin": 1993, "end": 1993 },
      "month": 6,
      "date": 9
    },
    {
      "name": "国民の休日",
      "title": "国民の休日",
      "yearRange": { "begin": 1985, "end": 9999 },
      "logic": "Natinal Holiday"
    },
    {
      "name": "振替休日",
      "title": "振替休日",
      "yearRange": { "begin": 1973, "end": 2007 },
      "logic": "Holiday in lieu"
    },
    {
      "name": "振替休日2007",
      "title": "振替休日",
      "yearRange": { "begin": 2007, "end": 9999 },
      "logic": "Holiday in lieu(2007)"
    },
    {
      "name": "天皇の即位の日",
      "title": "休日（祝日扱い）",
      "yearRange": { "begin": 2019, "end": 2019 },
      "month": 5,
      "date": 1
    },
    {
      "name": "即位礼正殿の儀2019",
      "title": "休日（祝日扱い）",
      "yearRange": { "begin": 2019, "end": 2019 },
      "month": 10,
      "date": 22
    }
  ]
};

export default holidayRuleJp;

