import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

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
      setEngDate(`${engWeekday} ${engDay} ${engMonth.toLowerCase()} ${engYear}`);

      const bnWeekday = banglaWeekdayFormatter.format(today);
      const banglaParts = getBanglaDateParts(today);
      const bnSeason = seasonByMonth[banglaParts.month] ?? "";
      setBnDate(
        `${bnWeekday} ${toBanglaNumber(banglaParts.day)} ${banglaParts.month}, ${toBanglaNumber(
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 sm:mb-8 text-center">
          Today's Dates
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {/* English Date */}
          <div className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/30 p-3 sm:p-4 rounded-xl shadow-inner">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaRegCalendarAlt className="text-purple-600 dark:text-purple-300 text-xl sm:text-2xl" />
              <span className="text-gray-700 dark:text-gray-200 font-medium text-xs sm:text-lg">English</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-lg">{engDate}</span>
          </div>

          {/* Bangla Date */}
          <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 p-3 sm:p-4 rounded-xl shadow-inner">
            <div className="flex items-center gap-2 sm:gap-3">
              <MdOutlineCalendarToday className="text-green-600 dark:text-green-300 text-xl sm:text-2xl" />
              <span className="text-gray-700 dark:text-gray-200 font-medium text-xs sm:text-lg">Bangla</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-lg">{bnDate}</span>
          </div>

          {/* Hijri Date */}
          <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/30 p-3 sm:p-4 rounded-xl shadow-inner">
            <div className="flex items-center gap-2 sm:gap-3">
              <FaMoon className="text-yellow-600 dark:text-yellow-300 text-xl sm:text-2xl" />
              <span className="text-gray-700 dark:text-gray-200 font-medium text-xs sm:text-lg">Arabic</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-lg">{hijriDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
