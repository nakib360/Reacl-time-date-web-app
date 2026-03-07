import { useEffect, useState } from "react";

const App = () => {
  const [engDate, setEngDate] = useState("");
  const [bnDate, setBnDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const banglaMonths = [
    "বৈশাখ",
    "জ্যৈষ্ঠ",
    "আষাঢ়",
    "শ্রাবণ",
    "ভাদ্র",
    "আশ্বিন",
    "কার্তিক",
    "অগ্রহায়ণ",
    "পৌষ",
    "মাঘ",
    "ফাল্গুন",
    "চৈত্র",
  ];

  const seasonByMonth = {
    "বৈশাখ": "গ্রীষ্ম",
    "জ্যৈষ্ঠ": "গ্রীষ্ম",
    "আষাঢ়": "বর্ষা",
    "শ্রাবণ": "বর্ষা",
    "ভাদ্র": "শরৎ",
    "আশ্বিন": "শরৎ",
    "কার্তিক": "হেমন্ত",
    "অগ্রহায়ণ": "হেমন্ত",
    "পৌষ": "শীত",
    "মাঘ": "শীত",
    "ফাল্গুন": "বসন্ত",
    "চৈত্র": "বসন্ত",
  };

  const toBanglaNumber = (value) =>
    String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

  const isLeapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getBanglaDateParts = (date) => {
    const gregorianYear = date.getFullYear();
    const startOfBanglaYearThisGregorian = new Date(gregorianYear, 3, 14);
    const usesCurrentGregorianStart = date >= startOfBanglaYearThisGregorian;
    const startGregorianYear = usesCurrentGregorianStart
      ? gregorianYear
      : gregorianYear - 1;

    const banglaYear = usesCurrentGregorianStart
      ? gregorianYear - 593
      : gregorianYear - 594;

    // Falgun gets one extra day when the Gregorian year containing February is leap.
    const falgunLength = isLeapYear(startGregorianYear + 1) ? 30 : 29;
    const banglaMonthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, falgunLength, 30];

    const startDate = new Date(startGregorianYear, 3, 14);
    const daysSinceStart = Math.floor((date - startDate) / 86400000);
    let dayOfBanglaYear = daysSinceStart + 1;

    let monthIndex = 0;
    while (monthIndex < banglaMonthLengths.length && dayOfBanglaYear > banglaMonthLengths[monthIndex]) {
      dayOfBanglaYear -= banglaMonthLengths[monthIndex];
      monthIndex += 1;
    }

    return {
      day: dayOfBanglaYear,
      month: banglaMonths[monthIndex],
      year: banglaYear,
    };
  };

  useEffect(() => {
    const engFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",      
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const banglaWeekdayFormatter = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
    });

    const hijriFormatter = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const updateDates = () => {
      const today = new Date();

      const engParts = engFormatter.formatToParts(today);
      const engWeekday = engParts.find((part) => part.type === "weekday")?.value ?? "";
      const engDay = engParts.find((part) => part.type === "day")?.value ?? "";
      const engMonth = engParts.find((part) => part.type === "month")?.value ?? "";
      const engYear = engParts.find((part) => part.type === "year")?.value ?? "";
      setEngDate(`${engWeekday}, ${engDay} ${engMonth.toLowerCase()}, ${engYear}`);

      const bnWeekday = banglaWeekdayFormatter.format(today);
      const banglaParts = getBanglaDateParts(today);
      const bnSeason = seasonByMonth[banglaParts.month] ?? "";
      setBnDate(
        `${bnWeekday}, ${toBanglaNumber(banglaParts.day)} ${banglaParts.month}, ${toBanglaNumber(
          banglaParts.year
        )} [${bnSeason}]`
      );

      const hijriParts = hijriFormatter.formatToParts(today);
      const hijriDay = hijriParts.find((part) => part.type === "day")?.value ?? "";
      const hijriMonth = hijriParts.find((part) => part.type === "month")?.value ?? "";
      const hijriYear = hijriParts.find((part) => part.type === "year")?.value ?? "";
      setHijriDate(`${hijriDay}, ${hijriMonth}, ${hijriYear}`);
    };

    updateDates();
    const interval = setInterval(updateDates, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log({engDate, bnDate, hijriDate})
  return (
    <div>
      
    </div>
  );
};

export default App;
