/**
 * 지수별 연도별 수익률(%).
 * 출처: 야후 파이낸스 (Yahoo Finance).
 * 단위: 연간 수익률 퍼센트 (예: 10 = 10%)
 */
const MIN_YEAR = 1900

// S&P 500 연도별 수익률 (1928~, Yahoo Finance ^GSPC 기준)
const SP500 = {
  1928: 43.81, 1929: -8.30, 1930: -25.12, 1931: -43.84, 1932: -8.64, 1933: 49.98, 1934: -1.19,
  1935: 46.74, 1936: 31.94, 1937: -35.34, 1938: 29.28, 1939: -1.10, 1940: -10.67, 1941: -12.77,
  1942: 19.17, 1943: 25.06, 1944: 19.03, 1945: 35.82, 1946: -8.43, 1947: 5.20, 1948: 5.70,
  1949: 18.30, 1950: 30.81, 1951: 23.68, 1952: 18.15, 1953: -1.21, 1954: 52.56, 1955: 32.60,
  1956: 7.44, 1957: -10.46, 1958: 43.72, 1959: 12.06, 1960: 0.34, 1961: 26.64, 1962: -8.81,
  1963: 22.61, 1964: 16.42, 1965: 12.40, 1966: -9.97, 1967: 23.80, 1968: 10.81, 1969: -8.24,
  1970: 3.56, 1971: 14.22, 1972: 18.76, 1973: -14.31, 1974: -25.90, 1975: 37.00, 1976: 23.83,
  1977: -6.98, 1978: 6.51, 1979: 18.52, 1980: 31.74, 1981: -4.70, 1982: 20.42, 1983: 22.34,
  1984: 6.15, 1985: 31.24, 1986: 18.49, 1987: 5.81, 1988: 16.54, 1989: 31.48, 1990: -3.06,
  1991: 30.23, 1992: 7.49, 1993: 9.97, 1994: 1.33, 1995: 37.20, 1996: 22.68, 1997: 33.10,
  1998: 28.34, 1999: 20.89, 2000: -9.03, 2001: -11.85, 2002: -21.97, 2003: 28.36, 2004: 10.74,
  2005: 4.83, 2006: 15.61, 2007: 5.48, 2008: -36.55, 2009: 25.94, 2010: 14.82, 2011: 2.10,
  2012: 15.89, 2013: 32.15, 2014: 13.52, 2015: 1.38, 2016: 11.77, 2017: 21.61, 2018: -4.23,
  2019: 31.21, 2020: 18.02, 2021: 28.47, 2022: -18.04, 2023: 26.06, 2024: 24.88,
  2025: 17.78
}

// 나스닥 (Nasdaq Composite) 연도별 수익률 (1972~, Yahoo Finance ^IXIC 기준)
const NASDAQ = {
  1972: 19.0, 1973: -31.1, 1974: -35.1, 1975: 29.8, 1976: 26.2, 1977: -17.2, 1978: 12.3,
  1979: 28.1, 1980: 33.9, 1981: -5.0, 1982: 21.4, 1983: 19.9, 1984: -2.1, 1985: 31.2,
  1986: 7.2, 1987: -11.2, 1988: 15.7, 1989: 19.2, 1990: -17.8, 1991: 56.8, 1992: 15.5,
  1993: 14.8, 1994: -2.9, 1995: 39.9, 1996: 22.7, 1997: 21.6, 1998: 39.6, 1999: 85.6,
  2000: -39.3, 2001: -21.1, 2002: -31.5, 2003: 50.0, 2004: 8.6, 2005: 1.4, 2006: 9.5,
  2007: 9.8, 2008: -40.5, 2009: 43.9, 2010: 16.9, 2011: -1.8, 2012: 15.9, 2013: 38.3,
  2014: 13.4, 2015: 5.7, 2016: 7.5, 2017: 28.2, 2018: -3.9, 2019: 35.2, 2020: 43.6,
  2021: 21.4, 2022: -33.1, 2023: 43.4, 2024: 28.2,
  2025: 29.2
}

// SCHD 연도별 수익률 (2012~, Yahoo Finance SCHD 기준)
const SCHD = {
  2012: 14.2, 2013: 25.4, 2014: 13.4, 2015: -1.4, 2016: 13.4, 2017: 13.3, 2018: -5.3,
  2019: 25.1, 2020: 11.4, 2021: 29.4, 2022: -3.5, 2023: 11.2, 2024: 8.5,
  2025: 9.2
}

// 코스피 연도별 수익률 (1980~, Yahoo Finance ^KS11 기준)
const KOSPI = {
  1980: 38.9, 1981: -20.4, 1982: 35.2, 1983: 25.2, 1984: -3.0, 1985: 24.7, 1986: 29.4,
  1987: 11.8, 1988: 72.1, 1989: 6.7, 1990: -23.2, 1991: 10.7, 1992: -11.2, 1993: 23.4,
  1994: 19.6, 1995: -14.1, 1996: 32.6, 1997: -42.2, 1998: 49.1, 1999: 82.8, 2000: -50.9,
  2001: 37.4, 2002: -9.4, 2003: 29.7, 2004: 10.5, 2005: 53.7, 2006: 4.0, 2007: 32.3,
  2008: -40.7, 2009: 49.7, 2010: 21.9, 2011: -10.9, 2012: 9.4, 2013: 0.7, 2014: -4.8,
  2015: 2.4, 2016: 3.3, 2017: 21.8, 2018: -17.3, 2019: 7.7, 2020: 30.8, 2021: 3.6,
  2022: -24.9, 2023: 18.7, 2024: 22.1,
  2025: 75.8
}

// 코스닥 연도별 수익률 (1997~, Yahoo Finance ^KQ11 기준)
const KOSDAQ = {
  1997: -29.2, 1998: 24.9, 1999: 241.9, 2000: -57.2, 2001: 37.6, 2002: -30.2, 2003: 78.4,
  2004: 27.2, 2005: 14.6, 2006: 2.9, 2007: 12.3, 2008: -40.3, 2009: 49.2, 2010: 18.7,
  2011: -27.2, 2012: 19.7, 2013: 26.4, 2014: 2.1, 2015: 22.9, 2016: 26.4, 2017: 26.8,
  2018: -26.4, 2019: 27.6, 2020: 45.0, 2021: 2.1, 2022: -28.4, 2023: 27.3, 2024: 15.2,
  2025: 36.5
}

// 금(골드) 연도별 수익률 (1975~, Yahoo Finance GC=F 등 기준)
const GOLD = {
  1975: 24.4, 1976: -4.1, 1977: 22.4, 1978: 37.0, 1979: 126.5, 1980: 15.2, 1981: -32.6,
  1982: 14.9, 1983: -16.3, 1984: -19.5, 1985: 5.2, 1986: 24.4, 1987: 24.2, 1988: -2.3,
  1989: 2.5, 1990: -1.2, 1991: -10.1, 1992: -5.7, 1993: 17.2, 1994: -2.1, 1995: -0.3,
  1996: 4.6, 1997: -21.4, 1998: -0.8, 1999: 0.5, 2000: -5.4, 2001: 0.9, 2002: 25.5,
  2003: 19.9, 2004: 4.7, 2005: 18.2, 2006: 23.2, 2007: 31.9, 2008: 5.8, 2009: 24.0,
  2010: 29.8, 2011: 10.2, 2012: 7.1, 2013: -28.0, 2014: -1.8, 2015: -10.4, 2016: 8.6,
  2017: 13.1, 2018: -1.6, 2019: 18.9, 2020: 25.1, 2021: -3.6, 2022: -0.3, 2023: 13.1,
  2024: 16.5, 2025: 28.2
}

// 비트코인 연도별 수익률 (2011~, Yahoo Finance BTC-USD 기준)
const BITCOIN = {
  2011: 1472.0, 2012: 186.0, 2013: 5429.0, 2014: -57.0, 2015: 35.0, 2016: 125.0,
  2017: 1318.0, 2018: -72.0, 2019: 95.0, 2020: 305.0, 2021: 60.0, 2022: -65.0,
  2023: 155.0, 2024: 132.0, 2025: 98.0
}

const INDEX_DATA = {
  sp500: { label: 'S&P 500', returns: SP500 },
  nasdaq: { label: '나스닥', returns: NASDAQ },
  schd: { label: 'SCHD', returns: SCHD },
  kospi: { label: '코스피', returns: KOSPI },
  kosdaq: { label: '코스닥', returns: KOSDAQ },
  gold: { label: '금(골드)', returns: GOLD },
  bitcoin: { label: '비트코인', returns: BITCOIN }
}

export function getMinYear() {
  return MIN_YEAR
}

/** 선택 가능한 종료 시점 최대값 = 데이터가 있는 마지막 연도 */
export function getMaxYear() {
  let max = MIN_YEAR
  for (const { returns } of Object.values(INDEX_DATA)) {
    const years = Object.keys(returns).map(Number)
    if (years.length) max = Math.max(max, ...years)
  }
  return max
}

export function getIndexOptions() {
  return Object.entries(INDEX_DATA).map(([id, { label }]) => ({ id, label }))
}

/**
 * 해당 지수의 특정 연도 수익률(%). 없으면 null.
 */
export function getReturn(indexId, year) {
  const data = INDEX_DATA[indexId]
  if (!data) return null
  const ret = data.returns[year]
  return ret === undefined ? null : ret
}

/**
 * 해당 지수에 데이터가 있는 연도 목록 (오름차순).
 */
export function getAvailableYears(indexId) {
  const data = INDEX_DATA[indexId]
  if (!data) return []
  return Object.keys(data.returns)
    .map(Number)
    .sort((a, b) => a - b)
}

/**
 * 선택 기간 내 연도별 수익률 배열. { year, returnPct } 형태.
 * 데이터 없는 연도는 returnPct: null.
 */
export function getReturnsInRange(indexId, startYear, endYear) {
  const arr = []
  for (let y = startYear; y <= endYear; y++) {
    arr.push({ year: y, returnPct: getReturn(indexId, y) })
  }
  return arr
}

/**
 * 기간 내 실제 수익률만으로 수치 시뮬레이션.
 * lump: 최초 매수금액만 투자 후 연도별 수익률 적용.
 * dca: 최초 매수금액 + 매년 초 년간 매수금액 투입 후 해당 연도 수익률 적용.
 * 반환: { yearlyData: [{ year, value, returnPct }], totalReturnPct, cagr, mdd, endValue }
 */
export function simulate(indexId, startYear, endYear, purchaseMethod, initialAmount, annualAmount) {
  const returnsInRange = getReturnsInRange(indexId, startYear, endYear)
  const yearlyData = []
  let value = 0
  let peak = 0
  let mdd = 0

  for (let i = 0; i < returnsInRange.length; i++) {
    const { year, returnPct } = returnsInRange[i]
    if (purchaseMethod === 'lump') {
      if (i === 0) value = initialAmount
    } else {
      value += i === 0 ? initialAmount : annualAmount
    }
    if (returnPct !== null) {
      value = value * (1 + returnPct / 100)
    }
    if (value > peak) peak = value
    const drawdown = peak > 0 ? ((peak - value) / peak) * 100 : 0
    if (drawdown > mdd) mdd = drawdown
    yearlyData.push({ year, value, returnPct })
  }

  const years = endYear - startYear + 1
  const totalInvested = purchaseMethod === 'lump'
    ? initialAmount
    : initialAmount + annualAmount * Math.max(0, years - 1)
  const totalReturnPct = totalInvested > 0 ? ((value - totalInvested) / totalInvested) * 100 : 0
  const cagr = years > 0 && value > 0 && totalInvested > 0
    ? (Math.pow(value / totalInvested, 1 / years) - 1) * 100
    : 0

  return { yearlyData, totalReturnPct, cagr, mdd, endValue: value }
}

export default INDEX_DATA
