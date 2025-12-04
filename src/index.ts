/**
 * 日本の祝日ライブラリ(1948年から2099年までに対応)
 */
import holidayRuleJp from '../holiday_rule_jp.json' assert { type: 'json' };

/**
 * 祝日情報
 */
type Holiday = {
    date: string;
    name: string;
}

/**
 * 日本の祝日カレンダー
 */
class CalendarJp {

    /**
     * 祝日ルール
     */
    private holidayRuleJp: typeof holidayRuleJp;

    /**
     * 祝日カレンダー（年ごとの祝日マップ）
     */
    private holidayYearMap: Record<number, Record<string, string>>;

    /**
     * 曜日文字列の配列
     */
    private readonly weekdays = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ] as const;

    /**
     * コンストラクタ
     */
    constructor() {
        this.holidayRuleJp = holidayRuleJp;
        this.holidayYearMap = {};
    }

    /**
     * 日付から祝日名を取得する
     * @param date 日付
     * @returns 祝日名
     */
    public getHoliday(date: string): string | undefined {
        const year = date.split('-')[0];
        const holidayMap = this.getHolidayMap(Number(year));
        return holidayMap[date];
    }

    /**
     * 年ごとの祝日マップを取得する
     * @param year 年
     * @returns 祝日マップ（yyyy-MM-dd => 祝日名）
     */
    public getHolidayMap(year: number): Record<string, string> {
        if (!this.holidayYearMap[year]) {
            this.holidayYearMap[year] = this.createHolidayMap(year);
        }
        return this.holidayYearMap[year];
    }

    /**
     * 日付をyyyy-MM-dd形式の文字列に変換する
     * @param date 
     * @returns yyyy-MM-dd形式の文字列
     */
    private getYmd(date: Date): string {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    }
    
    /**
     * 年ごとの祝日マップを作成する
     * @param year 年
     * @returns 祝日マップ（yyyy-MM-dd => 祝日名）
     */
    private createHolidayMap(year: number): Record<string, string> {
        const mainHolidayMap: Record<string, Holiday> = {};
        const vernalEquinoxDate = this.getVernalEquinoxDate(year);
        const autumnalEquinoxDate = this.getAutumnalEquinoxDate(year);
        // 振替休日を含まない祝日マップ（mainHolidays）を構築
        let d = new Date(year, 0, 1);
        while (d.getFullYear() === year) {
            const month = d.getMonth() + 1;
            const date = d.getDate();
            let holidayName = null;
            for (const rule of this.holidayRuleJp.rules) {
                // 年の範囲外
                if (year < rule.yearRange.begin || year > rule.yearRange.end) continue;
                // 月の範囲外
                if (rule.month && rule.month !== month) continue;
                if (rule.date && rule.date === date) {
                    // 単独の日指定がある場合   
                    holidayName = rule.name;
                } else if (rule.dateRange && rule.dateRange.begin && rule.dateRange.end
                    && rule.dateRange.begin <= date && rule.dateRange.end >= date) {
                    // 日の範囲指定がある場合
                    if (rule.weekday && rule.weekday.toLowerCase() !== this.weekdays[d.getDay()]) continue;
                    holidayName = rule.name;
                } else if (rule.logic) {
                    // ロジックが指定されている場合
                    switch (rule.logic) {
                        case 'Vernal Equinox Day':
                            if (date !== vernalEquinoxDate) continue;
                            holidayName = rule.name;
                            break;
                        case 'Autumnal Equinox Day':
                            if (date !== autumnalEquinoxDate) continue;
                            holidayName = rule.name;
                            break;
                    }
                }
            }
            if (holidayName) {
                const ymd = this.getYmd(d);
                mainHolidayMap[ymd] = { date: this.getYmd(d), name: holidayName };
            }
            d.setTime(d.getTime() + 3600 * 24 * 1000);
        }
        // 振替休日の追加
        d = new Date(year, 0, 1);
        while (d.getFullYear() === year) {
            const ymd = this.getYmd(d);
            const holiday = mainHolidayMap[ymd];
            if (!holiday) {
                //休日以外を評価対象とする
                const wday = d.getDay();
                const prev_date = new Date(d.getTime() - 3600 * 24 * 1000);
                const next_date = new Date(d.getTime() + 3600 * 24 * 1000);
                const prev_ymd = this.getYmd(prev_date);
                const next_ymd = this.getYmd(next_date);
                const prev_holiday = mainHolidayMap[prev_ymd];
                const next_holiday = mainHolidayMap[next_ymd];

                for (const rule of this.holidayRuleJp.rules) {
                    // 年の範囲外
                    if (year < rule.yearRange.begin || year > rule.yearRange.end) continue;
                    if (rule.logic === 'Natinal Holiday') {
                        // その前日及び翌日が「国民の祝日」である日（「国民の祝日」でない日に限る。）は、休日とする。
                        if (prev_holiday != null && next_holiday != null) {
                            mainHolidayMap[ymd] = { date: ymd, name: rule.name };
                        }
                    } else if (rule.logic === 'Holiday in lieu') {
                        // 2007年以前の振替休日のルール
                        // 国民の祝日の日曜日の翌日の月曜日
                        if (prev_holiday != null && wday == 1 /* Monday */) {
                            mainHolidayMap[ymd] = { date: ymd, name: rule.name };
                        }
                    } else if (rule.logic === 'Holiday in lieu(2007)') {
                        // 2007年以降の振替休日のルール
                        // 「国民の祝日」が日曜日に当たるときは、その日後においてその日に最も近い「国民の祝日」でない日を休日とする。  
                        if (prev_holiday != null && prev_holiday.name !== rule.name) {
                            let tmp_date = new Date(prev_date.getTime());
                            let tmp_wday = tmp_date.getDay();
                            let tmp_holiday = prev_holiday;
                            while (tmp_holiday != null) {
                                if (tmp_wday === 0 /* Sunday */) {
                                    mainHolidayMap[ymd] = { date: ymd, name: rule.name };
                                    break;
                                }
                                tmp_date = new Date(tmp_date.getTime() - 3600 * 24 * 1000);
                                tmp_wday = tmp_date.getDay();
                                tmp_holiday = mainHolidayMap[this.getYmd(tmp_date)];
                            }
                        }
                    }
                }
            }
            d.setTime(d.getTime() + 3600 * 24 * 1000);
        }
        // 祝日マップを作成する（yyyy-MM-dd => 祝日名）
        return Object.values(mainHolidayMap).reduce<Record<string, string>>((acc, holiday) => {
            acc[holiday.date] = holiday.name;
            return acc;
        }, {});
    }

    /**
     * 値が最小値と最大値の範囲内かどうかを判定する
     * @param min 最小値
     * @param max 最大値
     * @param value 値
     * @returns 値が最小値と最大値の範囲内かどうか
     */
    private contains(min: number, max: number, value: number): boolean {
        return value >= min && value <= max;
    }

	/**
	 * 春分の日を取得する (Vernal Equinox Day)
	 * - 西暦年数の4での剰余が0の場合
	 *   - 1900年 - 1956年までは3月21日
	 *   - 1960年 - 2088年までは3月20日
	 *   - 2092年 - 2096年までは3月19日
	 * - 西暦年数の4での剰余が1の場合
	 *   - 1901年 - 1989年までは3月21日
	 *   - 1993年 - 2097年までは3月20日
	 * - 西暦年数の4での剰余が2の場合
	 *   - 1902年 - 2022年までは3月21日
	 *   - 2026年 - 2098年までは3月20日
	 * - 西暦年数の4での剰余が3の場合
	 *   - 1903年 - 1923年までは3月22日
	 *   - 1927年 - 2055年までは3月21日
	 *   - 2059年 - 2099年までは3月20日
	 * --wikipedia
	 * @param year 西暦年
	 * @returns 春分の日
	 */
    private getVernalEquinoxDate(year: number): number {
		switch (year % 4) {
            case 0:	return this.contains(1900, 1956, year) ? 21 : (this.contains(1960, 2088, year) ? 20 : 19);
            case 1:	return this.contains(1901, 1989, year) ? 21 : 20;
            case 2:	return this.contains(1902, 2022, year) ? 21 : 20;
            case 3:	return this.contains(1903, 1923, year) ? 22 : (this.contains(1927, 2055, year) ? 21 : 20);
        }
        return -1;
    }    

	/**
	 * 秋分の日を取得する（Autumnal Equinox Day）
	 * - 西暦年数の4での剰余が0の場合
	 *   - 1900年 - 2008年までは9月23日
	 *   - 2012年 - 2096年までは9月22日
	 * - 西暦年数の4での剰余が1の場合
	 *   - 1901年 - 1917年までは9月24日
	 *   - 1921年 - 2041年までは9月23日
	 *   - 2045年 - 2097年までは9月22日
	 * - 西暦年数の4での剰余が2の場合
	 *   - 1902年 - 1946年までは9月24日
	 *   - 1950年 - 2074年までは9月23日
	 *   - 2078年 - 2098年までは9月22日
	 * - 西暦年数の4での剰余が3の場合
	 *   - 1903年 - 1979年までは9月24日
	 *   - 1983年 - 2099年までは9月23日
	 * --wikipedia
     * @param year 西暦年
     * @returns 秋分の日
	 */
    private getAutumnalEquinoxDate(year: number): number {
        switch (year % 4) {
            case 0:	return this.contains(1900, 2008, year) ? 23 : 22;
            case 1:	return this.contains(1901, 1917, year) ? 24 : (this.contains(1921, 2041, year) ? 23 : 22);
            case 2:	return this.contains(1902, 1946, year) ? 24 : (this.contains(1950, 2074, year) ? 23 : 22);
            case 3:	return this.contains(1903, 1979, year) ? 24 : 23;
        }
        return -1;
    }

}

export default CalendarJp;
