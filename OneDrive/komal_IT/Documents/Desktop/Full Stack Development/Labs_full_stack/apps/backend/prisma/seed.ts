import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

// Data to seed
const roleSeedData = [
  { name: "Manager" },
  { name: "Developer" },
  { name: "Designer" },
];

const employeeSeedData = [
  { firstName: "Komalpreet", lastName: "Kaur", email: "komal@example.com", roleId: 1 },
  { firstName: "Harman", lastName: "Kaur", email: "harman@example.com", roleId: 2 },
];

async function main() {
  // Clear tables first
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();

  // Seed Roles
  await prisma.role.createMany({
    data: roleSeedData,
    skipDuplicates: true,
  });
  console.log(`CREATED ROLES: ${roleSeedData.length}`);

  // Seed Employees
  await prisma.employee.createMany({
    data: employeeSeedData,
    skipDuplicates: true,
  });
  console.log(`CREATED EMPLOYEES: ${employeeSeedData.length}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });