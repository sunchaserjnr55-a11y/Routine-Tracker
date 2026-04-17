import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const DATA = [
  {
    id: "morning",
    title: "Morning Phase",
    time: "5:00 AM – 9:00 AM",
    color: "from-sky-400 to-blue-600",
    tasks: [
      "Wake up + Fajr",
      "Ibadah (30 min)",
      "Get ready",
      "Gym",
      "Protein shake",
      "Shower + dress",
      "Work session 1",
      "Controlled free time",
    ],
  },
  {
    id: "midday",
    title: "Midday Flow",
    time: "9:00 AM – 1:15 PM",
    color: "from-yellow-300 to-orange-500",
    tasks: [
      "Active movement",
      "Work session 2",
      "Low-stim rest",
    ],
  },
  {
    id: "dhuhr",
    title: "Dhuhr Block",
    time: "1:30 PM – 4:30 PM",
    color: "from-emerald-400 to-green-600",
    tasks: [
      "Dhuhr prayer",
      "Ibadah",
      "Work session 3",
      "Meal 1",
      "Controlled rest",
    ],
  },
  {
    id: "asr",
    title: "Asr Flow",
    time: "5:00 PM – 6:30 PM",
    color: "from-purple-400 to-indigo-600",
    tasks: [
      "Asr prayer",
      "Ibadah",
      "Active walk",
    ],
  },
  {
    id: "night",
    title: "Night Reset",
    time: "6:45 PM – Sleep",
    color: "from-pink-400 to-rose-600",
    tasks: [
      "Maghrib + Ibadah",
      "Meal 2",
      "Isha + Ibadah",
      "Wind down",
      "Sleep",
    ],
  },
];

export default function App() {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("routine");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("routine", JSON.stringify(checked));
  }, [checked]);

  const toggle = (key) => {
    setChecked((p) => ({ ...p, [key]: !p[key] }));
  };

  const progress = useMemo(() => {
    const total = DATA.reduce((a, b) => a + b.tasks.length, 0);
    const done = Object.values(checked).filter(Boolean).length;
    return Math.round((done / total) * 100);
  }, [checked]);

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-4">
      <div className="max-w-md mx-auto">

        {/* HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl"
        >
          <h1 className="text-xl font-bold">Daily Focus</h1>
          <p className="text-xs opacity-80">Build discipline, block by block</p>

          <div className="mt-3 w-full bg-white/20 rounded-full h-2">
            <motion.div
              className="h-2 bg-white rounded-full"
              animate={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs mt-2">Progress: {progress}%</p>
        </motion.div>

        {/* TIMELINE */}
        <div className="mt-5 space-y-4">
          {DATA.map((block, i) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl bg-[#111827] border border-white/10 overflow-hidden"
            >
              {/* TOP HEADER */}
              <div className={`p-4 bg-gradient-to-r ${block.color}`}> 
                <h2 className="font-bold text-lg">{block.title}</h2>
                <p className="text-xs opacity-90">{block.time}</p>
              </div>

              {/* TASK LIST */}
              <div className="p-4 space-y-3">
                {block.tasks.map((task) => {
                  const key = block.id + task;
                  return (
                    <label
                      key={key}
                      className="flex items-center gap-3 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={() => toggle(key)}
                        className="accent-purple-500 scale-110"
                      />
                      <span
                        className={checked[key] ? "line-through opacity-40" : ""}
                      >
                        {task}
                      </span>
                    </label>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FLOATING STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full text-xs"
        >
          🔥 Focus Mode Active • {progress}% Complete
        </motion.div>
      </div>
    </div>
  );
}
