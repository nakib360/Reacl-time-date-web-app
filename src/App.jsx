import dayjs from "dayjs";
import Calendar from 'date-bengali-revised'
import HijriDate from "hijri-date";
const hijri = new HijriDate();
let cal = new Calendar(1425, 1, 1)
import { useEffect } from "react";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa"; // English
import { MdOutlineCalendarToday } from "react-icons/md"; // Bangla (generic calendar)
import { GiMoonOrbit } from "react-icons/gi"; // Hijri – let's replace with FaMoon since GiMoonOrbit doesn't exist
import { FaMoon } from "react-icons/fa";

const App = () => {
  const [engDate, setEngDate] = useState(dayjs().format('DD MMMM YYYY'));
  const [bnDate, setBnDate] = useState(cal.format('dddd, D MMMM, Y [Q]'));
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-awwal",
    "Rabi' al-thani",
    "Jumada al-awwal",
    "Jumada al-thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];
  const [hijriDate, setHijriDate] = useState(`${hijri.getDate()}, ${hijriMonths[hijri.getMonth() - 1]}, ${hijri.getFullYear()}`);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = dayjs().format('DD MMMM YYYY');
      setEngDate(date);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = cal.format('dddd, D MMMM, Y [Q]');
      setBnDate(date);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = `${hijri.getDate()}, ${hijriMonths[hijri.getMonth() - 1]}, ${hijri.getFullYear()}`;
      setHijriDate(date);
    }, 1000);

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
              <span className="text-gray-700 dark:text-gray-200 font-medium text-xs sm:text-lg">Hijri</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-xs sm:text-lg">{hijriDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;