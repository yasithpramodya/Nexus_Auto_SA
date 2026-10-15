export default function GradingGuide() {
  const grades = [
    {
      grade: 'Grade 5 / S',
      title: 'Showroom / As-New Condition',
      desc: 'Extremely rare collector-grade vehicles. Flawless original bodywork, factory fresh interior, and virtually no wear. Ideal for high-end investment cars.',
    },
    {
      grade: 'Grade 4.5',
      title: 'Pristine Low-Km Condition',
      desc: 'Very high quality with only tiny microscopic blemishes invisible from 1 meter. Verified original paint panels and fully documented Japanese logbooks.',
    },
    {
      grade: 'Grade 4',
      title: 'Clean Daily / Enthusiast Grade',
      desc: 'Above average condition with minor regular wear consistent with year and mileage. Mechanically sound, zero structural defects, straight frame rails.',
    },
    {
      grade: 'Interior A & B',
      title: 'Top Tier Cabin Condition',
      desc: 'Clean, non-smoker cabin with unblemished dash, tight leather bolsters, and all electronics, climate controls, and power features fully functioning.',
    },
  ];

  return (
    <div className="grading-grid">
      {grades.map((g) => (
        <div key={g.grade} className="grading-card">
          <div className="grading-badge">{g.grade}</div>
          <div className="grading-title">{g.title}</div>
          <p className="grading-desc">{g.desc}</p>
        </div>
      ))}
    </div>
  );
}
