// seed.js – seeds users and courses into MongoDB on first run
const User   = require('./models/User');
const Course = require('./models/Course');

const seedUsers = [
  { username: 'student1', password: 'password123', role: 'student' },
  { username: 'admin1',   password: 'adminpassword', role: 'admin'   },
];

const seedCourses = [
  {
    title:       'Introduction to Express',
    category:    'web',
    difficulty:  'beginner',
    description: 'Learn Express.js fundamentals – routing, middleware, and REST APIs.',
  },
  {
    title:       'Advanced MERN Stack',
    category:    'web',
    difficulty:  'advanced',
    description: 'Build full-stack applications with MongoDB, Express, React, and Node.',
  },
  {
    title:       'Data Structures in JavaScript',
    category:    'programming',
    difficulty:  'intermediate',
    description: 'Master arrays, linked lists, trees, and graphs using JavaScript.',
  },
  {
    title:       'React Fundamentals',
    category:    'web',
    difficulty:  'beginner',
    description: 'Learn React hooks, state management, and component patterns.',
  },
  {
    title:       'Node.js & REST APIs',
    category:    'web',
    difficulty:  'intermediate',
    description: 'Build production-ready REST APIs with Node.js and Express.',
  },
];

const seedDatabase = async () => {
  try {
    /* ---- Users ---- */
    for (const u of seedUsers) {
      const exists = await User.findOne({ username: u.username });
      if (!exists) {
        await User.create(u);
        console.log(`  ✅ Seeded user: ${u.username} (${u.role})`);
      }
    }

    /* ---- Courses ---- */
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany(seedCourses);
      console.log(`  ✅ Seeded ${seedCourses.length} courses`);
    }

    console.log('🌱 Database seeding complete\n');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  }
};

module.exports = seedDatabase;
