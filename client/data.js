export  const dailyStudents=[];
for (let i = 1; i <= 25; i++) {
    dailyStudents.push({
    name: `Student ${i}`,
    rollNo: i,
    class: `Class ${Math.floor(Math.random() * 5) + 1}`,
    teacher: `Teacher ${Math.floor(Math.random() * 3) + 1}`,
  });
  
}

export const classStudents=[];
for (let i = 1; i <= 10; i++) {
    classStudents.push({
    name: `Student ${i}`,
    rollNo: i,
    class: `Class ${Math.floor(Math.random() * 5) + 1}`,
    teacher: `Teacher ${Math.floor(Math.random() * 3) + 1}`,
  });
  
}