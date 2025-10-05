import React from 'react';

interface SkillMapProps {
  topLanguages: string[];
  topTopics: string[];
  languageCounts: { [lang: string]: number };
  topicCounts: { [topic: string]: number };
}

const SkillMap: React.FC<SkillMapProps> = ({ topLanguages, topTopics, languageCounts, topicCounts }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Skill Map</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Top Languages</h3>
        <ul className="list-disc pl-5">
          {topLanguages.map((lang) => (
            <li key={lang} className="text-lg">{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold">Top Topics</h3>
        <ul className="list-disc pl-5">
          {topTopics.map((topic) => (
            <li key={topic} className="text-lg">{topic}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Language Counts</h3>
        <ul className="list-disc pl-5">
          {Object.entries(languageCounts).map(([lang, count]) => (
            <li key={lang} className="text-lg">{`${lang}: ${count}`}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Topic Counts</h3>
        <ul className="list-disc pl-5">
          {Object.entries(topicCounts).map(([topic, count]) => (
            <li key={topic} className="text-lg">{`${topic}: ${count}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillMap;