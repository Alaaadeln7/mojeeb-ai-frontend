"use client";

import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    browser: false,
  });
  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  return (
    <div className="px-6 pb-6">
      <h2 className="text-xl font-semibold mb-1">Notifications</h2>
      <p className="text-base-content/60 text-sm mb-4">
        <a href="#" className="text-primary underline">
          Manage your notification preferences
        </a>
      </p>
      <div className="space-y-4">
        {[
          { label: "Enable email notifications", key: "email" },
          { label: "Enable SMS notifications", key: "sms" },
          { label: "Enable browser notifications", key: "browser" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <span>{item.label}</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={notifications[item.key]}
              onChange={() => toggleNotification(item.key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
