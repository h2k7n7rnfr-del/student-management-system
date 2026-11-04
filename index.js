
class Student {
    constructor(id, name, attendance, grades) {
        this.id = id;
        this.name = name;
        this.attendance = attendance;
        this.grades = grades;
    }

    // Calculate Average Using reduce
    calculateAverage() {
        if (this.grades.length === 0) {
            return 0;
        }

        let total = this.grades.reduce(
            (sum, grade) => sum + grade, 0
        );

        return total / this.grades.length;
    }

    // Calculate Grade Using if / else
    calculateGrade() {
        let average = this.calculateAverage();

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    // Check Final Result
    calculateResult() {
        let average = this.calculateAverage();

        if (average >= 50 && this.attendance >= 75) {
            return "PASS";
        } else {
            return "FAIL";
        }
    }
}

// Create 4 Students
let students = [
    new Student(101, "Ahmed", 90, [40, 45, 50, 45, 45]),
    new Student(102, "Mohamed", 80, [45, 50, 45, 50, 50]),
    new Student(103, "Ali", 70, [60, 65, 70, 65, 60]),
    new Student(104, "Omar", 95, [80, 85, 90, 85, 85])
];

// Display Students Results
console.log("===== STUDENTS RESULTS =====");

students.forEach(student => {
    console.log("----------------------");
    console.log("ID:", student.id);
    console.log("Name:", student.name);
    console.log("Attendance:", student.attendance + "%");
    console.log("Average:", student.calculateAverage());
    console.log("Grade:", student.calculateGrade());
    console.log("Result:", student.calculateResult());
});

// Mercy Committee Using filter
let mercyCommittee = students.filter(student => {
    let average = student.calculateAverage();
    return average >= 40 && average < 50;
});

// Add 5 Marks Using map
let mercyResults = mercyCommittee.map(student => {
    let newAverage = student.calculateAverage() + 5;

    let newGrade;

    if (newAverage >= 90) {
        newGrade = "A";
    } else if (newAverage >= 80) {
        newGrade = "B";
    } else if (newAverage >= 70) {
        newGrade = "C";
    } else if (newAverage >= 60) {
        newGrade = "D";
    } else if (newAverage >= 50) {
        newGrade = "E";
    } else {
        newGrade = "F";
    }

    return {
        name: student.name,
        oldAverage: student.calculateAverage(),
        newAverage: newAverage,
        newGrade: newGrade,
        attendance: student.attendance,
        newResult: newAverage >= 50 && student.attendance >= 75
            ? "PASS"
            : "FAIL"
    };
});

// Display Mercy Committee Results
console.log("===== MERCY COMMITTEE =====");

mercyResults.forEach(student => {
    console.log("----------------------");
    console.log("Name:", student.name);
    console.log("Old Average:", student.oldAverage);
    console.log("New Average:", student.newAverage);
    console.log("New Grade:", student.newGrade);
    console.log("New Result:", student.newResult);
});

// Calculate Adjusted Overall Average Using reduce
let totalAdjustedAverage = students.reduce((sum, student) => {
    let mercyStudent = mercyResults.find(
        item => item.name === student.name
    );

    let average = mercyStudent
        ? mercyStudent.newAverage
        : student.calculateAverage();

    return sum + average;
}, 0);

let finalAverage = students.length > 0
    ? totalAdjustedAverage / students.length
    : 0;

// Display Final Average
console.log("===== FINAL ANALYSIS =====");
console.log("Number of Students:", students.length);
console.log("Mercy Committee Students:", mercyCommittee.length);
console.log("Adjusted Overall Average:", finalAverage);
