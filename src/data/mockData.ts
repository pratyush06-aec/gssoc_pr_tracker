export const LANDING_FEATURES = [
  {
    icon: "sync_saved_locally",
    title: "Real-time sync",
    desc: "Our backend architecture hooks directly into the GitHub API, ensuring your PR status updates the second a maintainer acts. Zero latency, total visibility.",
    latency: "SYNC_LATENCY: < 120ms"
  },
  {
    icon: "verified_user",
    title: "Mentor reviews",
    desc: "Direct integration with official mentorship logs to verify contribution quality.",
  },
  {
    icon: "leaderboard",
    title: "Leaderboard climbing",
    desc: "Gamified progression system designed to incentivize high-impact contributions. Watch your rank evolve across regions and tech stacks in a competitive yet clinical environment.",
    leaderboard: [
      { user: "USER_ALPHA", points: "2,450 PTS" },
      { user: "USER_BETA", points: "2,100 PTS" },
      { user: "USER_GAMMA", points: "1,890 PTS" },
    ]
  }
];

export const LANDING_PROTOCOL = [
  {
    step: 1,
    title: "Register",
    desc: "Connect your GitHub profile and authenticate with the GSSoC internal registry. We initialize your data shard instantly."
  },
  {
    step: 2,
    title: "Contribute",
    desc: "Submit Pull Requests to participating repositories. Our system listens for the 'GSSoC' labels across thousands of issues."
  },
  {
    step: 3,
    title: "Earn Points",
    desc: "Once merged, points are calculated based on complexity levels and applied to your global ranking dashboard."
  }
];

export const LANDING_SCORING = [
  { level: "Level 1", status: "Beginner", points: "10 PTS" },
  { level: "Level 2", status: "Intermediate", points: "25 PTS" },
  { level: "Level 3", status: "Advanced", points: "45 PTS" },
];
