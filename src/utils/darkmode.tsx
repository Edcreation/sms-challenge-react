import { enable as enableDarkMode, disable as disableDarkMode, setFetchMethod } from 'darkreader';
import { useState, useEffect } from 'react';

export function DarkButton() {
  const darkstored = localStorage.getItem('dark') || 'false';
  const [dark, setDark] = useState(darkstored);
  useEffect(() => {
    setFetchMethod(window.fetch);
    dark === 'true'
      ? enableDarkMode({
        brightness: 100,
        contrast: 100,
        sepia: 10,
      })
      : disableDarkMode();
  }, [dark]);
  return (
    <div className="flex flex-row justify-end items-end">
      <label className="relative mx-3 inline-flex items-center cursor-pointer">
        <input
          onClick={() => {
            setDark((prev) => prev === 'false' ? 'true' : 'false');
            localStorage.setItem('dark', dark === 'false' ? 'true' : 'false');
          }}
          data-testid="dark-button"
          type="checkbox"
          value=""
          className="sr-only bg-regal-blue peer"
        />
        <div className="w-7 h-4 bg-regal-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-regal-blue after:content-[''] after:absolute  after:mt-[1.5px] after:ml-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-regal-blue peer-checked:border"></div>
      </label>
    </div>
  );
}