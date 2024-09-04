let students = [];
const openModal = (studentIndex = null) => {
    console.log(studentIndex, "openModal")
    const modal = document.getElementById("myModal");
    const modalTitle = document.querySelector("#myModal h2");
    const submitButton = document.querySelector("#studentForm input[type='submit']");
    if (studentIndex !== null) {
        const student = students[studentIndex];
        document.getElementById("studentID").value = student.studentID;
        document.getElementById("name").value = student.name;
        document.getElementById("fatherName").value = student.fatherName;
        document.getElementById("class").value = student.class;
        document.getElementById("totalMarks").value = student.totalMarks;
        document.getElementById("obtainMarks").value = student.obtainMarks;
        modalTitle.textContent = "Update data";
        submitButton.value = "Update";
        submitButton.onclick = () => updateStudent(studentIndex);
    } else {
        document.getElementById("studentForm").reset();
        modalTitle.textContent = "Add Student";
        submitButton.value = "Submit";
        submitButton.onclick = addStudent;
        console.log()
    }
    modal.style.display = "block";
};
const closeModal = () => {
    document.getElementById("myModal").style.display = "none";
    closeAllMenus(); // Close all menus when modal is closed
};
// add student portion/
const addStudent = (event) => {
    event.preventDefault();
    const form = document.getElementById("studentForm");
    const formData = new FormData(form);
    const student = {};
    formData.forEach((value, key) => {
        student[key] = value;
    });
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    closeModal();
    displayStudents();
};
const deleteStudent = (index) => {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
};
const displayStudents = () => {
    const tableBody = document.getElementById("studentData");
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        for (const key in student) {
            const cell = document.createElement("td");
            cell.textContent = student[key];
            row.appendChild(cell);
        }
        const actionsCell = document.createElement("td");
        const menuButton = document.createElement("button");
        menuButton.textContent = "⋮";
        menuButton.onclick = (event) => openMenu(index, event);
        actionsCell.appendChild(menuButton);
        const optionsMenu = document.createElement("div");
        optionsMenu.classList.add("options-dropdown");
        optionsMenu.id = `menu-${index}`;
        const editOption = document.createElement("button");
        editOption.textContent = "Edit";
        editOption.onclick = () => editStudent(index);
        optionsMenu.appendChild(editOption);
        const deleteOption = document.createElement("button");
        deleteOption.textContent = "Delete";
        deleteOption.onclick = () => deleteStudent(index);
        optionsMenu.appendChild(deleteOption);
        actionsCell.appendChild(optionsMenu);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
};
// edit portion///
const editStudent = (index) => {
    console.log(index, "Function")
    openModal(index);
};
const updateStudent = (index) => {
    const form = document.getElementById("studentForm");
    const formData = new FormData(form);
    console.log(form, "Form in Update")
    console.log(formData, "Formdata in Update")
    const updatedStudent ={};
    console.log(updateStudent, "UpdatedStd")
    formData.forEach((value, key) => {
        updatedStudent[key] = value;
    });
    students[index] = updatedStudent;
    console.log(updateStudent, "new Line ")
    localStorage.setItem("students", JSON.stringify(students));
    closeModal();
    displayStudents();
};
/////elipsis menu///
const openMenu = (index, event) => {
    event.stopPropagation();
    closeAllMenus(); // Close all other menus before opening this one
    const menu = document.getElementById(`menu-${index}`);
    menu.classList.toggle("show");
    document.addEventListener("click", closeAllMenusOnClick); // Add event listener to close menus on click outside
};
const closeAllMenus = () => {
    const menus = document.querySelectorAll(".options-dropdown");
    menus.forEach(menu => {
        if (menu.classList.contains("show")) {
            menu.classList.remove("show");
        }
    });
    document.removeEventListener("click", closeAllMenusOnClick); // Remove event listener when menus are closed
};
const closeAllMenusOnClick = () => {
    closeAllMenus();
};
// sortby section///////
const sortStudents = (criteria) => {
    if (criteria === "name") {
        console.log(students, "Sort checking")
        students.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "studentID") {
        students.sort((a, b) => a.studentID - b.studentID);
    } else if (criteria === "class") {
        students.sort((a, b) => a.class.localeCompare(b.class));
    }
    displayStudents();
};
//serach bar////
const searchStudents = () => {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return Object.values(student).some(value => value.toString().toLowerCase().includes(searchTerm));
    });
    displayFilteredStudents(filteredStudents);
};
const displayFilteredStudents = (filteredStudents) => {
    const tableBody = document.getElementById("studentData");
    tableBody.innerHTML = "";
    filteredStudents.forEach((student, index) => {
        const row = document.createElement("tr");
        for (const key in student) {
            const cell = document.createElement("td");
            cell.textContent = student[key];
            row.appendChild(cell);
        }
        const actionsCell = document.createElement("td");
        const menuButton = document.createElement("button");
        menuButton.textContent = "⋮";
        menuButton.onclick = (event) => openMenu(index, event);
        actionsCell.appendChild(menuButton);
        const optionsMenu = document.createElement("div");
        optionsMenu.classList.add("options-dropdown");
        optionsMenu.id = `menu-${index}`;
        const editOption = document.createElement("button");
        editOption.textContent = "Edit";
        editOption.onclick = () => editStudent(index);
        optionsMenu.appendChild(editOption);
        const deleteOption = document.createElement("button");
        deleteOption.textContent = "Delete";
        deleteOption.onclick = () => deleteStudent(index);
        optionsMenu.appendChild(deleteOption);
        actionsCell.appendChild(optionsMenu);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
};
document.getElementById("studentForm").addEventListener("submit", addStudent);
document.addEventListener("DOMContentLoaded", () => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) {
        students = JSON.parse(storedStudents);
        displayStudents();
    }
});