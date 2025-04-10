const { execSync } = require('child_process');

const seeders = [
  'userSeeder.js',
  'courseSeeder.js',
  'lessonSeeder.js',
  'supportTicketSeeder.js'
];

for (const seeder of seeders) {
  console.log(`Running ${seeder}...`);
  try {
    execSync(`node ${__dirname}/${seeder}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running ${seeder}:`, error);
    process.exit(1);
  }
}

console.log('All seeders executed successfully.');