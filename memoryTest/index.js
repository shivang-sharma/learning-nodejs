function memoryTest1() {
    const arr = [10, 20, 30, 40, 50, 60, 70, 80, 7, 8, 9];
    arr.reverse();
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Script uses approx ${Math.round(used*100)/100} MB`);
}

function memoryTest2() {
    const arr = [10, 20, 30, 40, 50, 60, 70, 80, 7, 8, 9];
    arr.reverse();
    const used = process.memoryUsage();
    for (let key in used) {
        console.log(`${key} : ${Math.round(used[key]/ 1024 / 1024 * 100) /100 } MB`);
    }
}

memoryTest1();
memoryTest2();